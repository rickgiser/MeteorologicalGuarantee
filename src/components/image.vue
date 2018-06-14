<template>
  <div class="image_router_con">
      <div id="map_con"></div>
      <div class="timesliderpicker" id="timesliderpicker">
        <timeslider></timeslider>
      </div>
      <transition name="slide-fade">
        <div class="tab" v-show="this.$store.state.imagedatashow" style="overflow-y: scroll;overflow-x: hidden">
          <router-link :to="item.hrefurl" v-for="(item,index) in imagedataForecast" ><div class="modal" :class="{modalActive: index == currentIndex}" @click="isimageActive(index)">{{item.msg}}</div></router-link>
          <router-view></router-view>
        </div>
      </transition>
  </div>
</template>

<script>
  import timeslider from "@/components/Utils/vue-timelinepick"
  export default {
  data () {
    return {
      index:0,
      currentIndex:0,
      imagedataForecast:[
        {msg:"卫星云图",hrefurl:"/components/image_children/satellitecloud"},
        {msg:"天气雷达",hrefurl:"/components/image_children/weatherradar"},
        {msg:"闪电定位",hrefurl:"/components/image_children/lightning"},
        {msg:"传真图",hrefurl:"/components/image_children/facsimile"},
        {msg:"专题图",hrefurl:"/components/image_children/thematic"},
      ],//用于遍历实况面板模式类型
      imagespicker:''
    }
  },
  computed:{
    listenCommand(){
      return this.$store.state.tropical;
    }
  },
  watch:{
    listenCommand(){
        var tropicalCommand = this.$store.state.tropical;
        console.log(tropicalCommand)
        if(tropicalCommand.clearImage == "清除"){
          this.imagespicker.removeImages()
        }else if(tropicalCommand.imagePlay == "播放"){
          this.imagespicker.play();
        }
    }
  },
  methods:{
    isimageActive(index){
      this.currentIndex = index;
    },//tab样式切换
  },
  components:{
    timeslider
  },
  mounted () {
    var _this = this;
    this.$store.state.imagedatashow = true;
    this.$store.state.weatherlistIndex = 2;
    this.isimageActive(this.$store.state.imagescolorIndex);
    //改变地图风格
    var url = window.location.href.substr(0,window.location.href.indexOf(window.location.hash));
    url = url.substr(0,url.lastIndexOf("/"))+"/static/sprite1/Weather";
    //mapbox初始化地图部分
    this.mapset = this.loadMap.map(url);
    this.mapset.on('load',() => {
      var world = new PIE.MetoStyle.FillLayer({
        data: "static/data/worldPolyGon.geojson",
        color: "rgba(243, 236, 236, 1)",
        id: "world"
      });
      this.mapset.add(world);
      world.addEventListener("load",function () {
//        _this.imagespicker = new ImagePlay(_this.mapset);
//        _this.imagespicker.getImageDatas();
//        imgpicker = _this.imagespicker;
      })
    })
  }
}
</script>

<style>
  .image_router_con .tab a{
    width: 20%;
  }
</style>
