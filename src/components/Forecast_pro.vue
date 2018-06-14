<template>
  <div class="Forecast_router_con">
      <div id="map_con"></div>
      <transition name="slide-fade">
        <div class="tab" v-show="this.$store.state.Forecastdatashow" style="overflow-y:scroll">
          <router-view></router-view>
        </div>
      </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true,
      show: true
    }
  },
  methods:{

  },
  mounted () {
    this.$store.state.Forecastdatashow = true;
    this.$store.state.weatherlistIndex = 6;
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
      this.mapset.add(world)
    })
  }
}
</script>

<style>
  .Forecast_router_con .tab a{
    width: 20%;
  }
</style>
