<template>
  <div class="Multimode">
    <!--预报时间-->
    <Row class="forecasetime singlecolor">
      <i-col span="4" class="ground_text">预报时间</i-col>
      <i-col span="8" class="datePicker">
        <DatePicker  type="date" :value="timeValue"  confirm  @on-change="getDate" placeholder="选择日期"></DatePicker>
      </i-col>
      <i-col span="8" class="selecttime">
        <TimePicker :value="Htime" class="getTime" format="HH"></TimePicker>
      </i-col>
    </Row>

    <ul class="sy-lists">
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">模式选择</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small">
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
            <i-select size="small">
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
            <i-select size="small">
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
            <i-select size="small">
              <i-option v-for="(item,index) in hetare1" :value="item.value" :key="index">{{ item.label }}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>
      <!-- 起报时间 end -->

      <!-- 典型组合 start -->
      <li>
        <Row class="col_forecasetime pressurecolor" id="modepressureCollapse">
          <i-col span="6" class="ground_text">典型组合</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="modepressureswitch" @on-change="modeanalyzeswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse pressurecolor" style="padding:0 10px 10px 10px;text-align: left" v-show="modepressureCollapes">
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
        <Row class="col_forecasetime analyzecolor" id="modeaddelment">
          <i-col span="6" class="ground_text">添加要素</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="modeaddelmentswitch" @on-change="modeaddelmentswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row  class="switch_collapse analyzecolor" v-show="modeaddelment">
          <Row class="sy-comm">
            <i-col span="5" class="sy-title">层次选择</i-col>
            <i-col span="12" class="level">
              <i-select size="small">
                <i-option v-for="(item,index) in elemt" :value="item.msg" :key="item.msg">{{item.msg}}</i-option>
              </i-select>
            </i-col>
          </Row>
          <Row class="sy-comm">
            <i-col span="5" class="sy-title">要素选择</i-col>
            <i-col span="12" class="level">
              <i-select size="small">
                <i-option v-for="item in elemt" :value="item.msg" :key="item.msg">{{item.msg}}</i-option>
              </i-select>
            </i-col>
          </Row>
          <Row class="sy-comm">
            <i-col span="5" class="sy-title">展示方式</i-col>
            <i-col span="12" class="level">
              <i-select size="small">
                <i-option v-for="item in elemt" :value="item.msg" :key="item.msg" >{{item.msg}}</i-option>
              </i-select>
            </i-col>
          </Row>
        </Row>
      </li>
      <!-- 其他 end -->

      <!-- 图层管理面板 start -->
      <li>
        <Row class="col_forecasetime managecolor" id="modemanageCollapes">
          <i-col span="6" class="ground_text">图层管理面板</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="modemanageswitch" @on-change="modemanageswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse managecolor" v-show="modemanageCollapes">
          <!--<div slot="content" style="padding:0;">-->
          <!--<Row class="sy-comm roundelement" v-for="(item,index) in this.elemt">-->
          <!--<i-col span="12">-->
          <!--<i-button class="tucengelement elementdisclick">{{item.msg}}</i-button>-->
          <!--</i-col>-->
          <!--<i-col span="6">-->
          <!--<i-button class="tucengelement elementclick" @click="visibleElementClick(item)">{{item.msg}}</i-button>-->
          <!--</i-col>-->
          <!--<i-col span="3">-->
          <!--<i-button class="tucengelement elementclick" @click="deleteElementClick(item)">{{item.msg}}</i-button>-->
          <!--</i-col>-->
          <!--</Row>-->
          <!--</div>-->
        </Row>
      </li>
      <!-- 图层管理面板 end -->
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1: '1',//要素选择折叠面板
        Layermanagevalue:'',//图层管理折叠面板
        modemanageCollapes:true,
        modemanageswitch:true,
        Typicalvalue:'',//典型组合折叠面板
        modepressureCollapes:true,
        modepressureswitch:true,
        modeaddelment:true,
        modeaddelmentswitch:true,
        timeValue:'',
        Htime:'00',
        pattern: [{   //模式选择
          value:'欧洲细网格',
          label:'欧洲细网格'
        },{
          value:'美国GFS',
          label:'美国GFS'
        },{
          value:'jun内T99',
          label:'jun内T99'
        },{
          value:'日本谱模式',
          label:'日本谱模式'
        },{
          value:'国家T639',
          label:'国家T639'
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
        time: [{   //预报时次
          value:'墨卡托投影1',
          label:'墨卡托投影1'
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
        time1: [{   //其他预报时次
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
        hetare: [{   //高度场
          value:'200hpa',
          label:'200hpa'
        },{
          value:'500hpa',
          label:'500hpa'
        },{
          value:'700hpa',
          label:'700hpa'
        },{
          value:'850hpa',
          label:'850hpa'
        }],
        hetare1: [{   //其他高度场
          value:'10',
          label:'10'
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
        biaoData: [{   //标量数据
          value:'等值线',
          label:'等值线'
        },{
          value:'等值面',
          label:'等值面'
        }],
        shiData: [{   //矢量数据
          value:'风向杆',
          label:'风向杆'
        },{
          value:'流线',
          label:'流线'
        },{
          value:'箭头',
          label:'箭头'
        },{
          value:'动态',
          label:'动态'
        }],
        zuList: [ //典型组合
          {value: '500pha高度+850风场+850大风速（大于等于12）',label:'500pha高度+850风场+850大风速（大于等于12）'},
          {value: '500pha高度+海平面气压',label:'500pha高度+海平面气压'},
          {value: '500pha高度+海平面气压500到850风场+850大风速',label:'500pha高度+海平面气压500到850风场+850大风速'}
        ],
        vcal: '500pha高度+850风场+850大风速（大于等于12）',  //典型组合
        perzuhe:'自定义组合',
        elemt: [  //预报要素
          {msg: '温度',value:"isoline"},
          {msg: '地面气压',value:"isosurfacevector"},
          {msg: '风',value:"wsl"},
          {msg: '十米风',value:"wws"},
          {msg: '云图',value:"img"},
          {msg: '降水量'},
          {msg: '总降水量'},
          {msg: '平均海平面气压'},
          {msg: '散度'},
          {msg: '位势高度'},
          {msg: '水汽通量散度'},
          {msg: '涡度'},
          {msg: '相当位温'},
          {msg: '温度露点差'},
          {msg: '地面温度'},
          {msg: '垂直速度'}
        ],
        tucengmanage:[
          {msg: '温度',visible:'可见',disvisible:'不可见',value:"isoline"},
          {msg: '地面气压',visible:'可见',disvisible:'不可见',value:"isosurfacevector"},
          {msg: '风',visible:'可见',disvisible:'不可见',value:"wsl"},
          {msg: '十米风',visible:'可见',disvisible:'不可见',value:"wws"},
          {msg: '云图',visible:'可见',disvisible:'不可见',value:"img"}
        ],
      }
    },
    methods: {
      getDate(value) { //获取日期
        this.timeValue = value ;
      },
      Pretime(){ //前一天
        this.timeValue = this.$store.state.PreTime(this.timeValue);
      },
      Nexttime(){ //后一天
        this.timeValue = this.$store.state.NextTime(this.timeValue);
      },
      Reset(){  //刷新
        this.timeValue = '';
      },
      drawCompare(item,value){
          this.$store.state.drawCompare = item.value;
      },
      highelementClick(item,index){
        this.elementClickIndex = index;
      },
      modeanalyzeswitchChange(status) {
        var col_title = $("#modepressureCollapse");
        if (status == true) {
          this.modepressureCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.modepressureCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//站点选择开关点击方法
      modeaddelmentswitchChange(status){
        var col_title = $("#modeaddelment");
        if (status == true) {
          this.modeaddelment = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.modeaddelment = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//分析内容开关点击方法
      modemanageswitchChange(status){
        var col_title = $("#modemanageCollapes");
        if (status == true) {
          this.modemanageCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.modemanageCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },
    },
    mounted() {
      this.timeValue = this.$store.state.formatDate(new Date());
      this.$store.state.colorIndex=  2;
    }
  }

</script>

<style>
  /*总体样式*/
  .Multimode{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .Multimode .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .Multimode .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .Multimode .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .Multimode .analyzecolor{
    border-left:4px solid #00D062;
  }
  .Multimode .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .Multimode .managecolor{
    border-left:4px solid #6E63FF;
  }
  .Multimode .colselect_top{
    margin-top:10px;
  }

  /*预报时间样式*/
  .Multimode .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .Multimode .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .Multimode .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .Multimode .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*投影方式*/
  .Multimode .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    color:#fff;
    border:none;
  }
  .Multimode .ivu-select-arrow{
    color:#fff;
  }

  /*开关折叠样式*/
  .Multimode .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .Multimode .switch{
    margin-top:10px;
    float:right;
  }
  .Multimode .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .Multimode .ivu-switch-checked{
    border-color: #00D062;
    background-color: #00D062;
  }

  /*要素选择*/
  .Multimode .sy-title{
    text-align: left;
    height: 22px;
    line-height: 22px;
  }
  .Multimode .sy-comm{
    margin-bottom:10px;
  }

</style>
