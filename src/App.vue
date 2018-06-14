<template>
  <div id="app">
    <div id="app_con">
      <div class="logo_text">
        <router-link v-for="(item,index) in weatherList" :to="item.tolink">
            <div class="modalist" :class="{modalistActive: index == currentIndex}" @click="weathlistClick(index)">
            <!--<div :class="item.ondisable? 'modalistActive': 'modalist'"  @click="weathlistClick(index,item)">-->
              <div @mouseenter="enter" @mouseleave="leave" class="imghover">
                <img :src="item.icon" alt="地面实况" /><i style="height:26px;">{{item.text}}</i>
              </div>
            </div>
        </router-link>
      </div>
      <div id="map-data" style = "display:none"  class="unselectable"></div>
    </div>
    <!-- <transition name="slide-fade"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
  export default {
    data(){
      return{
        weatherList:[
          {tolink:'/components/Live_analysis',icon:'static/images/earth.png',text:'实况分析',ondisable:false},
          {tolink:'/components/Value_forecast',icon:'static/images/yubao.png',text:'数值预报',ondisable:false},
          {tolink:'/components/image',icon:'static/images/tuxiang.png',text:'图形图像',ondisable:false},
          {tolink:'/components/tropical_wind',icon:'static/images/qixuan.png',text:'热带气旋',ondisable:false},
          {tolink:'/components/His_weather',icon:'static/images/tianqi.png',text:'历史天气',ondisable:false},
          {tolink:'/components/Disaster_wea',icon:'static/images/zaihai.png',text:'灾害天气',ondisable:false},
          {tolink:'/components/Forecast_pro',icon:'static/images/chanpin.png',text:'预报产品',ondisable:false},
          {tolink:'/components/op_support',icon:'static/images/feiji.png',text:'作战保障',ondisable:false},
          {tolink:'/components/Climate_pro',icon:'static/images/qihou.png',text:'气候产品',ondisable:false},
        ],//项目子选项
        index:0,
        currentIndex:0,
      }
    },
    methods: {
      weathlistClick(index,item){
        this.currentIndex = index;
        if(index == 0){
            this.$store.state.Livedatashow = !this.$store.state.Livedatashow;
        }else if(index == 1){
            this.$store.state.Valuedatashow = !this.$store.state.Valuedatashow;
        }else if(index == 2){
            this.$store.state.imagedatashow = !this.$store.state.imagedatashow;
        }else if(index == 3){
            this.$store.state.Hisdatashow = !this.$store.state.Hisdatashow;
        }else if(index == 4){
            this.$store.state.Tropicaldatashow = !this.$store.state.Tropicaldatashow;
        }else if(index == 5){
            this.$store.state.Disaterdatashow = !this.$store.state.Disaterdatashow;
        }else if(index == 6){
            this.$store.state.Forecastdatashow = !this.$store.state.Forecastdatashow;
        }else if(index == 7){
            this.$store.state.opsupportdatashow = !this.$store.state.opsupportdatashow;
        }else if(index == 8){
            this.$store.state.Climatedatashow = !this.$store.state.Climatedatashow;
        }
      },
      header_show: function () {
        document.onmousemove = function () {
          var appcon = document.getElementById('app_con');
          var timesliderpicker = document.getElementById('timesliderpicker');
          if (event.clientY <= 30) {
            appcon.style.marginTop = 0;
            timesliderpicker.style.bottom = '6%';
          } else if (event.clientY >= 600) {
            appcon.style.marginTop = '-60px';
            timesliderpicker.style.bottom = 0;
          }
        }
      },
      enter: function(event){
        var el = event.currentTarget;
        $(el).find('i').animate(300).show();
      },
      leave: function(event){
        var el = event.currentTarget;
        $(el).find('i').animate(300).hide();
      }
    },
    mounted() {
//      this.header_show();
      this.weathlistClick(this.$store.state.weatherlistIndex);
    },
    watch: {

    }
  }

</script>

<style>
  /*时间轴样式*/
  #app .timesliderpicker{
    width:100%;
    height:auto;
    position: absolute;
    z-index: 99;
    bottom:0;
    left:0;
    transition: 1s;
  }

  /*时间插件字体设置*/
  .datePicker{
    font-size:12px;
    color:#333;
    width:35%;
    float:left;
    margin-left:30px;
    margin-top:10px;
  }
  .selecttime{
    width:35%;
    float:left;
    margin-left:14px;
    margin-top:10px;
  }

  /*清除浮动*/
  .clear{
    clear:both;
  }

  /*子界面tab未激活状态*/
  .modal{
    color:#fff;
  }

  /*子界面tab激活后的状态*/
  .modalActive{
    border-bottom:2px solid #1E88EF;
  }

  /*时间选择器样式*/
  .getlefttime{
    width:130px;
    color:#333;
    padding-right:10px;
    font-size:12px;
  }
  .getTime{
    width: 100%;
    color: #333;
    font-size: 12px;
  }
  .getTime .ivu-picker-panel-body {
    width:56px;
  }
  .ivu-time-picker-cells-list:nth-child(2),.ivu-time-picker-cells-list:nth-child(3) {
    display: none;
  }

  /*主界面样式*/
  .logo_text{
    margin-right:-1%;
  }
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 0;
    position: relative;
    overflow: hidden;
  }
  #app_con{
    background: #020305;
    box-shadow: 0 0 22px rgba(0,0,0,0.2), 0 0 22px rgba(0,0,0,0.2);
    transition: 0.8s;
    width: 60px;
    position: absolute;
    bottom: 0;
    top: 0;
    right:0;
    z-index: 100;
  }
  #app .app_con .fa{
    margin-right: 5px;
  }
  #app .modalist{
    display:inline-block;
    height: 50px;
    line-height: 50px;
    width: 50px;
    text-decoration: none;
    font-size: 15px;
    color: #fcfcfc;
    transition: 0.5s;
    border-radius:25px;
    margin-top:38%;
    position: relative;
    background:#111315;
  }
  #app .modalist img{
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-11px;
    margin-top:-11px;
  }
  #app .imghover{
    width:100%;height:100%;border-radius:25px;
  }
  #app .modalist:hover {
    box-shadow: 0px 0px 4px rgba(30, 136, 239, 0.5), 0px 0px 4px rgba(30, 136, 239, 0.5);
    background: #1E88EF;
    color: #fcfcfc;
    }
  #app .modalist i{
    font-style: normal;
    font-size:12px;
    color:#F1F1F1;
    position: absolute;
    right: 65px;
    top:25%;
    hight:26px;
    line-height:26px;
    border:1px solid #1E88EF;
    background-color: #020305;
    border-radius: 100px;
    padding-bottom: 4px;
    width:140px;
    text-align:center;
    /*opacity:0;*/
    display: none;
  }
  #app .modalistActive{
    background: #1E88EF;
    display:inline-block;
    height: 50px;
    line-height: 50px;
    width: 50px;
    text-decoration: none;
    font-size: 15px;
    color: #fcfcfc;
    transition: 0.5s;
    border-radius:25px;
    margin-top:38%;
    position: relative;
  }
  #app .modalistActive img{
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-11px;
    margin-top:-11px;
  }
  #app .modalistActive i{
    font-style: normal;
    font-size:12px;
    color:#F1F1F1;
    position: absolute;
    right: 65px;
    top:25%;
    hight:26px;
    line-height:26px;
    border:1px solid #1E88EF;
    background-color: #020305;
    border-radius: 100px;
    padding-bottom: 4px;
    width:140px;
    text-align:center;
    /*opacity:0;*/
    display: none;
  }
  #app .tab{
    box-shadow: 0px 0px 2px #1E88EF, 0px 0px 12px #1E88EF;
    border-left-color: #0A74DB;
    width: 380px;
    height: 100%;
    color: #333;
    background: #0D0F19;
    font-size: 0;
    opacity: .9;
    position: absolute;
    z-index: 99;
    top: 0;
    right:60px;
  }
  #app .tab::-webkit-scrollbar {
    display: none;
  }
  #app .demo_tablist{
    box-shadow: 0 12px 8px rgba(0,0,0,0.2);
    background:#161823;
  }
  #app .tab a{
    display: inline-block;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    background:#161823;
  }
  #app .tab a:hover{
    font-size: 14px;
    color: #fff;
    /*border-bottom:2px solid #1E88EF;*/
  }

  /*右侧面板显示隐藏设置*/
  #app .show_tab {
    position: absolute;
    bottom: 10%;
    right: 445px;
    height:50px;
    width: 40px;
    cursor: pointer;
    border-radius: 20px;
    border: none;
    background: #2d427e;
    opacity: .9;
    color: #f1f1f1;
    outline: none;
    transition: .8s;
      font-size: 16px;
      z-index: 9999;
    }
  #app .dis_tab {
      position: absolute;
    bottom: 10%;
    right: 1%;
    height:50px;
    width: 40px;
    cursor: pointer;
    border-radius: 20px;
    border: none;
    background: #2d427e;
    opacity: 0.8;
    color: #f1f1f1;
    outline: none;
    transition: .8s;
    font-size: 16px;
    z-index: 9999;
    }

  /*地图窗口样式设置*/
  #map_con {
      width: 100%;
      height: 100vh;
      text-align: initial;
    }

  /*导航条显示隐藏样式*/
  .slide-fade-enter-active {
      transition: all .6s linear;
    }
  .slide-fade-leave-active {
      transition: all .6s linear;
    }
  .slide-fade-enter,
  .slide-fade-leave-to {
      transform: translateX(400px);
      opacity: 0;
    }

  /* ****************************************/
  .router_con {
    min-width: 800px;
    position: relative;
  }
  .router_con img {
      width: 100%;
      height: 100vh;
    }
  .unselectable {
      -moz-user-select: -moz-none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
  #map-data { position:absolute; top:0; bottom:0; width:100%; }
</style>
