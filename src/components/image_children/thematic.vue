<template>
  <div class="thematic">
    <!--预报时间-->
    <Row class="forecasetime singlecolor">
      <i-col span="4" class="ground_text">预报时间</i-col>
      <i-col span="8" class="datePicker">
        <DatePicker  type="date" :value="imgtimeValue"  confirm  placeholder="选择日期"></DatePicker>
      </i-col>
      <i-col span="8" class="selecttime">
        <TimePicker :value="imgHtime" class="getTime" format="H" placeholder="选择时次" ></TimePicker>
      </i-col>
    </Row>

    <ul class="sy-lists">
      <!--专题选择-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">专题选择</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small">
              <i-option v-for="(item,index) in projectSelect" :value="item.value" :key="item.value">{{item.label}}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>
      <!--模式选择-->
      <li>
        <Row class="col_forecasetime pressurecolor" id="thematic_modalSelect">
          <i-col span="6" class="ground_text">模式选择</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="fac_sourcethematic_modalswitch" @on-change="thematic_modalswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse pressurecolor" type="flex" v-show="thematic_modalCollapse">
          <i-col span="6" class="col_play" v-for="(item,index) in forecastModal" :key="item.value">
            <Radio-group v-model="forecastModalshow" :value="item.value">
              <Radio :label="item.label" ></Radio>
            </Radio-group>
          </i-col>
        </Row>
      </li>

      <!--要素选择-->
      <li>
        <Row class="col_forecasetime elementcolor" id="thematic_elementSelect">
          <i-col span="6" class="ground_text">要素选择</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="thematic_elementswitch" @on-change="thematic_elementChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse elementcolor" type="flex" v-show="thematic_elementCollapse">
          <i-col span="6" class="col_play" v-for="(item,index) in forecastelemetModal" :key="item.value">
            <Radio-group v-model="forecastelemetModalshow" :value="item.value">
              <Radio :label="item.label" ></Radio>
            </Radio-group>
          </i-col>
        </Row>
      </li>

      <!--间隔选择-->
      <li>
        <Row class="col_forecasetime analyzecolor" id="thematic_timeSelect">
          <i-col span="6" class="ground_text">间隔选择</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="thematic_timeswitch" @on-change="thematic_timeChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse analyzecolor" type="flex" v-show="thematic_timeCollapse">
          <i-col span="6" class="col_play" v-for="(item,index) in timeSelect" :key="item.value">
            <Radio-group v-model="timeSelectshow" :value="item.value">
              <Radio :label="item.label" ></Radio>
            </Radio-group>
          </i-col>
        </Row>
      </li>

      <!--图层设置-->
      <li>
        <Row class="col_forecasetime managecolor" id="thematic_tucengsetting">
          <i-col span="6" class="ground_text">图层设置</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="thematic_tucengswitch" @on-change="thematic_tucengChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse managecolor" type="flex" v-show="thematic_tucengCollapse">
          <i-col class="col_tuceng">
            <i class="fa fa-fast-backward"></i><p>上一帧</p>
          </i-col>
          <i-col class="col_tuceng">
            <i class="fa fa-fast-forward"></i><p>下一帧</p>
          </i-col>
          <i-col class="col_tuceng">
            <i class="fa fa-refresh"></i><p>旋转</p>
          </i-col>
          <i-col class="col_tuceng">
            <i class="fa fa-plus-square-o"></i><p>累加显示</p>
          </i-col>
          <i-col class="col_tuceng">
            <i class="fa fa-arrows-alt"></i><p>多图对比</p>
          </i-col>
        </Row>
      </li>
    </ul>
  </div>
</template>
<script>
  import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
  export default{
    components: {ElIcon}, data() {
      return{
        imgtimeValue:'',
        imgHtime:'',
        projectSelect:[
          {label:'预报专题',value:'预报专题'},
          {label:'实况专题',value:'实况专题'},
        ],
        forecastModal:[
          {label:'美国',value:'美国'},
          {label:'欧洲',value:'欧洲'},
          {label:'日本',value:'日本'}
        ],//模式选择
        fac_sourcethematic_modalswitch:true,//模式选择开关
        thematic_modalCollapse:true,//模式选择折叠面板
        thematic_elementswitch:true,//要素选择开关
        thematic_elementCollapse:true,//要素选择折叠面板
        thematic_timeswitch:true,//间隔选择开关
        thematic_timeCollapse:true,//间隔选择折叠面板
        thematic_tucengswitch:true,//图层设置开关
        thematic_tucengCollapse:true,//图层设置折叠面板
        forecastModalshow:'美国',
        forecastelemetModal:[
          {label:'降水预报',value:'降水预报'},
          {label:'气温预报',value:'气温预报'},
          {label:'强对流预报',value:'强对流预报'}
        ],//要素选择
        forecastelemetModalshow:'降水预报',
        timeSelect:[
          {label:'逐小时',value:'逐小时'},
          {label:'6小时',value:'6小时'},
          {label:'12小时',value:'12小时'},
          {label:'24小时',value:'24小时'}
        ],
        timeSelectshow:'逐小时',
      }
    },
    methods:{
      thematic_modalswitchChange(status){
        var col_title = $("#thematic_modalSelect");
        if (status == true) {
          this.thematic_modalCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.thematic_modalCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//模式选择
      thematic_elementChange(status){
        var col_title = $("#thematic_elementSelect");
        if (status == true) {
          this.thematic_elementCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.thematic_elementCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//要素选择
      thematic_timeChange(status){
        var col_title = $("#thematic_timeSelect");
        if (status == true) {
          this.thematic_timeCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.thematic_timeCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//间隔选择
      thematic_tucengChange(status){
        var col_title = $("#thematic_tucengsetting");
        if (status == true) {
          this.thematic_tucengCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.thematic_tucengCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//图层设置
    },
    mounted(){
      this.$store.state.imagescolorIndex = 4;
    }
  }
</script>
<style>
  .thematic{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .thematic .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .thematic .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .thematic .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .thematic .analyzecolor{
    border-left:4px solid #00D062;
  }
  .thematic .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .thematic .managecolor{
    border-left:4px solid #6E63FF;
  }

  /*预报时间样式*/
  .thematic .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .thematic .sy-title-text{
    height:22px;
    line-height:22px;
    margin-top:11px;
  }
  .thematic .ivu-input-small{
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
    margin-top:10px;
  }
  .thematic .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .thematic .colselect_top{
    margin-top:10px;
  }
  .thematic .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .thematic .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*专题选择*/
  .thematic .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    /*margin-top:10px;*/
    color:#fff;
    border:none;
  }
  .thematic .ivu-select-arrow{
    color:#fff;
  }

  /*开关折叠样式*/
  .thematic .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .thematic .switch{
    margin-top:10px;
    float:right;
  }
  .thematic .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .thematic .sy-context{
    color:#fff;
    text-align: left;
    margin-bottom:10px;
  }
  .thematic .col_play{
    margin-bottom:10px;
    text-align: left;
  }
  .thematic .col_tuceng{
    margin-bottom:10px;
    width:19%;
  }

</style>
