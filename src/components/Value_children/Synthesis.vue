<template>
  <div class="synthesis">

    <!--预报时间-->
    <Row class="forecasetime singlecolor">
      <i-col span="4" class="ground_text">预报时间</i-col>
      <i-col span="8" class="datePicker">
        <DatePicker  type="date" :value="timeValue"  confirm  @on-change="getDate" placeholder="选择日期"></DatePicker>
      </i-col>
      <i-col span="8" class="selecttime">
        <TimePicker :value="Htime" class="getTime" format="H" placeholder="选择时次"  @on-change="getTime"></TimePicker>
      </i-col>
    </Row>
    <!--<div>-->
      <!--<i-button icon="arrow-left-a" class="sy-btn-c sy-btn" @click = "Nexttime"></i-button>-->
      <!--<i-button icon="arrow-right-a" class="sy-btn-c sy-btn"  @click = "Pretime"></i-button>-->
      <!--<i-button icon="loop" class="sy-btn-c sy-btn" @click = "Reset"></i-button>-->
    <!--</div>-->
    <ul class="sy-lists">
      <!-- 模式选择 start -->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">模式选择</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small" v-model = "patternValue" @on-change="patternClick">
              <i-option v-for="(item,index) in pattern" :value="item.value" :key="item.value">{{item.label}}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>
      <!-- 模式选择 end -->

      <!-- 预报范围 start -->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">预报范围</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small" v-model="forecastRange">
              <i-option v-for="(item,index) in area" :value="item.value" :key="index">{{ item.label }}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>
      <!-- 预报范围 end -->

      <!-- 投影方式 start -->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">投影方式</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small" v-model="projectiveMode">
              <i-option v-for="(item,index) in time" :value="item.value" :key="index">{{ item.label }}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>
      <!-- 投影方式 end -->

      <!-- 起报时间 start -->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">起报时间</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small" v-model="startTime" @on-change="startTimeClick">
              <i-option v-for="(item,index) in hetare1" :value="item.value" :key="index">{{ item.label }}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>
      <!-- 起报时间 end -->

      <!-- 典型组合 start -->
      <li>
        <Row class="col_forecasetime pressurecolor" id="hynthesispressureCollapse">
          <i-col span="6" class="ground_text">典型组合</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="hynthesispressureswitch" @on-change="hynthesisanalyzeswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse pressurecolor" style="padding:0 10px 10px 10px;text-align: left" v-show="hynthesispressureCollapes">
          <div class="sy-elemt">
            <Radio-group vertical v-model="vcal" >
              <Radio v-for="(item,index) in zuList" :key="index" :label="item.value"></Radio>
            </Radio-group>
          </div>
          <Row align="middle" type="flex">
            <i-col span="5">自定义组合</i-col>
            <i-col span="18">
              <i-select size="small" >
                <i-option v-for="(item,index) in perzuhe" :value="item.value" :key="index">{{ item.label }}</i-option>
              </i-select>
            </i-col>
            <i-col span="3">
              <!--<i-button icon="plus" class="add-zuhe" style="float: right"></i-button>-->
            </i-col>
          </Row>
        </Row>
      </li>

      <!-- 添加要素 start -->
      <li>
        <Row class="col_forecasetime analyzecolor" id="hynthesisaddelment">
          <i-col span="6" class="ground_text">添加要素</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="hynthesisaddelmentswitch" @on-change="hynthesisaddelmentswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse analyzecolor" v-show="hynthesisaddelment">
          <Row class="sy-comm">
            <i-col span="4" class="sy-title">层次选择</i-col>
            <i-col span="12" class="level">
              <i-select size="small" v-model.sync="levelstatus" @on-change="levelChange">
                <i-option v-for="(item,index) in this.LeveldataName" :value="item.value" :key="item.value">{{item.level}}</i-option>
              </i-select>
            </i-col>
          </Row>
          <Row class="sy-comm">
            <i-col span="4" class="sy-title">要素选择</i-col>
            <i-col span="12" class="level">
              <i-select size="small" v-model="elementstatus" @on-change="allelementClick">
                <i-option v-for="item in this.Leveldataelement" :value="item.elementType" :key="item.elementType">{{item.msg}}</i-option>
              </i-select>
            </i-col>
          </Row>
          <Row class="sy-comm">
            <i-col span="4" class="sy-title">展示方式</i-col>
            <i-col span="12" class="level">
              <i-select size="small" v-model.sync="airstatus" @on-change="airModeClick">
                <i-option v-for="item in this.airplayMode" :value="item.value" :key="item.value" >{{item.label}}</i-option>
              </i-select>
            </i-col>
          </Row>
        </Row>
      </li>

      <!-- 图层管理面板 start -->
      <li>
        <Row class="col_forecasetime managecolor" id="synthesisemanageCollapes">
          <i-col span="6" class="ground_text">图层管理面板</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="synthesisemanageswitch" @on-change="synthesisemanageswitchChange"></i-switch>
          </i-col>
        </Row>

        <Row class="switch_collapse managecolor" v-show="synthesisemanageCollapes">
          <Row class="sy-comm roundelement" v-for="(item,index) in this.manageLayer">
            <i-col span="12">
              <i-button class="tucengelement elementdisclick">{{item.name}}</i-button>
            </i-col>
            <i-col span="6">
              <i-button class="tucengelement elementclick" @click="visibleElementClick(item)">{{item.visible}}</i-button>
            </i-col>
            <i-col span="3">
              <i-button class="tucengelement elementclick" @click="deleteElementClick(item)">{{item.disvisible}}</i-button>
            </i-col>
          </Row>
        </Row>
      </li>
    </ul>
  </div>
</template>

<script>
  import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
  import Row from "../../../node_modules/iview/src/components/grid/row";
  export default {
    components: {
      Row,
      ElIcon}, data() {
      return {
        status:'',//展示方式切换
        airstatus:'',//气压层展示方式切换
        levelstatus:'',//层级展示方式切换
        elementstatus:'',//要素选择展示方式切换
        value1: '1',//添加要素折叠
        hynthesisaddelment:true,
        hynthesisaddelmentswitch:true,
        Typicalvalue:'1',//典型组合折叠
        hynthesispressureCollapes:true,
        hynthesispressureswitch:true,
        Layermanagevalue:'1',//图层管理折叠
        synthesisemanageCollapes:true,
        synthesisemanageswitch:true,
        typeofvalue:'isoline',
        factor:'',
        isaddSource:false,
        zuList: [ //典型组合
          {value: '500pha高度+850风场+850大风速（大于等于12）'},
          {value: '500pha高度+海平面气压'},
          {value: '500pha高度+海平面气压500到850风场+850大风速'}
        ],
        vcal: '500pha高度+850风场+850大风速（大于等于12）',  //典型组合
        Leveldataelement:[],
        LeveldataName:'',//层次选择下拉框内容更改
        LevelNameOptionjapan:{
          LevelNameOptionjapan1000:[
            {msg:"风"},
            {msg:"温度"},
            {msg:"相对湿度"},
            {msg:"位势高度"},
            {msg:"垂直速度"},
          ],
          LevelNameOptionjapan850:[
            {msg:"风"},
            {msg:"温度"},
            {msg:"相对湿度"},
            {msg:"位势高度"},
            {msg:"垂直速度"},
            {msg:"流函数"},
            {msg:"速度势场"},
          ],
          LevelNameOptionjapan500:[
            {msg:"相对涡度"},
          ],
        },
        LevelNameOption511:{
          LevelNameOption511ground: [  //预报要素
            {msg: '海平面气压(msl)',elementType:"pressure",Graph:[{"GraphType":"isoline","GraphName":"等值线","CategoryType":"static/datafile/C1D_09050000090500011.nc_msl_0_0_pbf.isoline"},{"GraphType":"isosurfacevector","GraphName":"等值面","CategoryType":"static/datafile/G_2017120809.nc_t_0_0_isosurfacevector_pbf.isv"}]},
            {msg: '海平面温度(SSTK)',elementType:"temp",Graph:[{"GraphType":"isoline","GraphName":"等值线","CategoryType":"static/datafile/C1D_09050000090500011.nc_t_0_0_pbf.isoline"},{"GraphType":"isv","GraphName":"色斑图","CategoryType":"http://10.1.6.71:8060/PIE-Web/showPrd/surf/{z}/{x}/{y}.png?params=date:2018-01-02,hour:8,fcstHour:12,modelType:511,feature:temp,level:500"}]},
            {msg: '风场',elementType:"wind",Graph:[{"GraphType":"wsl","GraphName":"流线","CategoryType":"static/datafile/C1D_09050000090500011.nc_u10_0_0_binary.wsl.pbf"},{"GraphType":"wws","GraphName":"风向杆","CategoryType":"static/datafile/G_2017120809.nc_u10v10_0_0_wws.pbf"}]},
            {msg: '2米露点温度(2D)',elementType:"d2",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
            {msg: '2米温度(2T)',elementType:"t2",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
            {msg: '低云云量(LCC)',elementType:"lcc",Graph:[{"GraphType":"img","GraphName":"低云量","CategoryType":"static/images/G_2017120809.nc_lcc_0_0_grayraster.png"}]},
            {msg: '表面温度(SKT)',elementType:"skt",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
            {msg: '雪深(SD)',elementType:"sd",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
            {msg: '雪密度(RSN)',elementType:"rsn",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
            {msg: '总云量(TCC)',elementType:"tcc",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
            {msg: '大气柱水总量(TCW)',elementType:"tcw",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
            {msg: '大气柱水汽总量(TCWV)',elementType:"tcwv",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
            {msg: '100米东西风(100U)',elementType:"100u",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
            {msg: '100米南北风(100V)',elementType:"100v",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
            {msg: '反照率(AL)',elementType:"al",Graph:[{"GraphType":"isoline","GraphName":"等值线"},{"GraphType":"isv","GraphName":"等值面"}]},
          ],
          LevelNameOption511500:[
            {msg:"位势高度(GH)",elementType:"gh",Graph:[{"GraphType":"isv","GraphName":"等值面"},{"GraphType":"isoline","GraphName":"等值线"}]},
            {msg:"温度(T)",elementType:"temp",Graph:[{"GraphType":"isv","GraphName":"等值面"},{"GraphType":"isoline","GraphName":"等值线"}]},
            {msg:"风(V)",elementType:"wind",Graph:[{"GraphType":"isv","GraphName":"流线"},{"GraphType":"isoline","GraphName":"风向杆"}]},
            {msg:"相对湿度(R)",elementType:"reaHumidity",Graph:[{"GraphType":"isv","GraphName":"等值面"},{"GraphType":"isoline","GraphName":"等值线"}]},
            {msg:"位势涡度(PV)",elementType:"pv",Graph:[{"GraphType":"isv","GraphName":"等值面"},{"GraphType":"isoline","GraphName":"等值线"}]},
            {msg:"比湿(Q)",elementType:"q",Graph:[{"GraphType":"isv","GraphName":"等值面"},{"GraphType":"isoline","GraphName":"等值线"}]},
            {msg:"垂直速度(W)",elementType:"w",Graph:[{"GraphType":"isv","GraphName":"等值面"},{"GraphType":"isoline","GraphName":"等值线"}]},
            {msg:"散度(D)",elementType:"d",Graph:[{"GraphType":"isv","GraphName":"等值面"},{"GraphType":"isoline","GraphName":"等值线"}]},
          ],

        },
        LevelNameOptionT639:{
          LevelNameOptionT639ground:[
            {msg:"10米风"},
            {msg:"2米温度"},
            {msg:"海平面气压"},
            {msg:"表面气压"},
            {msg:"总降水量"},
            {msg:"K指数"},
          ],
          LevelNameOptionT639200:[
            {msg:"位势高度"},
            {msg:"温度"},
            {msg:"东西风"},
            {msg:"南北风"},
            {msg:"垂直速度"},
            {msg:"比湿"},
            {msg:"相对湿度"},
            {msg:"相对涡度"},
            {msg:"相对散度"},
          ],
          LevelNameOptionT639300:[
            {msg:"位势高度"},
            {msg:"温度"},
            {msg:"东西风"},
            {msg:"南北风"},
            {msg:"垂直速度"},
            {msg:"比湿"},
            {msg:"相对湿度"},
          ],
          LevelNameOptionT639500:[
            {msg:"位势高度"},
            {msg:"温度"},
            {msg:"东西风"},
            {msg:"南北风"},
            {msg:"垂直速度"},
            {msg:"比湿"},
            {msg:"相对湿度"},
            {msg:"相对涡度"},
            {msg:"相对散度"},
            {msg:"温度平流"},
            {msg:"相对涡度平流"},
            {msg:"水汽通量"},
            {msg:"水汽通量散度"},
            {msg:"温度露点差"},
            {msg:"假相当位温"},
          ],
        },
        dataSet:{
          "511":{
            "Levels":[
              {"level":"地面层","value":"500","metegraphelment":"LevelNameOption511ground"},
              {"level":"850","value":"850","metegraphelment":"LevelNameOption511500"},
              {"level":"700","value":"700","metegraphelment":"LevelNameOption511500"},
              {"level":"500","value":"510","metegraphelment":"LevelNameOption511500"},
              {"level":"1000","value":"520","metegraphelment":"LevelNameOption511500"},
            ]
          },
          "T639":{
            "Levels":[
              {"level":"地面层","value":"0","metegraphelment":"LevelNameOptionT639ground"},
              {"level":"1000","value":"1000","metegraphelment":"LevelNameOptionT639300"},
              {"level":"925","value":"925","metegraphelment":"LevelNameOptionT639300"},
              {"level":"850","value":"850","metegraphelment":"LevelNameOptionT639500"},
              {"level":"700","value":"700","metegraphelment":"LevelNameOptionT639500"},
              {"level":"600","value":"600","metegraphelment":"LevelNameOptionT639300"},
              {"level":"500","value":"500","metegraphelment":"LevelNameOptionT639500"},
              {"level":"400","value":"400","metegraphelment":"LevelNameOptionT639300"},
              {"level":"300","value":"300","metegraphelment":"LevelNameOptionT639300"},
              {"level":"200","value":"200","metegraphelment":"LevelNameOptionT639200"},
            ]
          },
          "NCEP_GFS":{
            "Levels":[
              {"level":"地面层","value":"0"},
              {"level":"1000","value":"1000"},
              {"level":"925","value":"925"},
              {"level":"850","value":"850"},
              {"level":"700","value":"700"},
              {"level":"600","value":"600"},
              {"level":"500","value":"500"},
              {"level":"400","value":"400"},
              {"level":"300","value":"300"},
              {"level":"200","value":"200"},
            ]
          },
          "japan":{
            "Levels":[
              {"level":"1000","value":"1000","metegraphelment":"LevelNameOptionjapan1000"},
              {"level":"925","value":"925","metegraphelment":"LevelNameOptionjapan1000"},
              {"level":"850","value":"850","metegraphelment":"LevelNameOptionjapan850"},
              {"level":"700","value":"700","metegraphelment":"LevelNameOptionjapan1000"},
              {"level":"600","value":"600","metegraphelment":"LevelNameOptionjapan1000"},
              {"level":"500","value":"500","metegraphelment":"LevelNameOptionjapan500"},
              {"level":"400","value":"400","metegraphelment":"LevelNameOptionjapan1000"},
              {"level":"300","value":"300","metegraphelment":"LevelNameOptionjapan1000"},
              {"level":"200","value":"200","metegraphelment":"LevelNameOptionjapan850"},
              {"level":"100","value":"100","metegraphelment":"LevelNameOptionjapan1000"},
            ]
          }
        },
        manageLayer:[],//图层管理数组
        elementType:'',//要素类型
        displayMode:'',//展示方式
        displayModeurl:[],//展示方式数据源
        airplayMode:[],//气压层展示方式
        airplayModeurl:[],//气压层数据源
        managename:'',//图层管理显示名称
        pattern: [{   //模式选择
          value:'T639',
          label:'T639模式'
        },{
          value:'511',
          label:'欧洲高分HRES'
        },{
          value:'NCEP_GFS',
          label:'美国NCEP_GFS'
        },{
          value:'japan',
          label:'日本高分辨率数值预报产品'
        }],
        pattern1: [{   //其它模式选择
          value:'GRAPES_MESO区域模式数值预报产品',
          label:'GRAPES_MESO区域模式数值预报产品'
        },{
          value:'GRAPES_MESO区域模式数值预报产品',
          label:'GRAPES_MESO区域模式数值预报产品'
        },{
          value:'GRAPES_MEPS区域模式数值预报产品',
          label:'GRAPES_MEPS区域模式数值预报产品'
        },{
          value:'GRAPES全球模式高分辨率数值产品',
          label:'GRAPES全球模式高分辨率数值产品'
        }],
        area: [{   //预报范围
          value:'亚洲',
          label:'亚洲'
        },{
          value:'全国',
          label:'全国'
        },{
          value:'东北',
          label:'东北'
        },{
          value:'华北',
          label:'华北'
        },{
          value:'华东',
          label:'华东'
        },{
          value:'华南',
          label:'华南'
        },{
          value:'华中',
          label:'华中'
        },{
          value:'西北',
          label:'西北'
        },{
          value:'西南',
          label:'西南'
        }],
        time: [
          {   //预报时次
          value:'墨卡托投影',
          label:'墨卡托投影'
        },{
          value:'墨卡托投影2',
          label:'墨卡托投影2'
        },{
          value:'墨卡托投影3',
          label:'墨卡托投影3'
        },{
          value:'墨卡托投影4',
          label:'墨卡托投影4'
        },{
          value:'墨卡托投影5',
          label:'墨卡托投影5'
        },{
          value:'墨卡托投影6',
          label:'墨卡托投影6'
        },{
          value:'墨卡托投影7',
          label:'墨卡托投影7'
        }],
        time1: [
          {   //其他预报时次
          value:'03',
          label:'03'
        },{
          value:'06',
          label:'06'
        },{
          value:'09',
          label:'09'
        },{
          value:'12',
          label:'12'
        },{
          value:'15',
          label:'15'
        },{
          value:'18',
          label:'18'
        },{
          value:'21',
          label:'21'
        },{
          value:'24',
          label:'24'
        },{
          value:'27',
          label:'27'
        },{
          value:'30',
          label:'30'
        },{
          value:'33',
          label:'33'
        },{
          value:'36',
          label:'36'
        },{
          value:'39',
          label:'39'
        },{
          value:'42',
          label:'42'
        },{
          value:'45',
          label:'45'
        },{
          value:'48',
          label:'48'
        },{
          value:'51',
          label:'51'
        },{
          value:'54',
          label:'54'
        },{
          value:'57',
          label:'57'
        },{
          value:'60',
          label:'60'
        },{
          value:'63',
          label:'63'
        },{
          value:'66',
          label:'66'
        },{
          value:'69',
          label:'69'
        },{
          value:'72',
          label:'72'
        }],
        hetare: [
          {   //高度场
          value:'200hpa',
          label:'200hpa'
        },{
          value:'500hpa',
          label:'500hpa'
        },{value:'700hpa', label:'700hpa'},{
          value:'850hpa',
          label:'850hpa'
        }],
        hetare1: [
          {   //其他高度场
          value:'12',
          label:'12'
        },{
          value:'20',
          label:'20'
        },{
          value:'50',
          label:'50'
        },{
          value:'70',
          label:'70'
        }],
        biaoData: [
          {   //标量数据
          value:'等值线',
          label:'等值线'
        },{
          value:'等值面',
          label:'等值面'
        }],
        shiData: [
          {//矢量数据
          value:'850hpa',
          label:'850hpa',
        },{value:'700hpa', label:'700hpa',},{
          value:'500hpa',
          label:'500hpa'
        }],
        LeveldataUrl:[],//气压层级url
        t_value: '',//时间
        timeValue: '2018-01-02',//默认的日期显示
        Htime: '8',//默认的时刻显示
        patternValue:'',
        forecastRange:'亚洲',
        projectiveMode:'墨卡托投影',
        startTime:'12',
        perzuhe: '',  //自定义组合
        pattern_value: '', //模式
        time_value: '', //预报时次
        hetare_value: '', //高度场
        biao_value: '', //标量数据
        shi_value: '', //矢量数据
        type:"",
        index:0,//要素当前状态初始值
        elementClickIndex:-1,//地面要素当前状态
        metegrapheClickIndex:-1,//气压要素当前状态
        postisvUrlmsg:'',//拼接等直面请求地址
        postisoUrlmsg:'',//拼接等直线请求地址
        modelselect:'',//模式选择值
        getDataPost:{
            "isvURL" : "/showPrd/surf/{z}/{x}/{y}.png?",
            "isolineURL" : "/showPrd/getDigitalData?",
            "wwsURL" : "/showPrd/getDigitalWindVectorData?",
        }
      }
    },
    methods: {
      //获取日期
      getDate(value) {
        this.timeValue = value;
        this.$store.state.timeValue = this.timeValue;
      },
      //获取时刻
      getTime(value) {
        this.Htime = value;
      },
      //起报时间
      startTimeClick(item){
        this.startTime = item;
      },
      //获取前一天日期
      Pretime(){
        this.timeValue = this.$store.state.PreTime(this.timeValue);
      },
      //获取后一天日期
      Nexttime(){ //后一天
        this.timeValue = this.$store.state.NextTime(this.timeValue);
      },
      //日期重置
      Reset(){  //刷新
        this.timeValue = '';
      },
      //模式选择
      patternClick(item){
        this.modelselect = item
        this.LeveldataName = this.dataSet[item]["Levels"];
        if(item == "NCEP_GFS"){
          this.LeveldataName = [];
          this.Leveldataelement = [];
          this.airplayMode = [];
        }
      },
      //点击地面层要素渲染数据
      elementClick(index,item){
        this.levelstatus = "";
        this.elementClickIndex = item;
        this.displayMode = [];
        this.displayModeurl = [];
        this.status = "";
        var data = index.Graph;
        for(var i=0;i<data.length;i++){
          this.displayMode.push(index.Graph[i].GraphName)
          this.displayModeurl.push(index.Graph[i].CategoryType)
        }
        this.$store.state.elementType = index.elementType;
        this.managename = index.msg;
      },
      //添加图层面板信息
      addElementname(id){
        console.log(this.manageLayer,id)
        var temp = true ;
        for(var i=0;i<this.manageLayer.length;i++){
          if(this.manageLayer[i].value == (this.$store.state.elementType + this.levelstatus)){
              temp = false;
          }
        }
        if(temp){
          var layerId = {
            name:this.managename,
            level:this.levelstatus,
            value:id,
            element:this.$store.state.elementType,
            visible:"可见",
            disvisible:"不可见"
          };
          for(var i=0;i<this.manageLayer.length;i++){
            if(this.manageLayer[i].element == this.$store.state.elementType){
              temp = false;
            }
          }
          if(temp){
              this.manageLayer.push(layerId);
          }else{
            for(var i=0;i<this.manageLayer.length;i++){
                this.manageLayer[i].value =id;
            }
          }
          this.$store.state.chufa = true;
        }
      },
      //添加渲染图层数据源的参数
      addLayerSource(graphType,geoJsonUrl){
        console.log(graphType);
        console.log(geoJsonUrl);
        this.$store.state.geoJsonUrl = [];
        for(var i=0;i<graphType.length;i++){
          let dataSource = {
            graphType:graphType[i],
            showExchange:this.$store.state.showExchange[i],
            geoJsonUrl:geoJsonUrl[i],
          };
          this.$store.state.geoJsonUrl.push(dataSource)
        }
        console.log(this.$store.state.geoJsonUrl);
      },
      //地面层展示方式
      groundModeClick(){
        let graphType;
        let geoJsonUrl = [];
        if(this.status == "") return;
        switch(this.status){
          case "等值线":
            graphType = ['isoline'];
            this.$store.state.showExchange = [this.$store.state.elementType + this.levelstatus + 'iso'];
            this.$store.state.graphType = graphType;
            geoJsonUrl = [this.displayModeurl[0]];
            this.addLayerSource(graphType,geoJsonUrl)
            break;
          case "等值面":
            graphType =['isosurfacevector'];
            this.$store.state.showExchange = [this.$store.state.elementType + this.levelstatus +'isv'];
            this.$store.state.graphType = graphType;
            geoJsonUrl = [this.displayModeurl[1]];
            this.addLayerSource(graphType,geoJsonUrl)
            break;
          case "流线":
            graphType = ['wsl'];
            this.$store.state.showExchange = [this.$store.state.elementType + this.levelstatus + 'wsline'];
            this.$store.state.graphType = graphType;
            geoJsonUrl = [this.displayModeurl[0]];
            this.addLayerSource(graphType,geoJsonUrl)
            break;
          case "风向杆":
            graphType = ['wws'];
            this.$store.state.showExchange = [this.$store.state.elementType + this.levelstatus + 'wwstree'];
            this.$store.state.graphType = graphType;
            geoJsonUrl = [this.displayModeurl[1]];
            this.addLayerSource(graphType,geoJsonUrl)
            break;
          case "低云量":
            graphType = ['png'];
            this.$store.state.showExchange = [this.$store.state.elementType + this.levelstatus + 'imgpng'];
            this.$store.state.graphType = graphType;
            geoJsonUrl = [this.displayModeurl[0]];
            this.addLayerSource(graphType,geoJsonUrl)
            break;
        }
        this.addElementname();
        this.$store.state.layerId= "";
      },
      //请求地址参数拼接
      getPostUrl(elementurl){
        var url = DatapostUrl+elementurl+'params='+
          "data:"+this.timeValue+
          ",hour:"+this.Htime+
          ",fcstHour:"+this.startTime+
          ",modelType:"+this.patternValue+
          ",feature:"+this.$store.state.elementType+
          ",level:500";
        return url;
      },
      //点击气压层要素渲染数据
      metegrapheClick(item,index){
        console.log(item,index)
        this.metegrapheClickIndex = index;
        this.airplayMode = [];
        var Graphdata = item.Graph;
        for(var i=0;i<Graphdata.length;i++){
          var temp = {
            label:item.Graph[i].GraphName,
            value:item.Graph[i].GraphType
          }
          this.airplayMode.push(temp);
        }
        this.$store.state.elementType = item.elementType;
        console.log("this.$store.state.elementType"+this.$store.state.elementType)
        this.managename = item.msg;
      },
      //切换层级
      levelChange(){

        console.log("levelChange")
        this.airplayModeurl=[];
        console.log("levelChange");
        this.Leveldataelement = [];
        var objs = this.dataSet[this.modelselect]["Levels"];
        for(var i = 0;i<objs.length;i++){
            if(this.levelstatus == objs[i].value){
              console.log("LevelNameOption"+this.modelselect,this["LevelNameOption"+this.modelselect]);
              this.Leveldataelement = this["LevelNameOption"+this.modelselect][objs[i].metegraphelment];
              this.$store.state.level = this.levelstatus;
            }
        }
      },
      //要素下拉框选择
      //切换要素
      allelementClick(){
        console.log(this.elementstatus)
        this.airstatus = '';
        var data = this.Leveldataelement;
        var object = data.find((value) => {
            if(value.elementType == this.elementstatus)
            return value;
        })
        console.log(object)
        this.airplayMode = [];
        this.airplayModeurl = [];
        this.status = "";
        var data = object.Graph;
        for(var i=0;i<data.length;i++){
          var temp = {
            label:object.Graph[i].GraphName,
            value:object.Graph[i].GraphType
          }
          this.airplayMode.push(temp);

          this.airplayModeurl.push(object.Graph[i].CategoryType)
        }
        this.$store.state.elementType = object.elementType;
        this.managename = object.msg;
      },
      //切换展示方式
      airModeClick(){
       // this.postUrl();
        console.log("airModeClick"+this.airstatus);
        var graphType;
        if(this.airstatus==undefined || this.airstatus == "") return;
        var url = this.getDataPost[this.airstatus+"URL"];
        graphType = this.airstatus;
        var postUrl = this.getPostUrl(url);
        console.log(postUrl);
        var datatemp = this.getaddLayerFormat(postUrl,graphType);
        this.$store.state.dataValue = {
          add:[datatemp]
        };
        this.addElementname(datatemp.id);
        this.$store.state.layerId= "";
        this.$store.state.chufa = true;
      },
      getaddLayerFormat(url,graphType){
        var datatemp = {
          id:this.$store.state.elementType+this.levelstatus+graphType,
          url:url,
          graphType:graphType,
        };
        return datatemp;
      },
      gethideLayerFormat(id,graphType){
          var datatemp = {
            id :id,
            graphType:graphType
          }
          return datatemp;
      },
      getshowLayerFormat(id,graphType){
        var datatemp = {
          id :id,
          graphType:graphType
        }
        return datatemp;
      },
      //可见方法
      visibleElementClick(item){
        console.log("visible="+item.value);
        var datatemp = this.gethideLayerFormat(item.value,"")
        this.$store.state.dataValue = {
          show:[datatemp]
        };
        this.$store.state.chufa = true;
      },
      //不可见方法
      deleteElementClick(item){
        console.log("deleteElementClick"+item.value)
        console.log(item)
        //this.$store.state.layerId = item.value;
        var datatemp = this.gethideLayerFormat(item.value,"");
        this.$store.state.dataValue = {
          hide:[datatemp]
        };
        this.$store.state.chufa = true;
      },
      highelementClick(item,index){
        this.elementClickIndex = index;
      },
      hynthesisanalyzeswitchChange(status) {
        var col_title = $("#hynthesispressureCollapse");
        if (status == true) {
          this.hynthesispressureCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.hynthesispressureCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//经典组合开关点击方法
      hynthesisaddelmentswitchChange(status) {
        var col_title = $("#hynthesisaddelment");
        if (status == true) {
          this.hynthesisaddelment = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.hynthesisaddelment = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//添加要素开关点击方法
      synthesisemanageswitchChange(status) {
        var col_title = $("#synthesisemanageCollapes");
        if (status == true) {
          this.synthesisemanageCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.synthesisemanageCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//图层管理面板开关点击方法
    },
    mounted() {
//      this.timeValue = this.$store.state.formatDate(new Date());
        this.patternValue = '511';
        this.patternClick(this.patternValue);
        this.levelstatus = "500";
        console.log(this.levelstatus);
        this.levelChange();
        this.elementstatus = "temp";
        this.allelementClick();
        this.getDate(this.timeValue)
    }
  }
</script>
<style>
  /*总体样式*/
  .synthesis{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .synthesis .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .synthesis .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .synthesis .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .synthesis .analyzecolor{
    border-left:4px solid #00D062;
  }
  .synthesis .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .synthesis .managecolor{
    border-left:4px solid #6E63FF;
  }

  /*预报时间样式*/
  .synthesis .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .synthesis .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .synthesis .colselect_top{
    margin-top:10px;
  }
  .synthesis .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .synthesis .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*数据源*/
  .synthesis .station{
    margin:12px 22px 0 12px;
  }

  /*投影方式*/
  .synthesis .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    /*margin-top:10px;*/
    color:#fff;
    border:none;
  }
  .synthesis .ivu-select-arrow{
    color:#fff;
  }

  /*开关折叠样式*/
  .synthesis .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .synthesis .switch{
    margin-top:10px;
    float:right;
  }
  .synthesis .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .synthesis .ivu-switch-checked{
    border-color: #00D062;
    background-color: #00D062;
  }

  /*复选框*/
  .synthesis .ivu-checkbox-checked .ivu-checkbox-inner{
    border-color: #00D062;
    background-color: #00D062;
  }


  /*要素显示样式*/
  .synthesis .iselementActive{
    color:#fff;
  }
  .synthesis .sy-elemt{
    display: flex;
    /*justify-content: space-between;*/
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .synthesis .sy-btn{
    width: 60px;
    height: 24px;
    border-radius: 2px;
    padding:0;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);

    background:#04A5F7;
    border:none;
    margin:0 10px 10px 0;
  }
  .synthesis .sy-title{
    text-align: left;
    height: 22px;
    line-height: 22px;
  }
  .synthesis .sy-comm{
    margin-bottom:10px;
  }
  .synthesis .noelementActive{
    color:#fff;
    background-color: #0D1014;
    border-radius: 2px;
    width: 60px;
    height: 24px;
    line-height:24px;
    padding:0;
    border:none;
    margin:0 10px 10px 0;
  }

  /*分析内容*/
  .synthesis .analyze_col{
    margin:0 10px 10px 0;
    text-align:left;
  }
  .synthesis .analyze_col:last-child{
    margin:0 10px 10px 24px;
  }
  .synthesis .ivu-checkbox{
    margin-right:5px;
  }
  .synthesis .analyze_button{
    background: none;
    color: #fff;
    height: 24px;
    padding: 0;
    line-height: 24px;
    width:100%;
    margin: 0 10px 10px 0;
    float: right;
    border:none;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    background: #11cf6f;
  }

  /*参数设置*/
  .synthesis .sy-title-text{
    color:#fff;
    text-align:left;
  }
  .synthesis .isobar{
    padding-left:3%;
  }
  .synthesis .ivu-input-small{
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
  }
  .synthesis .line{
    text-align: center;
    width:100%;
    margin-bottom:10px;
  }
  .synthesis .line_bottom{
    margin-bottom:16px;
  }
  .synthesis .ivu-color-picker{
    width:100%;
  }
  .synthesis .ivu-color-picker-small .ivu-color-picker-color{
    width:40px;
  }
  .synthesis .ivu-color-picker-color div{
    border-radius:10px;
  }

  /*图层管理样式start*/
  .synthesis .manageelementclick{
    border-radius:10px;
    border:none;
    background:#6E63FF;
    width:40%;
    padding:0;
    color:#fff;
    height:22px;
    line-height:22px;
  }
  /*图层管理样式end*/

</style>
