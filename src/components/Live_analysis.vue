<template>
  <div class="Live_router_con">
    <div class="router_con">
      <div class="tubiao_box" id="tubiao_box" v-show="this.$store.state.showelementbox"></div>
      <div id="map_con"></div>
      <transition name="slide-fade">
        <div class="tab" v-show="this.$store.state.Livedatashow" style="overflow-y: scroll;overflow-x: hidden;">
          <div class="demo_tablist">
            <router-link :to="item.hrefurl" v-for="(item,index) in dataForecast" ><div class="modal" :class="{modalActive: index == currentIndex}" @click="isgroundActive(index)">{{item.msg}}</div></router-link>
          </div>
          <router-view></router-view>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      world:'',
      olMap:'',//openLayer初始化底图
      mapset:'',//mapbox初始化底图
//      index:0,//模式样式初始值
      currentIndex:0,//模式选择后样式初始值
      dataForecast:[
        {msg:"地面分析",hrefurl:"/components/shikuang_children/groundanalyze"},
        {msg:"高空分析",hrefurl:"/components/shikuang_children/highairanalyze"},
        {msg:"jun内实况",hrefurl:"/components/shikuang_children/armyanalyze"},
        {msg:"单站分析",hrefurl:"/components/shikuang_children/stationanalyze"},

      ],//用于遍历实况面板模式类型
      zoom:1,
      url:"",
      layerId:"",
      analyzeStyle:{
        "WS":{
          color:"#9f621d",
          isShow:false,
          isSolid:true,
          width:3,
          hight:"",
          low:""
        },
        "SLP":{
          color:"#000",
          isShow:true,
          isSolid:true,
          width:1,
          hight:"H",
          low:"L"
        },
        "DP3":{
          color:"#00f",
          isShow:true,
          isSolid:false,
          width:1,
          hight:"+",
          low:"-"
        },
        "H":{
          color:"#00f",
          isShow:true,
          isSolid:true,
          width:1,
          hight:"H",
          low:"L"
        },
        "TD":{
          color:"#f00",
          isShow:true,
          isSolid:true,
          width:1,
          hight:"W",
          low:"C"
        }
      }
    }
  },
  methods:{
    isgroundActive(index){
      console.log("isgroundActive",index);
        this.currentIndex = index;
    },
    getDataValue(url) {
        return new Promise( (resolve,reject) =>{
          const xhr = new XMLHttpRequest();
          //xhr.open("GET","http://"+url, true);
          xhr.open("Post",url, true);
          xhr.onload = () => {
            if (xhr.status == 200 ) {
              var result = JSON.parse(xhr.response)
              if (result.length === 0) {
                console.log('数据读取失败');
                reject('数据读取失败');
                return false;
              }
              resolve(result);
            } else {
              reject(xhr.statusText);
            }

          };
          xhr.onerror = function () {
            reject(xhr.statusText);
          };
          xhr.send(null);
        })
    },
    getDatas: function (olmap) {
      getXML();
      myAsyncFunctionGet('static/0.000').then(function(text) {

        console.log(text);
        if ( text.indexOf( '\r\n' ) !== - 1 ) {

          // This is faster than String.split with regex that splits on both
          text = text.replace( /\r\n/g, '\n' );

        }

        if ( text.indexOf( '\\\n' ) !== - 1 ) {

          // join lines separated by a line continuation character (\)
          text = text.replace( /\\\n/g, '' );

        }

        var lines = text.split( '\n' );

        //console.log(lines[0]);
        var line = "",lineFirstChar ="";

        var points =[];

        var datas = "";//line.split( /\s+/ );

        for(var i =0 ;i<lines.length;i++)
        {
          line = lines[i];

          lineFirstChar = line.charAt( 0 );
          if(lineFirstChar =="d")
          {
            console.log(lineFirstChar);
          }
          else if(lineFirstChar == " ")
          {
            console.log(lineFirstChar);
          }
          else
          {
            datas = line.split( /\s+/ );
            //console.log(datas);
            var point = addPointol(datas)

            if(point)
            {
              points.push(point);
            }
          }


        }


        var vectorSource = new ol.source.Vector({
          features: points,
          strategy: ol.loadingstrategy.bbox
        });

        var vectorLayer = new ol.layer.Vector({
          source: vectorSource
        });
        olmap.addLayer(vectorLayer)
      })
    },
    getStation:function(ps,url){
      console.log("getStation",this.zoom,parseInt(this.mapset.getZoom()));
      if(this.zoom != parseInt(this.mapset.getZoom())){
        console.log("self.mapset.getZoom() = "+this.mapset.getZoom())
        var _this = this;
        // 请求
        $.ajax({
          async : false,
          type : "POST",
          dataType : "json",
          callBackData : ps,
          data : ps,
          url : DatapostUrl+url,
          success : function(rs) {
            if (!rs || rs.length == 0) {
              return;
            }
            _this.addStation(rs);
           // _this.addUpLive(rs);
          },
        })
      }
      this.zoom = parseInt(this.mapset.getZoom()) ;
    },
    addUpLive:function (rs,id) {
      var dsp =  this.mapset.map;
      // 获取数据类型
      var groundLive_liveInfoId = id;
      // 刷新数据源
      if (this.mapset.map.getSource(groundLive_liveInfoId)) {
        this.mapset.map.getSource(groundLive_liveInfoId).setData({
          "type" : "FeatureCollection",
          "features" : rs
        });
      }
      else {
        this.mapset.map.addSource(groundLive_liveInfoId, {
          type : "geojson",
          data : {
            "type" : "FeatureCollection",
            "features" : rs
          }
        });
        if (rs && rs.length > 0) {
          var layerIdObj = {};
          // 开始添加图层
          var value = rs[0];
          var ps = value.properties;
          console.log(ps);
          for ( var key in ps) {
            // if (layerIdObj.hasOwnProperty(key)) {
            if (key == "WS") {
              // 风速--添加风图层
              dsp.addLayer({
                "id": groundLive_liveInfoId + "_" + key,
                "type": "symbol",
                "source": groundLive_liveInfoId,
                "layout": {
                  "icon-image": "WIND{" + key + "}",
                  "icon-allow-overlap": true,
                  "icon-rotate": {
                    "type": "identity",
                    "default": 30,
                    "property": "WD"
                  },
                  "icon-offset": [1, -1],
                  "icon-anchor": "bottom",
                  "icon-size": 1
                }
              });
            }
            else if (key == "T") {
              // 气温——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "paint":{
                  "text-color":"#ff0000"
                },
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ -1.5, -1 ],
                  "text-size" : 16

                }
              });
            }
            else if (key == "TD") {
              // 温度露点差——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "paint":{
                  "text-color":"#64955f"
                },
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ -1.5, 2.4 ],
                  "text-size" : 16
                }
              });
            }
            else if (key == "H") {
              // 位势高度——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ 1.3, -1 ],
                  "text-size" : 16
                }
              });
            }
          }
      }

      }
      },
    addStation:function(rs,id){
      console.log(rs);
      var dsp =  this.mapset.map;
      // 获取数据类型
      var groundLive_liveInfoId = id;
      // 刷新数据源
      if (this.mapset.map.getSource(groundLive_liveInfoId)) {
        this.mapset.map.getSource(groundLive_liveInfoId).setData({
          "type" : "FeatureCollection",
          "features" : rs
        });
      }
      else {
        console.log("addStation");
        // 定义数据源
        this.mapset.map.addSource(groundLive_liveInfoId, {
          type : "geojson",
          data : {
            "type" : "FeatureCollection",
            "features" : rs
          }
        });
        if (rs && rs.length > 0) {
          var layerIdObj = {};
          // 开始添加图层
          var value = rs[0];
          var ps = value.properties;
          console.log(ps);
          for ( var key in ps) {
            // if (layerIdObj.hasOwnProperty(key)) {
            if (key == "WS") {
              // 风速--添加风图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "icon-image" : "WIND{" + key + "}",
                  "icon-allow-overlap" : true,
                  "icon-rotate" : {
                    "type" : "identity",
                    "default" : 30,
                    "property" : "WD"
                  },
                  "icon-offset" : [ 1, -1 ],
                  "icon-anchor" : "bottom",
                  "icon-size" : 1
                }
              });
            }
            else if (key == "WW") {
              // 现在天气现象--添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "icon-image" : "WW{" + key + "}",
                  "icon-offset" : [ -32, 0 ],
                  "icon-allow-overlap" : true,
                  "icon-size" : 0.6
                }
              });
            }
            else if (key == "W1") {
              // 过去天气现象——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "icon-image" : "OW{" + key + "}",
                  "icon-offset" : [ 40, 28 ],
                  "icon-allow-overlap" : true,
                  "icon-size" : 0.6
                }
              });
            }
            else if (key == "N") {
              // 总云量——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "icon-image" : "N{" + key + "}",
                  "icon-allow-overlap" : true,
                  "icon-size" : 0.42
                }
              });
            }
            else if (key == "CH") {
              // 高云状——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "icon-image" : "CH{" + key + "}",
                  "icon-allow-overlap" : true,
                  "icon-offset" : [ 0, -2 ],
                  "icon-size" : 0.42
                }
              });

            }
            else if (key == "CM") {
              // 中云状——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "icon-image" : "CM{" + key + "}",
                  "icon-allow-overlap" : true,
                  "icon-offset" : [ 0, -40 ],
                  "icon-size" : 0.5
                }
              });

            }
            else if (key == "CL") {
              // 低云状——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "icon-image" : "CL{" + key + "}",
                  "icon-allow-overlap" : true,
                  "icon-offset" : [ -0.1, 40 ],
                  "icon-size" : 0.42
                }
              });
            }
            else if (key == "T") {
              // 气温——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "paint":{
                  "text-color":"#ff0000"
                },
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ -1.5, -1 ],
                  "text-size" : 16

                }
              });
            }
            else if (key == "VIS") {
              // 能见度——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ -1.3, 1.3 ],
                  "text-size" : 16
                }
              });
            }
            else if (key == "NH") {
              // 低云量——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ 0.6, 1.2 ],
                  "text-size" : 16
                }
              });
            }
            else if (key == "LH") {
              // 低云高——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ 0.4, 2.4 ],
                  "text-size" : 16
                }
              });
            }
            else if (key == "SLP") {
              // 海平面气压——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "paint":{
                  "text-color":"#0000fd"
                },
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ 1.8, -1.2 ],
                  "text-size" : 14
                }
              });
            }
            else if (key == "DP3") {
              // 3h气压变量——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ 1.7, 0.2 ],
                  "text-size" : 16
                }
              });
            }
            else if (key == "TD") {
              // 温度露点差——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "paint":{
                  "text-color":"#64955f"
                },
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ -1.5, 2.4 ],
                  "text-size" : 16
                }
              });
            }
            else if (key == "RR") {
              // 6小时降水——添加图层
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ 1.7, 2.4 ],
                  "text-size" : 16
                }
              });
            }
          /*  else if (key == "VVIS") {
              // 垂直能见度
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ -1.3, 1.3 ],
                  "text-size" : 16
                }
              });
            }*/
           /* else if (key == "HVIS") {
              // 水平能见度
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ 0.1, 1.3 ],
                  "text-size" : 16
                }
              });
            }*/
            /*else if (key == "VD") {
              // 道路视程
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ 1.4, 1.3 ],
                  "text-size" : 16
                }
              });
            }*/
           /* else if (key == "WQ") {
              // 风切变
              dsp.addLayer({
                "id" : groundLive_liveInfoId +"_"+ key,
                "type" : "symbol",
                "source" : groundLive_liveInfoId,
                "layout" : {
                  "text-field" : "{" + key + "}",
                  "text-font" : [ "Open Sans Bold" ],
                  "text-allow-overlap" : true,
                  "text-offset" : [ 1.4, 0 ],
                  "text-size" : 16
                }
              });
            }*/
            //  }
          }

          //singleStationObs(groundLive_liveInfoId);

          //设置显示隐藏
          // addGroundLiveTiantu(groundLive_liveInfoId)
        }
      }

    },
    showLayer:function (id,type) {
      if(type=="RR"){
        if(this.mapset.getLayer(id)){
          this.mapset.getLayer(id).setVisible(true)
        }
      }
      else{
        showAnalyzeLayer(this.mapset,id)
      }

    },
    hideLayer:function (id,type) {
      if(type=="RR"){
        if(this.mapset.getLayer(id)){
          this.mapset.getLayer(id).setVisible(false)
        }
      }
      else{
        hideAnalyzeLayer(this.mapset,id)
      }
    },
    addLayer:function (url,id,type) {
      var _this =this;
      this.url =url;
      this.layerId = id;
      this.stationType = type;
      if( _this.world.layer){
        _this.addStationLayer();
      }else{
        _this.world.addEventListener("load",function () {
          _this.addStationLayer();
        })
      }
      this.mapset.on("zoomend",this.addStationLayer);

    },
    removeLayer:function (id,type) {

    },
    addAnalyzeLayer:function (url,id,type) {
      if(type=="RR"){
        this.addImageLayer(url,id,type);
      }else{
        this.addGeoJsonLayer(url,id,type);
      }

    },
    addImageLayer(url,id,type){
      addImage(this.mapset,id,url);
    },
    addGeoJsonLayer(url,id,type){
      var _this = this;
      var dataStyle = this.analyzeStyle[type];
      console.log(url);
      console.log(dataStyle);
      this.getAnalyzeData(url).then(function (data) {
        addStationDataValue(data,_this.mapset,id,dataStyle.color,dataStyle.isShow,dataStyle.isSolid,dataStyle.width,dataStyle.hight,dataStyle.low)
      });
    },
    getAnalyzeData:function (url) {
      return new Promise( (resolve,reject) =>{
        const xhr = new XMLHttpRequest();
        //xhr.open("GET","http://"+url, true);
        xhr.open("GET",url, true);
        xhr.onload = () => {
          if (xhr.status == 200 ) {
            var result = JSON.parse(xhr.response)
            if (result.length === 0) {
              console.log('数据读取失败');
              reject('数据读取失败');
              return false;
            }
            resolve(result);
          } else {
            reject(xhr.statusText);
          }

        };
        xhr.onerror = function () {
          reject(xhr.statusText);
        };
        xhr.send(null);
      })
    },

    addStationLayer(){
      var _this = this;

      if(_this.zoom!=parseInt(_this.mapset.getZoom())){
        console.log("addLayer",this.url,_this.layerId);
        _this.getDataValue(this.url+parseInt(_this.mapset.getZoom())).then(function (data) {
          console.log(data);
          if(_this.stationType == "upper"){
            _this.addUpLive(data,_this.layerId);
          }else {
            _this.addStation(data,_this.layerId);
          }
        });
        _this.zoom =parseInt(_this.mapset.getZoom());
      }
    }
  },
  computed: {
    listenMapControl(){
      return this.$store.state.liveAnalysisStatus;
    },
    listenLivetab(){
      return this.$store.state.Livedatashow;
    }
  },
  watch: {
    listenMapControl(){
      var liveAnalysis = this.$store.state.liveAnalysisStatus;
      if(liveAnalysis){
        var dataValue = this.$store.state.liveAnalysisDataValue;
        for(var item in dataValue){
          if(item == "show"){
            for(var i =0 ;i<dataValue[item].length;i++){
              this.showLayer(dataValue[item][i].id);
            }
          }else if(item == "hide"){
            for(var i =0 ;i<dataValue[item].length;i++){
              this.hideLayer(dataValue[item][i].id);
            }
          }else if(item == "add"){
            for(var i =0 ;i<dataValue[item].length;i++){
              this.addLayer(dataValue[item][i].url,dataValue[item][i].id,dataValue[item][i].type);
            }
          }else if(item == "addAnalyze"){
            for(var i =0 ;i<dataValue[item].length;i++){
              this.addAnalyzeLayer(dataValue[item][i].url,dataValue[item][i].id,dataValue[item][i].type);
            }
          }else if(item == "remove"){
            for(var i = 0;i<dataValue[item].length;i++){
              this.removeLayer(id,type);
            }
          }
        }
        this.$store.state.liveAnalysisStatus = false;
      }
      else{

      }
    },
    listenLivetab(){
        if(this.$store.state.Livedatashow == false){
           $("#tubiao_box").css("width","95%");
        }else if(this.$store.state.Livedatashow == true){
          $("#tubiao_box").width();
          let oboxchangesmall = $("#tubiao_box").width() - 380;
          $("#tubiao_box").css("width",oboxchangesmall);
        }
    },//监听当tab页隐藏的时候改变弹出框的宽度
  },
  mounted () {
    this.$store.state.Livedatashow = true;
    this.$store.state.weatherlistIndex = 0;
    this.isgroundActive(this.$store.state.groundcolorIndex);
    console.log("init",this.$store.state.groundcolorIndex);
    var url = window.location.href.substr(0,window.location.href.indexOf(window.location.hash));
    url = url.substr(0,url.lastIndexOf("/"))+"/static/sprite1/Weather";
    //mapbox初始化地图部分
    this.mapset = this.loadMap.map(url);
    var _this = this;
    _this.world = new PIE.MetoStyle.FillLayer({data:"static/data/worldPolyGon.geojson",color:"rgba(243, 236, 236, 1)",id:"world"});
    this.mapset.add(_this.world);
    this.mapset.on('load',() => {
      _this.world.addEventListener('load',function () {
        //var worldLine = new PIE.MetoStyle.LineLayer({data:"static/data/countries-110m.geojson",color:"rgba(50, 50, 50, 1)",id:"worldLine"});
        //_this.mapset.add(worldLine);
       //高空
       /* var url1 ="http://127.0.0.1:8060/PIE-Web/upperLive/getUpperLiveDataCoutour?params=date:20140308,type:upperInfo_upper,span:0800,level:850,element:H";

        getData(url1).then(function (data) {
          addStationDataValue(data,_this.mapset,"PPP","#000",true,true,1,"H","L");
        });*/
      });
    });

    //openLayer初始化地图部分
    /*this.olMap =  this.loadOlMap.addMap()
    this.getDatas(this.olMap)*/

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .Live_router_con .tab a{
    width: 25%;
  }
  .Live_router_con .tubiao_box{
    position: absolute;
    left:13px;
    bottom: 37px;
    z-index: 99;
    height: 300px;
    opacity: .8;
    float: right;
    border:4px solid #BDF42C;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.16000000000000003);
    background-color: rgba(0,0,0,0.8);
    font-size: 16px;
    color: #fff;
    line-height: 40px;
    border-radius: 22px;
    transition: 1s;
  }
</style>
