<template>
  <div class="weatherradar">
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
      <!-- 来源渠道 -->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">来源渠道</i-col>
          <i-col span="6" v-for="(item,index) in basedata" :key="item.value" class="station">
            <Radio-group v-model="basedatashow" :value="item.value">
              <Radio :label="item.label" ></Radio>
            </Radio-group>
          </i-col>
        </Row>
      </li>

      <!--播放设置-->
      <li>
        <Row class="col_forecasetime pressurecolor" id="weather_playsetting">
          <i-col span="6" class="ground_text">播放设置</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="weather_playsettingswitch" @on-change="weather_playsettingswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse pressurecolor" type="flex" v-show="weather_playsettingCollapse">
            <i-col span="6" class="col_play ">
              <i class="fa fa-fast-backward"></i><p>上一帧</p>
            </i-col>
            <i-col span="6" class="col_play ">
              <i class="fa fa-fast-forward"></i><p>下一帧</p>
            </i-col>
            <i-col span="6" class="col_play ">
              <i class="fa fa-play"></i><p>播放</p>
            </i-col>
            <i-col span="6" class="col_play ">
              <i class="fa fa-stop"></i><p>暂停</p>
            </i-col>
        </Row>
      </li>

      <!--参数设置-->
      <li>
        <Row class="col_forecasetime analyzecolor" id="weather_paramsetting">
          <i-col span="6" class="ground_text">参数设置</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="weather_paramsswitch" @on-change="weather_paramsswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row  class="switch_collapse analyzecolor"  v-show="weather_paramsCollapse">
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
        <Row class="col_forecasetime managecolor" id="weather_colorsetting">
          <i-col span="6" class="ground_text">调色板</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="weather_colorsettingswitch" @on-change="weather_colorsettingswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse managecolor" type="flex" v-show="weather_colorsettingCollapse">
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
        basedata:[
          {label:'基本反射率',value:'基本反射率'},
          {label:'多普勒速度',value:'多普勒速度'},
        ],//基数据
        basedatashow:'基本反射率',//基数据单选框初始值
        weather_playsettingswitch:true,//播放设置开关
        weather_playsettingCollapse:true,//播放折叠面板
        weather_paramsswitch:true,//播放设置开关
        weather_paramsCollapse:true,//播放设置开关
        weather_colorsettingswitch:true,//调色板设置开关
        weather_colorsettingCollapse:true,//调色板折叠
        colornc:'#00ff00',
        colorhw:'#ff00ff',
        colorkjg:'#0f0f0f',
        colorsq:'#ffff00',
        colorld:'#0fffff',
        slidertransparent:0,
      }
    },
    methods:{
      weather_playsettingswitchChange(status){
        var col_title = $("#weather_playsetting");
        if (status == true) {
          this.weather_playsettingCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.weather_playsettingCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//播放设置开关点击方法
      weather_paramsswitchChange(status){
        var col_title = $("#weather_paramsetting");
        if (status == true) {
          this.weather_paramsCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.weather_paramsCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//参数设置开关点击方法
      weather_colorsettingswitchChange(status){
        var col_title = $("#weather_colorsetting");
        if (status == true) {
          this.weather_colorsettingCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.weather_colorsettingCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//调色板设置开关点击方法
    },
    mounted(){
      this.$store.state.imagescolorIndex = 1;
    }
  }
</script>
<style>
  .weatherradar{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .weatherradar .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .weatherradar .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .weatherradar .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .weatherradar .analyzecolor{
    border-left:4px solid #00D062;
  }
  .weatherradar .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .weatherradar .managecolor{
    border-left:4px solid #6E63FF;
  }

  /*预报时间样式*/
  .weatherradar .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .weatherradar .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .weatherradar .colselect_top{
    margin-top:10px;
  }
  .weatherradar .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .weatherradar .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*数据源*/
  .weatherradar .station{
    margin:12px 22px 0 12px;
  }

  /*投影方式*/
  .weatherradar .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    /*margin-top:10px;*/
    color:#fff;
    border:none;
  }
  .weatherradar .ivu-select-arrow{
    color:#fff;
  }
  .weatherradar .sy-context{
    text-align:left;
    margin-bottom:10px;
  }

  /*开关折叠样式*/
  .weatherradar .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .weatherradar .switch{
    margin-top:10px;
    float:right;
  }
  .weatherradar .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .weatherradar .col_play{
    margin-bottom:10px;
  }
  .weatherradar .ivu-slider-wrap{
     margin:8px 0;
   }




  /*要素显示样式*/
  .weatherradar .sy-title{
    height: 22px;
    line-height: 22px;
    text-align: center;
  }


  /*参数设置*/

  .weatherradar .ivu-input-small{
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
  }

  .weatherradar .ivu-color-picker{
    width:100%;
  }
  .weatherradar .ivu-color-picker-small .ivu-color-picker-color{
    width:100%;
  }
  .weatherradar .ivu-color-picker-color div{
    border-radius:10px;
  }
</style>
