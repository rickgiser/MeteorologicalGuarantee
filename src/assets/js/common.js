exports.install = function (Vue, options) {
    Vue.prototype.loadMap = {
        map : function(sprite) {
          var id;
          console.log(sprite);
          if(!id){
            id = 'map_con';
          }
          var map = new PIE.Map({
            baseMap:""
          });
          var view = new PIE.MapView({
            map:map,
            container:id,
            zoom:3,
            center:[129, 39],
            sprite:sprite,
            glyphs:"static/fonts/fonts/{fontstack}/{range}.pbf",
            attributionControl: false
          });

        /*  var test  = new PIE.VectorTileLayer({
            url:"http://10.1.6.68:8887/styles/img.json",
            sprite:sprite,
          });
          map.add(test)*/
          //map.map.addControl(new mapboxgl.NavigationControl(), 'top-left').addControl(new mapboxgl.FullscreenControl(), 'top-left');
          return map;
        },
    }
    Vue.prototype.loadOlMap = {
      olMap:"",
      addMap:function(){
//    创建一个叠加层，将弹出式窗口定位到地图。

        proj4.defs('EPSG:2700', '+title=Beijing1954 +proj=lcc +towgs84=0.0000,0.0000,0.0000 +a=6378245.0000 +rf=298.3 +lat_ts=0.000 +lat_0=0.00000000 +lon_0=105.000000000 +lat_1=0.000000000 +lat_2=65.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs');

        //定义球形摩尔魏特投影
        var sphereMollweideProjection = new ol.proj.Projection({
          //编号
          code: 'EPSG:2700',
          //显示范围
          extent: [-90099540.605703328, -90099540.605703328, 90099540.605703328, 90099540.605703328],
          //世界经纬度范围
          worldExtent: [-179, -0, 179, 90]
        });

        var raster = new ol.layer.Tile({
          source:new ol.source.OSM()
        });
        var source = new ol.source.Vector({wrapX:false});

       return new ol.Map({
          //设置地图图层
          layers:[raster],
          // 让id为map的div作为地图的容器
          target:'map_con',

          // 设置显示地图的视图
          view:new ol.View({
            projection:sphereMollweideProjection,
            center:[0, 4600000],  // 定义地图显示中心
            zoom:7  //缩放层级
          }),
        });
      }
    }
};
