<template>
  <div class="satellitecloud">
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
      <!-- 预报范围 start -->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">范围选择</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small">
              <i-option v-for="(item,index) in imgareaSelect" :value="item.value" :key="index">{{ item.label }}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!--投影方式-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">投影方式</i-col>
          <i-col span="18" class="colselect_top">
            <i-select size="small">
              <i-option v-for="(item,index) in imgprojectiveMode" :value="item.value" :key="index">{{ item.label }}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!--来源渠道-->
      <li>
        <Row class="col_forecasetime elementcolor" id="sate_showsourceSelect">
          <i-col span="6" class="ground_text">来源渠道</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="datashowsourceswitch" @on-change="datashowsourceswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse elementcolor" type="flex" v-show="datashowsourceswitchCollapse">
          <i-col span="8" class="sy-context" v-for="(item,index) in sourcedataContent" :key="index">
            <Radio-group v-model="sourcedatashow">
              <Radio :label="item.label" ></Radio>
            </Radio-group>
          </i-col>
        </Row>
      </li>

      <!--云图播放设置-->
      <li>
        <Row class="col_forecasetime pressurecolor" id="sate_playsetting">
          <i-col span="6" class="ground_text">播放设置</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="sate_playsettingswitch" @on-change="sate_playsettingswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse pressurecolor" type="flex" v-show="sate_playsettingCollapse">
          <i-col span="4" class="col_play" v-for="(item,index) in cloudImagesplay">
            <div @click ="cloudImagesPlayClick(item,index)">
              <i :class="item.classIndex"></i><p :value="item.value" :key="item.value">{{item.label}}</p>
            </div>
          </i-col>
        </Row>
      </li>

      <!--参数设置-->
      <li>
        <Row class="col_forecasetime analyzecolor" id="sate_paramsetting">
          <i-col span="6" class="ground_text">参数设置</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="sate_paramsswitch" @on-change="sate_paramsswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row  class="switch_collapse analyzecolor"  v-show="sate_paramsCollapse">
          <Row class="col_play">
            <i-col span="4" class="sy-title">
              <i class="fa fa-clock-o"></i>
            </i-col>
            <i-col span="16">
              <i-input size="small" placeholder="输入"></i-input>
            </i-col>
            <i-col span="4" class="sy-title">
              分钟
            </i-col>
          </Row>

          <Row class="col_play">
            <i-col span="4" class="sy-title">
              <i class="fa fa-thermometer-empty"></i>
            </i-col>
            <i-col span="16">
              <i-input size="small" placeholder="输入"></i-input>
            </i-col>
            <i-col span="4" class="sy-title">
              mm
            </i-col>
          </Row>

          <Row class="col_play">
            <i-col span="4" class="sy-title">透明度</i-col>
            <i-col span="16">
              <Slider v-model="slidertransparent"></Slider>
            </i-col>
            <i-col span="4"  class="sy-title">
              100
            </i-col>
          </Row>
        </Row>
      </li>

      <!--调色板-->
      <li>
        <Row class="col_forecasetime managecolor" id="sate_colorsetting">
          <i-col span="6" class="ground_text">调色板</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="sate_colorsettingswitch" @on-change="sate_colorsettingswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse managecolor" type="flex" v-show="sate_colorsettingCollapse">
          <Tabs :animated="false" size="small" class="col_play">
            <TabPane label="NC">
              <ColorPicker size="small" v-model="colornc" />
            </TabPane>
            <TabPane label="红外">
              <ColorPicker size="small" v-model="colorhw" />
            </TabPane>
            <TabPane label="可见光">
              <ColorPicker size="small" v-model="colorkjg" />
            </TabPane>
            <TabPane label="水汽">
              <ColorPicker size="small" v-model="colorsq" />
            </TabPane>
            <TabPane label="雷达">
              <ColorPicker size="small" v-model="colorld" />
            </TabPane>
          </Tabs>
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
        imgprojectiveMode:[
          {label:'墨卡托投影1',value:'墨卡托投影1'},
          {label:'墨卡托投影2',value:'墨卡托投影2'},
          {label:'墨卡托投影3',value:'墨卡托投影3'},
          {label:'墨卡托投影4',value:'墨卡托投影4'},
        ],//投影方式
        imgareaSelect:[
          {label:'全国',value:'全国'},
          {label:'北京',value:'北京'},
          {label:'上海',value:'上海'},
          {label:'南京',value:'南京'},
        ],//范围选择
        datashowsourceswitch:true,//来源渠道开关
        datashowsourceswitchCollapse:true,//来源渠道折叠面板
        sourcedataContent:[
          {label:'FY2C/D/E',value:'FY2C/D/E'},
          {label:'FY3A/B',value:'FY3A/B'},
          {label:'葵花8',value:'葵花8'},
          {label:'MTSAT-2',value:'MTSAT-2'},
          {label:'NOAA-16/17/18',value:'NOAA-16/17/18'},
          {label:'TERRA',value:'TERRA'},
        ],//来源渠道
        sourcedatashow:'FY2C/D/E',//来源渠道单选框初始值
        colornc:'#00ff00',
        colorhw:'#ff00ff',
        colorkjg:'#0f0f0f',
        colorsq:'#ffff00',
        colorld:'#0fffff',
        slidertransparent:'0',
        sate_playsettingswitch:true,//播放设置开关
        sate_playsettingCollapse:true,//播放设置开关
        cloudImagesplay:[
          {label:'上一帧',value:'上一帧',classIndex:'fa fa-fast-backward'},
          {label:'下一帧',value:'下一帧',classIndex:'fa fa-fast-forward'},
          {label:'播放',value:'播放',classIndex:'fa fa-play'},
          {label:'暂停',value:'暂停',classIndex:'fa fa-stop'},
          {label:'清除',value:'清除',classIndex:'fa fa-trash-o'}
        ],
        sate_paramsswitch:true,//参数设置开关
        sate_paramsCollapse:true,//参数设置开关
        sate_colorsettingswitch:true,//参数设置开关
        sate_colorsettingCollapse:true,//参数设置开关
      }
    },
    methods:{
      cloudImagesPlayClick(item,index){
        this.command ={};
         switch(item.label){
           case "上一帧":
             alert("上一帧");
             break;
           case "下一帧":
             alert("下一帧");
             break;
           case "播放":
             this.command.imagePlay = "播放";
             break;
           case "暂停":
             alert("暂停");
             break;
           case "清除":
             this.command.clearImage = "清除";
             break;
         }
        this.$store.state.tropical = this.command;
      },
      datashowsourceswitchChange(status){
        var col_title = $("#sate_showsourceSelect");
        if (status == true) {
          this.datashowsourceswitchCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.datashowsourceswitchCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//来源渠道开关点击方法
      sate_playsettingswitchChange(status){
        var col_title = $("#sate_playsetting");
        if (status == true) {
          this.sate_playsettingCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.sate_playsettingCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//播放设置开关点击方法
      sate_paramsswitchChange(status){
        var col_title = $("#sate_paramsetting");
        if (status == true) {
          this.sate_paramsCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.sate_paramsCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//参数设置开关点击方法
      sate_colorsettingswitchChange(status){
        var col_title = $("#sate_colorsetting");
        if (status == true) {
          this.sate_colorsettingCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.sate_colorsettingCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//调色板开关点击方法
    },
    mounted(){
      this.$store.state.imagescolorIndex = 0;
    }
  }
</script>
<style>
  .satellitecloud{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .satellitecloud .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .satellitecloud .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .satellitecloud .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .satellitecloud .analyzecolor{
    border-left:4px solid #00D062;
  }
  .satellitecloud .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .satellitecloud .managecolor{
    border-left:4px solid #6E63FF;
  }

  /*预报时间样式*/
  .satellitecloud .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .satellitecloud .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .satellitecloud .colselect_top{
    margin-top:10px;
  }
  .satellitecloud .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .satellitecloud .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*数据源*/
  .satellitecloud .station{
    margin:12px 22px 0 12px;
  }

  /*投影方式*/
  .satellitecloud .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    /*margin-top:10px;*/
    color:#fff;
    border:none;
  }
  .satellitecloud .ivu-select-arrow{
    color:#fff;
  }
  .satellitecloud .sy-context{
    text-align:left;
    margin-bottom:10px;
  }

  /*开关折叠样式*/
  .satellitecloud .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .satellitecloud .switch{
    margin-top:10px;
    float:right;
  }
  .satellitecloud .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .satellitecloud .col_play{
    margin-bottom:10px;
  }
  .satellitecloud .ivu-slider-wrap{
    margin:8px 0;
  }



  /*要素显示样式*/
  .satellitecloud .sy-title{
    height: 22px;
    line-height: 22px;
    text-align: center;
  }


  /*参数设置*/

  .satellitecloud .ivu-input-small{
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
  }

  .satellitecloud .ivu-color-picker{
    width:100%;
  }
  .satellitecloud .ivu-color-picker-small .ivu-color-picker-color{
    width:100%;
  }
  .satellitecloud .ivu-color-picker-color div{
    border-radius:10px;
  }

</style>
