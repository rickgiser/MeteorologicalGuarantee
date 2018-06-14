<template>
  <div class="stationanalyze">
    <!--预报时间-->
    <Row class="forecasetime singlecolor">
      <i-col span="4" class="ground_text">预报时间</i-col>
      <i-col span="8" class="datePicker">
        <DatePicker  type="date" :value="timeValue"  confirm  placeholder="选择日期"></DatePicker>
      </i-col>
      <i-col span="8" class="selecttime">
        <TimePicker :value="Htime" class="getTime" format="H" placeholder="选择时次"></TimePicker>
      </i-col>
    </Row>

    <ul class="sy-lists">
      <!--区域选择-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">区域选择</i-col>
          <i-col span="18">
            <i-select size="small">
              <i-option v-for="(item,index) in stationareaSelect" :value="item.value" :key="item.value">{{item.label}}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!--数据源选择-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">数据源</i-col>
          <i-col span="6" class="station">
            <Checkbox v-model="platform">地方站台</Checkbox>
          </i-col>
          <i-col span="6" class="station">
            <Checkbox v-model="ations">jun内站台</Checkbox>
          </i-col>
        </Row>
      </li>

      <!-- 站点选择 start -->
      <li>
        <Row class="col_forecasetime pressurecolor" id="stationanalyzepressureCollapse">
          <i-col span="6" class="ground_text">站点选择</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="stationanalyzepressureswitch" @on-change="stationanalyzepressureswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse pressurecolor" style="padding-right:10px;" v-show="stationanalyzepressureCollapes">
          <Row>
            <i-col span="6" class="sy-title-text">站点名称</i-col>
            <i-col span="18">
              <i-input size="small" placeholder="输入"></i-input>
            </i-col>
          </Row>
          <!--<div class="sy-elemt">-->
            <!--<Row class="line_bottom">-->
              <!--<i-col span="12">-->
                <!--<Row align="middle" type="flex">-->
                  <!--<i-col span="5" class="sy-title-text"><p>站号</p></i-col>-->
                  <!--<i-col span="17">-->
                    <!--<i-input size="small" placeholder="输入"></i-input>-->
                  <!--</i-col>-->
                <!--</Row>-->
              <!--</i-col>-->

              <!--<i-col span="12">-->
                <!--<Row align="middle" type="flex">-->
                  <!--<i-col span="5" class="sy-title-text"><p>站号</p></i-col>-->
                  <!--<i-col span="17">-->
                    <!--<i-input size="small" placeholder="输入"></i-input>-->
                  <!--</i-col>-->
                <!--</Row>-->
              <!--</i-col>-->
            <!--</Row>-->
          <!--</div>-->

          <!--<div class="sy-elemt">-->
            <!--<Row class="line_bottom">-->
              <!--<i-col span="12">-->
                <!--<Row align="middle" type="flex">-->
                  <!--<i-col span="5" class="sy-title-text"><p>经度</p></i-col>-->
                  <!--<i-col span="17">-->
                    <!--<i-input size="small" placeholder="输入"></i-input>-->
                  <!--</i-col>-->
                <!--</Row>-->
              <!--</i-col>-->

              <!--<i-col span="12">-->
                <!--<Row align="middle" type="flex">-->
                  <!--<i-col span="5" class="sy-title-text"><p>维度</p></i-col>-->
                  <!--<i-col span="17">-->
                    <!--<i-input size="small" placeholder="输入"></i-input>-->
                  <!--</i-col>-->
                <!--</Row>-->
              <!--</i-col>-->
            <!--</Row>-->
          <!--</div>-->
        </Row>
      </li>

      <!--分析内容-->
      <li>
        <Row class="col_forecasetime analyzecolor" id="stationanalyzeanalyzeCollapse">
          <i-col span="6" class="ground_text">分析内容</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="stationanalyzeanalyseswitch" @on-change="stationanalyzeanalyzeswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse analyzecolor" v-show="stationanalyzeanalyzeCollapes">
          <div class="sy-elemt">
              <i-button class="sy-btn" v-for="(item,index) in analyzeContent" :key="item.label" @click="stationanalyzeClick(item,index)"><div :class="item.disable? 'iselementActive':'noelementActive'">{{item.label}}</div></i-button>
          </div>
        </Row>

      </li>

      <!-- 图层管理面板 start -->
      <li>
        <Row class="col_forecasetime managecolor" id="stationanalyzemanageCollapes">
          <i-col span="6" class="ground_text">图层管理面板</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="stationanalyzemanageswitch" @on-change="stationanalyzemanageswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse managecolor" v-show="stationanalyzemanageCollapes">

        </Row>
      </li>

    </ul>
  </div>
</template>
<script>
  import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
  export default {
    components: {ElIcon}, data() {
      return{
        timeValue:'',
        Htime:'',
        index:0,
        elementClickIndex:0,
        stationareaSelect:[
          {label:'全国',value:'全国'},
          {label:'北京',value:'北京'},
          {label:'山东',value:'山东'},
          {label:'上海',value:'上海'},
          {label:'广州',value:'广州'},
        ],//层次选择
        platform:false,//地方站台
        ations:false,//jun内站台
        stationanalyzepressureCollapes:true,//站点选择显示面板
        stationanalyzepressureswitch:true,//站点选择开关
        analyzeContent:[
          {label:'三线图',value:'三线图',disable:false},
          {label:'九线图',value:'九线图',disable:false},
          {label:'高空要素曲线图',value:'高空要素曲线图',disable:false},
          {label:'地面要素变量演变',value:'地面要素变量演变',disable:false},
          {label:'地面要素24小时演变',value:'地面要素24小时演变',disable:false},
          {label:'单站时次演变',value:'单站时次演变',disable:false},
        ],//分析方式
        analyzeContentshow:'三线图',//分析方式复选框初始值
        color1:'#ff0000',
        stationanalyzeanalyzeCollapes:true,//分析内容折叠面板
        stationanalyzeanalyseswitch:true,
        stationanalyzemanageCollapes:true,//图层管理折叠面板
        stationanalyzemanageswitch:true,
      }
    },
    methods:{
      highelementClick(item,index){
          this.elementClickIndex = index;
        },
      stationanalyzepressureswitchChange(status) {
          var col_title = $("#stationanalyzepressureCollapse");
          if (status == true) {
            this.stationanalyzepressureCollapes = true;
            col_title.css("border-bottom-left-radius", "0px")
            col_title.css("border-bottom-right-radius", "0px")
          } else {
            this.stationanalyzepressureCollapes = false;
            col_title.css("border-bottom-left-radius", "6px")
            col_title.css("border-bottom-right-radius", "6px")
          }
        },//站点选择开关点击方法
      stationanalyzeanalyzeswitchChange(status){
          var col_title = $("#stationanalyzeanalyzeCollapse");
          if (status == true) {
            this.stationanalyzeanalyzeCollapes = true;
            col_title.css("border-bottom-left-radius", "0px")
            col_title.css("border-bottom-right-radius", "0px")
          } else {
            this.stationanalyzeanalyzeCollapes = false;
            col_title.css("border-bottom-left-radius", "6px")
            col_title.css("border-bottom-right-radius", "6px")
          }
        },//分析内容开关点击方法
      stationanalyzeClick(item,index){
          console.log(item.disable)
        item.disable = !item.disable;
        if(item.disable == true){
           this.$store.state.showelementbox = true;
        }
        else if(item.disable == false){
          this.$store.state.showelementbox = false;
        }
      },//分析要素按钮点击方法
      stationanalyzemanageswitchChange(status){
          var col_title = $("#stationanalyzemanageCollapes");
          if (status == true) {
            this.stationanalyzemanageCollapes = true;
            col_title.css("border-bottom-left-radius", "0px")
            col_title.css("border-bottom-right-radius", "0px")
          }else if(status == false){
            this.stationanalyzemanageCollapes = false;
            col_title.css("border-bottom-left-radius", "6px")
            col_title.css("border-bottom-right-radius", "6px")
          }
      },
    },
    mounted(){
      this.$store.state.groundcolorIndex =  3;
    }
  }
</script>
<style>
  /* 总体样式*/
  .stationanalyze{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .stationanalyze .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .stationanalyze .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .stationanalyze .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .stationanalyze .analyzecolor{
    border-left:4px solid #BDF42C;
  }
  .stationanalyze .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .stationanalyze .managecolor{
    border-left:4px solid #6E63FF;
  }
  /*预报时间样式*/
  .stationanalyze .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .stationanalyze .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .stationanalyze .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .stationanalyze .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*投影方式*/
  .stationanalyze .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    margin-top:10px;
    color:#fff;
    border:none;
  }
  .stationanalyze .ivu-select-arrow{
    color:#fff;
  }

  /*数据源*/
  .stationanalyze .station{
    margin:12px 22px 0 12px;
  }

  /*开关折叠样式*/
  .stationanalyze .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .stationanalyze .switch{
    margin-top:10px;
    float:right;
  }
  .stationanalyze .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .stationanalyze .ivu-switch-checked{
    border-color: #00D062;
    background-color: #00D062;
  }

  /*要素显示样式*/
  .stationanalyze .iselementActive{
    color:#000;
    font-size:12px;
  }
  .stationanalyze .sy-elemt{
    display: flex;
    /*justify-content: space-between;*/
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .stationanalyze .noelementActive{
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
  .stationanalyze .sy-elemt{
    display: flex;
    /*justify-content: space-between;*/
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .stationanalyze .sy-btn{
    width: 165px;
    height: 24px;
    border-radius: 3px;
    padding:0;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    background:#BDF42C;
    border:none;
    margin:0 10px 10px 0;
  }
  .stationanalyze .noelementActive{
    color:#fff;
    background-color: #0D1014;
    border-radius: 2px;
    width: 165px;
    height: 24px;
    line-height:24px;
    padding:0;
    border:none;
    margin:0 10px 10px 0;
  }

  /*参数设置*/
  .stationanalyze .sy-title-text{
    color:#fff;
    font-size:12px;
    text-align: left;
    height:22px;
    line-height:24px;
    margin-bottom:10px;
  }
  .stationanalyze .ivu-input-small{
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
  }
  .stationanalyze .line_bottom{
    margin-bottom:10px;
  }
  .sy-elemt.sy>div{
    width: 50%;
    text-align: left;
    margin-bottom: 10px;
  }

  /*图层管理面板样式*/
  .stationanalyze .managelabel{
    padding-left:13px;
  }
</style>
