<template>
  <div class="alone">
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
      <!-- 模式选择 -->
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

      <!-- 站点选择 -->
      <li>
        <Row class="col_forecasetime pressurecolor" id="alonepressureCollapse">
          <i-col span="6" class="ground_text">站点选择</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="alonepressureswitch" @on-change="alonepressureswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse pressurecolor" style="padding-right:10px;" v-show="alonepressureCollapes">
          <div class="sy-elemt">
            <Row class="line_bottom">
              <i-col span="12">
                <Row align="middle" type="flex">
                  <i-col span="5" class="sy-title-text"><p>省份</p></i-col>
                  <i-col span="17">
                    <i-select :model.sync="city" size="small">
                      <i-option v-for="(item,index) in cityList" :value="item.value" :key="index">{{ item.label }}</i-option>
                    </i-select>
                  </i-col>
                </Row>
              </i-col>

              <i-col span="12">
                <Row align="middle" type="flex">
                  <i-col span="5" class="sy-title-text"><p>站点</p></i-col>
                  <i-col span="17">
                    <i-select :model.sync="city1" size="small">
                      <i-option v-for="(item,index) in cityList" :value="item.value" :key="index">{{ item.label }}</i-option>
                    </i-select>
                  </i-col>
                </Row>
              </i-col>
            </Row>
          </div>

          <div class="sy-elemt">
            <Row class="line_bottom">
              <i-col span="12">
                <Row align="middle" type="flex">
                  <i-col span="5" class="sy-title-text"><p>查询</p></i-col>
                  <i-col span="17">
                    <i-input size="small" placeholder="输入"></i-input>
                  </i-col>
                </Row>
              </i-col>

              <i-col span="12">
                <Row align="middle" type="flex">
                  <i-col span="5" class="sy-title-text"><p>条件</p></i-col>
                  <i-col span="17">
                    <i-select :model.sync="citySel" size="small">
                      <i-option v-for="(item,index) in citySelect" :value="item.value" :key="index">{{ item.label }}</i-option>
                    </i-select>
                  </i-col>
                </Row>
              </i-col>
            </Row>
          </div>
        </Row>
      </li>

      <!-- 分析方式 -->
      <li>
        <Row class="col_forecasetime analyzecolor" id="aloneCollapse">
          <i-col span="6" class="ground_text">分析内容</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="aloneswitch" @on-change="aloneswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse analyzecolor" v-show="aloneCollapes">
          <i-button  v-for="(item,index) in fenStyle" @click="fenstyleClick(item,index)" :class="item.disable? 'isivu-btn':'ivu-btn'" :key="index">{{item.msg}}</i-button>
        </Row>
      </li>

      <!-- 选择要素 -->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">要素选择</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small">
              <i-option v-for="item in this.elemt" :value="item.msg" :key="item.msg">{{item.msg}}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">展示方式</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small">
              <i-option v-for="item in this.elemt" :value="item.msg" :key="item.msg">{{item.msg}}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">选择要素</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small">
              <i-option v-for="item in this.elemt" :value="item.msg" :key="item.msg">{{item.msg}}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!-- 图层管理面板 -->
      <li>
        <Row class="col_forecasetime managecolor" id="alonemanageCollapes">
          <i-col span="6" class="ground_text">图层管理面板</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="alonemanageswitch" @on-change="alonemanageswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse managecolor" v-show="alonemanageCollapes">

        </Row>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
          //站点选择折叠
        alonepressureCollapes:true,
        alonepressureswitch:true,
        //内容分析
        aloneCollapes:true,
        aloneswitch:true,
        Layermanagevalue:'1',//图层管理面板折叠
        alonemanageCollapes:true,
        alonemanageswitch:true,
        elemt: [  //预报要素
          {msg: '风'},
          {msg: '地面气压'},
          {msg: '温度'},
          {msg: '相对气压'},
          {msg: '相对温度'},
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
          {msg: '垂直速度'},
        ],
        pattern: [{   //模式选择
          value:'欧洲细网格',
          label:'欧洲细网格'
        },{
          value:'欧洲中细',
          label:'欧洲中细'
        },{
          value:'欧洲集合报',
          label:'欧洲集合报'
        },{
          value:'美国GFS',
          label:'美国GFS'
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
        time: [{   //预报时次
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
        cityList: [{ //省份
            value: 'beijing',
            label: '北京市'
        },{
            value: 'shanghai',
            label: '上海市'
        },{
            value: 'shenzhen',
            label: '深圳市'
        },{
            value: 'hangzhou',
            label: '杭州市'
        },{
            value: 'nanjing',
            label: '南京市'
        },{
            value: 'chongqing',
            label: '重庆市'
        }],
        citySelect: [{ //查询条件
            value: '站点名称',
            label: '站点名称'
        },{
            value: '站点编号',
            label: '站点编号'
        }],
        fenStyle: [  //分析方式
          {msg: '垂直剖面',disable:false},
          {msg: '时间序列',disable:false},
          {msg: '综合图',disable:false},
          {msg: '单站一致性预报',disable:false}
        ],
        t_value: '',//时间
        timeValue: '',//日期
        Htime: new Date(),//默认的日期显示
        city: '',  //城市
        city1: '', //站点选择
        citySel: '', //查询条件
        fenSty: '垂直剖面', //分析方式
        pattern_value: '',  //模式
        time_value: ''  //预报时次
      }
    },
    methods: {
      isActive() {
        $('.sy-selSty:eq('+0+')').addClass('patterActive');
        $('.sy-selSty').click(function(){
          $(this).addClass('patterActive').siblings().removeClass('patterActive');
        })
      },
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
      highelementClick(item,index){
        this.elementClickIndex = index;
      },
      alonepressureswitchChange(status) {
        var col_title = $("#alonepressureCollapse");
        if (status == true) {
          this.alonepressureCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.alonepressureCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//站点选择开关点击方法
      aloneswitchChange(status){
        var col_title = $("#aloneCollapse");
        if (status == true) {
          this.aloneCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.aloneCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//分析内容开关点击方法
      fenstyleClick(item,index){
        item.disable = !item.disable;
      },
      alonemanageswitchChange(status){
        var col_title = $("#alonemanageCollapes");
        if (status == true) {
          this.alonemanageCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.alonemanageCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },
    },


    mounted() {
      this.isActive();
      this.timeValue = this.$store.state.formatDate(new Date());
      this.$store.state.colorIndex=  1;
    }
  }

</script>

<style>
  /*总体样式*/
  .alone{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .alone .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .alone .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .alone .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .alone .analyzecolor{
    border-left:4px solid #00D062;
  }
  .alone .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .alone .managecolor{
    border-left:4px solid #6E63FF;
  }

  /*预报时间样式*/
  .alone .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .alone .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .alone .colselect_top{
    margin-top:10px;
  }
  .alone .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .alone .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*投影方式*/
  .alone .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    color:#fff;
    border:none;
  }
  .alone .ivu-select-arrow{
    color:#fff;
  }

  /*参数设置*/
  .alone .sy-title-text{
    color:#fff;
    text-align:left;
  }
  .alone .isobar{
    padding-left:3%;
  }
  .alone .ivu-input-small{
    text-align: center;
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
  }
  .alone .line{
    text-align: center;
    width:100%;
    margin-bottom:10px;
  }
  .alone .line_bottom{
    margin-bottom:16px;
  }
  .alone .ivu-color-picker{
    width:100%;
  }
  .alone .ivu-color-picker-small .ivu-color-picker-color{
    width:40px;
  }
  .alone .ivu-color-picker-color div{
    border-radius:10px;
  }
  /*开关折叠样式*/
  .alone .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .alone .switch{
    margin-top:10px;
    float:right;
  }
  .alone .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .alone .ivu-switch-checked {
    border-color: #00D062;
    background-color: #00D062;
  }
  /*分析内容start*/
  .alone .ivu-btn{
    border:none;
    background:#0D1014;
    color:#fff;
    border-radius:2px;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    height: 26px;
    padding: 0 10px;
    margin: 8px 5px;
    line-height:26px;
  }
  .alone .isivu-btn{
    border:none;
    background:#04A5F7;
    color:#fff;
    border-radius:2px;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    height: 26px;
    padding: 0 10px;
    margin: 8px 5px;
    line-height:26px;
  }
  .alone .sy-title{
    color:#fff;
    font-size:14px;
    padding-top:4px;
  }
</style>
