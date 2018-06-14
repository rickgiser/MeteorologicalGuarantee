<template>
  <div class="op_router_con">
    <div id="map_con"></div>
    <transition name="slide-fade">
      <div class="tab" v-show="this.$store.state.opsupportdatashow">
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
    },
    mounted() {
      this.$store.state.opsupportdatashow = true;
      this.$store.state.weatherlistIndex = 7;
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
  .op_router_con .tab a {
    width: 20%;
  }
</style>
