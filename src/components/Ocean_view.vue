<template>
  <div class="Ocean_router_con">
    <div class="nav_menu" :class="isShow?'show_btn':'dis_btn'"></div>
    <div id="map_con" class="cc"></div>
    <span class="time">{{time}}</span>
    <transition name="slide-fade">
      <div class="tab" v-show="isShow" style="overflow-y: scroll;overflow-x: hidden;">
        <div name="slide-fade" class="slide-fade">
          <router-view></router-view>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  var i = 0;
  export default {
    data() {
      return {
        layerId:'',//图层ID
        pre_val: {},
        time: '2017年12月8日',
        map_id: 'con',
        fileType:'',//判断文件类型
        colormap:{
          "sp":"#000000",
          "sst":"#ff0000",
          "gh":"#0000ff",
          "u10":"#ff0000",
          "t":"#FF00FF"
        },
        index:0,
        currentIndex:0,
        elementType:'',
      }
    },
    methods: {
      isActive:function(item,index){//模式选择颜色切换
        this.currentIndex = index;
      },
      pre_ajax: function () { //获取未来小时
        this.$ajax({
          method: 'get',
          url: this.$store.state.apiUrl.pre_url
        }).then(respones => {
          console.log(respones)
          this.pre_val = respones.data.data.TypeName;
        })
      },
//      get_time: function () { //获取当前年月日
//        var t = new Date();
////        this.time = t.getFullYear() + '年' + (t.getMonth() + 1) + '月' + t.getDate() + '日';
//      },
      up() { //前一时次
        var $obj = $('.pre_val');
        var len = $obj.length;
        i--;
        if (i == -1) {
          i = len - 1;
        }
        $obj.eq(i).css('background', '#062270');
        $obj.eq(i).siblings().css('background', '#2d427e');
      },
      down() { //后一时次
        var $obj = $('.pre_val');
        var len = $obj.length;
        i++;
        if (i == len) {
          i = 0;
        }
        $obj.eq(i).css("background", "#062270");
        $obj.eq(i).siblings().css('background', '#2d427e');
      },
      changeMap_id(e) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
          'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        var id = Math.ceil(Math.random() * 35);
        this.map_id += chars[id] + e;
      }
    },
    mounted(){
      this.pre_ajax();
      this.protobuffer = new PieParseProtoBuffer();
      this.mapset = this.loadMap.map();
      console.log(this.mapset)
      //改变地图风格,添加风向杆图
      this.mapset.on('load',() => {
        var url = window.location.href.substr(0,window.location.href.indexOf(window.location.hash));
        url = url.substr(0,url.lastIndexOf("/"))+"/static/sprite/sprite";
        var windPoleStyle = this.mapset.map.getStyle();
        windPoleStyle.sprite = url;
        this.mapset.map.setStyle(windPoleStyle);
      });
    },
    computed: {
      //监听综合分析中是否渲染数据源
      listenGraphType (){
        return this.$store.state.chufa
      },
      //监听综合分析中图层管理中是否移除数据源
      listenshow() {
        return this.$store.state.show;
      },
    },
    watch: {
      listenGraphType(){
        this.fileType = this.$store.state.graphType;
        this.elementType = this.$store.state.elementType;
        this.showExchange = this.$store.state.showExchange;
        this.level = this.$store.state.level;
        this.layerId = this.$store.state.layerId;
        console.log(this.layerId)
        if(this.$store.state.chufa){
          if(this.mapset.findLayerById(this.layerId))
          {
            var layer = this.mapset.findLayerById(this.layerId);
            layer.setVisible(true);

            if(this.mapset.findLayerById(this.layerId + "title"))
            {
              var layer1 = this.mapset.findLayerById(this.layerId + "title");
              layer1.setVisible(true);
            }
          }
          else
          {
            let pbdata;
            if(this.fileType == 'png'){
              let coordinates = [
                [73.31, 53.08000000000000],
                [133.0700000000001, 53.08000000000000],
                [133.0700000000001, 18.0000000000000],
                [73.31, 18.0000000000000]
              ];
              let RasterLayer = new PIE.MetoStyle.RasterLayer({url:this.$store.state.geoJsonUrl,id:this.elementType + this.level + this.showExchange,coordinates:coordinates});
              this.mapset.add(RasterLayer);
            }
            else{
              pbdata = this.protobuffer.requestData(this.$store.state.geoJsonUrl, this.fileType)
              pbdata.then(data => {
                var geojson = getGeoJsonData(data);
                //添加等值线/流线图层
                if(this.fileType + this.elementType == "isoline" + this.elementType || this.fileType == "wsl")
                {
                  let LineLayer = new PIE.MetoStyle.LineLayer({data:geojson.line,id:this.elementType + this.level + this.showExchange,color:this.colormap[this.elementType]});
                  this.mapset.add(LineLayer);

                  if(geojson.point.features == ""){
                    var datatest = {
                      "type": "FeatureCollection",
                      "features": [ ]
                    }

                    for(var i=0;i<geojson.line.features.length;i++)
                    {
                      var datat ={
                        "type": "Feature",
                        "geometry": {
                          "type": "Point",
                          "coordinates": ""
                        },
                        "properties": {
                          "colorIndex": "",
                          "valueColor":"#222222"
                        }
                      };

                      var lonlat = geojson.line.features[i].geometry.coordinates[0];
                      datat.geometry.coordinates = lonlat;
                      if(this.elementType == "sp"){
                        datat.properties.colorIndex = geojson.line.features[i].properties.colorIndex/100;
                      }else{
                        datat.properties.colorIndex = geojson.line.features[i].properties.colorIndex;
                      }
                      datatest.features.push(datat);
                    };
                    let TestLayer = new PIE.MetoStyle.PointLayer({data:datatest,id:this.elementType + this.level + this.showExchange + "title"});
                    this.mapset.add(TestLayer);
                  }else{
                    let TestLayer = new PIE.MetoStyle.PointLayer({data:geojson.point,id:this.elementType + this.level + this.showExchange + "title"});
                    this.mapset.add(TestLayer);
                  }
                }
                //添加等值面图层
                if(this.fileType + this.elementType == "isosurfacevector" + this.elementType)
                {
                  var arrColor = [
                    "#020C64",
                    "#071E78",
                    "#11318B",
                    "#2657B3",
                    "#306AC7",
                    "#3B7EDB",
                    "#6196E0",
                    "#74A3E2",
                    "#87AFE5",
                    "#9AC4DC",
                    "#98D6C4",
                    "#D7DE7E",
                    "#F4D963",
                    "#F7B42D",
                    "#F29B00",
                    "#F19303",
                    "#EF7511",
                    "#EE6618",
                    "#EE581F",
                    "#E03F16",
                    "#D0240E",
                    "#C20003",
                    "#B50109",
                    "#A90210",
                    "#8A0519",
                    "#6F0015"
                  ];
                  var colorMap ={}
                  for(var i=-50,j =0;i<=50;i+=4,j++){
                    colorMap[i]=colorMap[i+1]=colorMap[i+2]=colorMap[i+3]=arrColor[j];
                  }
                  let FillLayer = new PIE.MetoStyle.FillLayer({data:geojson,id:this.elementType + this.level + this.showExchange,color:this.colormap[this.elementType],colorPath:colorMap});
                  this.mapset.add(FillLayer);
                }
                //添加风向杆
                if(this.fileType == "wws")
                {
                  //添加风向杆图层
                  let IconLayer = new PIE.MetoStyle.IconLayer({data:geojson,id:this.elementType + this.level + this.showExchange});
                  this.mapset.add(IconLayer);
                }
              });
            }
          }
          this.$store.state.chufa = false;
        }else{

        }

      },
      listenshow(){
        if(this.$store.state.show){

        }else{
          var layerId = this.$store.state.layerId;
          if(this.mapset.findLayerById(layerId))
          {
            var layer = this.mapset.findLayerById(layerId);
            layer.setVisible(false);
            if(this.mapset.findLayerById(layerId + "title"))
            {
              var layer1 = this.mapset.findLayerById(layerId + "title");
              layer1.setVisible(false);
            }
          }
          this.$store.state.show = true;
        }
      },
    }
  }

</script>

<style>

  .current {
    background: #062270;
  }
  .Ocean_router_con .tab a {
    width: 20%;
  }
  .slide-fade{
    padding-top:10px;
  }

  .nav_menu {
    position: absolute;
    right: 1%;
    width: 40px;
    top: 3%;
    border-radius: 20px;
    z-index: 9;

  }
  .pressure li {
    display: inline-block;
    width: 40px;
    line-height: 25px;
    font-size: 12px;
  }

  .nav_menu .pressure:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .time {
    position: absolute;
    left: 50px;
    top: 20px;
    z-index: 99;
    width: 10%;
    height: 40px;
    opacity: .8;
    float: right;
    background: #2d427e;
    font-size: 16px;
    color: #fff;
    line-height: 40px;
    border-radius: 15px;
  }

</style>
