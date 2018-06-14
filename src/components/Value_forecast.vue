<template>
  <div class="Value_router_con">
    <!--<div class="nav_menu" :class="isShow?'show_btn':'dis_btn'">-->
      <!--<div class="btn">-->
        <!--<button class="nav_menu_btn">-->
          <!--<Icon type="waterdrop"></Icon>-->
        <!--</button>-->
        <!--<button class="nav_menu_btn">-->
          <!--<Icon type="cloud"></Icon>-->
        <!--</button>-->
        <!--<button class="nav_menu_btn">-->
          <!--<Icon type="ios-bolt"></Icon>-->
        <!--</button>-->
        <!--<button class="nav_menu_btn">-->
          <!--<Icon type="ios-snowy"></Icon>-->
        <!--</button>-->
        <!--<button class="nav_menu_btn">-->
          <!--<Icon type="shuffle"></Icon>-->
        <!--</button>-->
        <!--<button class="nav_menu_btn">-->
          <!--<Icon type="ios-rainy"></Icon>-->
        <!--</button>-->
        <!--<button class="nav_menu_btn">-->
          <!--<Icon type="ios-sunny-outline"></Icon>-->
        <!--</button>-->
        <!--<button class="nav_menu_btn">-->
          <!--<Icon type="social-pinterest-outline"></Icon>-->
        <!--</button>-->
      <!--</div>-->
      <!--<ol class="pressure">-->
        <!--<li>200</li>-->
        <!--<li>500</li>-->
        <!--<li>700</li>-->
        <!--<li>650</li>-->
        <!--<li>海平面</li>-->
      <!--</ol>-->
    <!--</div>-->

    <!--<ul class="Pre_val" :class="isShow?'show':'dis'" id="box">-->
      <!--<li v-for="(item,index) in pre_val" v-bind="item" :key="index" class="pre_val">-->
        <!--{{item.Name}}-->
      <!--</li>-->
      <!--<li>-->
        <!--<i class="fa fa-angle-double-up fa-2x" @click='up'></i>-->
      <!--</li>-->
      <!--<li>-->
        <!--<i class="fa fa-angle-double-down fa-2x" @click='down'></i>-->
      <!--</li>-->
    <!--</ul>-->
    <!-- nav_menu end -->
    <div id="map_con" class="cc"></div>
    <span class="time" v-model="time">{{time}}</span>
    <transition name="slide-fade">
      <div class="tab" v-show="this.$store.state.Valuedatashow" style="overflow-y: scroll;overflow-x: hidden;">
        <router-link :to="item.hrefurl" v-for="(item,index) in dataForecast"><div class="modal" :class="{modalActive: index == currentIndex}" @click="isActive(index)">{{item.msg}}</div></router-link>
        <div name="slide-fade">
          <router-view></router-view>
        </div>
      </div>
    </transition>
    <div class="tuli" v-show="legendShow">
      <div class="tuli_top">
        图例<hr/>
        温度(K)
      </div>
      <div class="tuli_left">
        <p class="tuli_color" v-for="item in this.legend"></p>
      </div>
      <div class="tuli_right">
        <div class="tuli_text" v-for="item in this.legend">{{item.startdata}} - {{item.enddata}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  var i = 0;
  let echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/line');

  export default {
    data() {
      return {
        layerId:'',//图层id
        pre_val: {},
//        time: '2017年12月8日',
        time: '',
        maptest: '',//地图id
        map_id: 'con',//地图id切换
        typeofvalue:'',//用于判断数据类型
        isLayer: false,//用于判断是否删除图层
        fileType:'',//判断文件类型
        dataForecast:[
          {msg:"综合分析",hrefurl:"/components/Value_children/Synthesis"},
          {msg:"单站分析",hrefurl:"/components/Value_children/alone"},
          {msg:"多模式",hrefurl:"/components/Value_children/Multi-mode"},
          {msg:"集合预报",hrefurl:"/components/Value_children/Pro_display"},
          {msg:"模式检验",hrefurl:"/components/Value_children/Pattern_test"},
        ],//用于遍历模式类型
        colormap:{
          "sp":"#000000",
          "sst":"#ff0000",
          "gh":"#0000ff",
          "u10":"#ff0000",
          "t":"#FF00FF",
          "temp":"#ff0000",
          "pressure":"#0000ff",
        },//颜色数组
        index:0,//要素未点击前的状态
        currentIndex:0,//要素点击以后的状态
        elementType:'',//要素类型
        lineid:'',//等直面id
        fillid:'',//等值线id
        wslid:'',//流线id
        wwsid:'',//风向杆id
        LineLayer:'',//添加等值线数据
        FillLayer:'',//添加等直面数据
        TestLayer:'',//文本图层
        saveLayerdata:[],//保存已有图层的信息
        wwsLayId:'',//栅格风向杆id
        wwsdatapost:'',//风向杆数据地址
        legend:[
//          {colorIndex:"rgb(38,77,255)",startdata:"200",enddata:"210"},
//          {colorIndex:"rgb(41,10,216)",startdata:"210",enddata:"220"},
          {colorIndex:"rgb(38,77,255)",startdata:"220",enddata:"230"},
          {colorIndex:"rgb(63,160,255)",startdata:"230",enddata:"240"},
          {colorIndex:"rgb(114,217,255)",startdata:"240",enddata:"250"},
          {colorIndex:"rgb(170,247,255)",startdata:"250",enddata:"260"},
          {colorIndex:"rgb(255,255,191)",startdata:"260",enddata:"270"},
          {colorIndex:"rgb(224,255,255)",startdata:"270",enddata:"280"},
          {colorIndex:"rgb(255,224,153)",startdata:"280",enddata:"290"},
          {colorIndex:"rgb(255,173,114)",startdata:"290",enddata:"300"},
          {colorIndex:"rgb(247,109,94)",startdata:"300",enddata:"310"},
          {colorIndex:"rgb(216,38,50)",startdata:"310",enddata:"320"},
        ],//图例数组
        legendShow:false,
        marker:"",
        oldlng:0,
        oldlat:0,
        timenum:0,
        timeValue:false,
        popup:"",
      }
    },
    methods: {
      isActive:function(index){//模式选择颜色切换
        this.currentIndex = index;
      },
      pre_ajax: function () { //获取未来小时
        this.$ajax({
          method: 'get',
          url: this.$store.state.apiUrl.pre_url
        }).then(respones => {
          this.pre_val = respones.data.data.TypeName;
        })
      },
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
      },
      //云图渲染方法
      addPngsource(geoJsonUrl,elementType,level,showExchange){
        console.log("addPngsource = "+geoJsonUrl,elementType,showExchange)
        let coordinates = [
          [73.31, 53.08000000000000],
          [133.0700000000001, 53.08000000000000],
          [133.0700000000001, 18.0000000000000],
          [73.31, 18.0000000000000]
        ];
        let RasterLayer = new PIE.MetoStyle.RasterLayer({url:geoJsonUrl,id:showExchange,coordinates:coordinates});
        this.mapset.add(RasterLayer);
      },
      //等值面渲染方法
      addIsosurfacevector(geojson,elementType,level,showExchange){
        console.log("addIsosurfacevector = "+elementType,level,showExchange)
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
        this.FillLayer = new PIE.MetoStyle.FillLayer({data:geojson,id: showExchange,color:this.colormap[elementType],colorPath:colorMap});
        this.fillid = showExchange;
        this.saveLayerdata.push(this.fillid)
        this.mapset.add(this.FillLayer);
        this.moveLayer(this.lineid,this.FillLayer,this.LineLayer)

      },
      //等值线渲染方法
      addIsolinesource(geojson,elementType,level,showExchange){
        console.log("addIsolinesource = "+elementType,level,showExchange)
        this.LineLayer = new PIE.MetoStyle.LineLayer({data:geojson.line,id:showExchange,color:this.colormap[elementType]});
        this.mapset.add(this.LineLayer);
        this.lineid = showExchange;
        this.saveLayerdata.push(this.lineid)
        this.moveLayer(this.fillid,this.FillLayer,this.LineLayer);
        if(geojson.point.features==""){
          this.addTestlinesource(geojson,elementType,level,showExchange);
        }else{
          this.addTestlinesource(geojson,elementType,level,showExchange);
        }
      },
      //点数据渲染方法
      addTestlinesource(geojson,elementType,level,showExchange){
        console.log("addTestlinesource = "+elementType,level,showExchange)
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
          if(elementType == "pressure"){
            datat.properties.colorIndex = geojson.line.features[i].properties.colorIndex/100;
          }else{
            datat.properties.colorIndex = geojson.line.features[i].properties.colorIndex;
          }
          datatest.features.push(datat);
        };
//        var TestLayer = new PIE.MetoStyle.PointLayer({data:datatest,id:showExchange + "title"});//栅格点数据添加方法
        var TestLayer = new PIE.MetoStyle.TextLayer({data:datatest,id:showExchange + "title"});//矢量点数据添加方法
        this.testid =  showExchange + "title";
        this.saveLayerdata.push(this.testid)
        this.mapset.add(TestLayer);
      },
      //流线渲染方法
      addWslsource(geojson,elementType,level,showExchange){
        console.log("addWslsource = "+elementType,showExchange)
        console.log(this.saveLayerdata)
        this.LineLayer = new PIE.MetoStyle.LineLayer({data:geojson,id:showExchange,color:this.colormap[elementType]});
        this.wslid =showExchange;
        this.mapset.add(this.LineLayer);
        this.saveLayerdata.push(this.wslid)
      },
      //风向杆渲染方法
      addWwssource(geojson,elementType,level,showExchange){
        console.log("addWwssource = "+elementType,level,showExchange)
        let IconLayer = new PIE.MetoStyle.IconLayer({data:geojson,id:showExchange});
        this.wwsid =showExchange;
        this.mapset.add(IconLayer);
        this.saveLayerdata.push(this.wwsid);
      },
      //定时调用添加标识的方法。
      setTime(e){
        console.log("setTime",e);
        if(this.timenum == 0)return;
        this.timenum =0;
        this.addPointElementValue(this.oldlng,this.oldlat);
      },
      //在鼠标移动的时候timenum 始终为1
      getElementValue(e){
        this.timenum = 1;
        this.removeMarker();
        this.oldlng = e.lngLat.lng;
        this.oldlat = e.lngLat.lat;
      },
      //添加标识点的方法。
      addPointElementValue(lng,lat){
        var _this = this;
        var url = DatapostUrl+pointDataURL+'params='+
          "data:"+"2018-01-02"+
          ",hour:"+8+
          ",fcstHour:"+12+
          ",modelType:"+"511"+
          ",feature:"+this.$store.state.elementType+
          ",level:500"+
          "&longitude="+lng+"&latitude="+lat;
        $.ajax({
          async : false,
          type : "POST",
          dataType : "json",
          url : url,
          success : function(rs) {
            if (!rs || rs.length == 0) {
              return;
            }

            console.log(rs);
            _this.addMarker(rs.point);
          },
        })
      },
      //获取三线图
      getThreeLineDatas(e){
        var _this = this;
        var url = DatapostUrl+threeLineDataURL+
          "longitude="+e.lngLat.lng+"&latitude="+e.lngLat.lat+"&time=2018-06-06";
        $.ajax({
          async : false,
          type : "POST",
          dataType : "json",
          url : url,
          success : function(rs) {
            if (!rs || rs.length == 0) {
              return;
            }
            console.log(rs);
            _this.addPopup(rs,e);
          },
        })
      },
      addPopup(data,e){
        var timesData = [];
        var element ={
          "tempvalue":[],
          "humidityvalue":[],
          "pressurevalue":[]
        }
        for(var temp in data){
          if(temp == "temp"){
            for(var i =0 ;i<data[temp].length;i++){
              timesData.push(data[temp][i].forecastDate+" "+data[temp][i].forecastTimeHour+"时");

            }
          }
          for(var i =0 ;i<data[temp].length;i++){
            element[temp+"value"].push(Number(data[temp][i].value).toFixed(2));
          }
        }
        var div = document.createElement("div");
        div.style.width = "400px";
        div.style.height = "230px";
        //  折线图
        var myChart3 = echarts.init(div);
        myChart3.setOption({
          title: {
            text: '三线图'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: timesData
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
            name:"温度",
            stack: '总量',
            data: element.tempvalue,
            type: 'line'
          },
            {
              name:"湿度",
              stack: '总量',
              data: element.humidityvalue,
              type: 'line'
            },{
              name:"压强",
              stack: '总量',
              type: 'line',
              data: element.pressurevalue,
            }
            ]
        });
        console.log(div.innerHTML);
        this.removePopup()
        this.popup =  new mapboxgl.Popup()
          .setLngLat([e.lngLat.lng,e.lngLat.lat])
          .setDOMContent(div)
          .addTo(this.mapset.map);
      },
      removePopup(){
        if(this.popup){
          this.popup.remove();
        }
      },
      addMarker(pointvalue){
        this.removeMarker();
        var div = document.createElement("div");
        div.innerHTML = Number(pointvalue).toFixed(2);
        this.marker =  new mapboxgl.Marker(div);
        this.marker.setLngLat([this.oldlng,this.oldlat])
          .addTo(this.mapset.map)
      },
      removeMarker(){
          if(this.marker){
            this.marker.remove();
          }
      },
      //添加栅格等直面数据
      addGridFillTileLayer(url,id){
        console.log("addGridTileLayer = "+url,id);
        var _this = this;
        this.FillLayer = new PIE.GridTileLayer({
          id:id,
          url:url
        });
        this.fillid = id;
        this.saveLayerdata.push(this.fillid)
        this.mapset.add(this.FillLayer);
        var testLineLayer = new PIE.MetoStyle.LineLayer({data:"static/data/worldPolyGon.geojson",width:1,color:"#444"});
        //将线图层添加到底图里
        this.mapset.add(testLineLayer);
        this.legendShow = true;
       /* this.mapset.on("mousedown",function (e) {
          _this.getElementValue(e.lngLat.lng,e.lngLat.lat);
        })*/
        this.timeValue = setInterval(this.setTime,1000);
        this.mapset.on("mousemove",_this.getElementValue)
      },
      //添加栅格等值线数据
      addGidLineTileLayer(url,id){
        console.log("addGidLineTileLayer = "+url,id)
        this.LineLayer = new PIE.MetoStyle.LineLayer({data:url,id:id,color:this.colormap["temp"]});
        this.mapset.add(this.LineLayer);
        this.addGidPointTileLayer(url,id);
        this.lineid = id;
        this.saveLayerdata.push(this.lineid)
        this.moveLayer(this.fillid,this.FillLayer,this.LineLayer);
      },
      //添加栅格点数据
      addGidPointTileLayer(url,id){
        this.testid =  id + "title";
        var TestLayer = new PIE.MetoStyle.TextLayer({
          data:url,
          text:"prop1",
          color:"#000",
          id : this.testid
        });

        this.saveLayerdata.push(this.testid)
        this.mapset.add(TestLayer);
        },
      //添加栅格风向杆数据
      addGidWwsTileLayer(url,id){
        this.wwsdatapost = url;
        this.wwsLayId = id;
        console.log("addGidWwsTileLayer"+id)
        var self = this;
        self.mapset.on('zoomend',self.getWind);
        self.mapset.on('moveend',self.getWind);
        self.getWind();
      },
      //获取栅格风向杆数据
      getWind(){
        var self = this;

        var a = self.mapset.getBounds();
        var b = self.mapset.getZoom();
        console.log("self.mapset.getZoom() = "+b)
        //定义一个
        var testLineLayer = new PIE.MetoStyle.IconLayer({url:this.wwsdatapost+"&bounds="+a+"&zoom="+b,
          iconUrl:"WindSpeed",
          rotate:"WindDirection",
          imageName:"WIND",
          id:self.wwsLayId
        });
        testLineLayer.addEventListener('load',function () {
          if(self.mapset.getLayer(self.wwsLayId)){
            self.mapset.remove(self.mapset.getLayer(self.wwsLayId));
          }

          self.mapset.add(testLineLayer)
          self.saveLayerdata.push(self.wwsLayId)
        });

      },
      //获取风场流线数据
      addWindLiu() {
        var latlon = this.mapset.getBounds();
        wind(this.mapset);
        this.mapset.map.addSource('mapdata', {
          type: 'canvas',
          canvas: 'mapcanvas',
          animate: true,
          coordinates: [
            [latlon._sw.lng, latlon._ne.lat],
            [latlon._ne.lng, latlon._ne.lat],
            [latlon._ne.lng,latlon._sw.lat],
            [latlon._sw.lng, latlon._sw.lat]
          ]
        });
        this.mapset.map.addLayer({
          "id": "mapdata",
          "type": "raster",
          "source": "mapdata"

        });
      },

      layerShow(type,id){
        var layer = this.mapset.getLayer(id);
        if(layer){
          if(id.indexOf("isv")>0){
            console.log("isv")
            this.legendShow = true;
            this.mapset.on("mousemove",this.getElementValue)
          }
          if(id.indexOf("isoline")>0){
            this.layerShow("text",id+"title")
          }
          layer.setVisible(true);
        }
      },
      layerHide(type,id){
        console.log(id.indexOf("isv"));
        var layer = this.mapset.getLayer(id);
        if(layer){
          if(id.indexOf("isv")>0){
            this.legendShow = false;
            this.removeMarker();
            this.mapset.off("mousemove",this.getElementValue)
          }
          if(id.indexOf("isoline")>0){
            this.layerHide("text",id+"title")
          }
          layer.setVisible(false);
        }
      },

  //控制图层可见
      showLayersource(layerId){
        console.log("showLayersource = "+layerId)
        if(layerId == "temp"+this.level+"isv"){
          this.legendShow = true;
        }
        var layer = this.mapset.findLayerById(layerId);
        layer.setVisible(true);

        if(this.mapset.findLayerById(layerId + "title"))
        {
          var layer1 = this.mapset.findLayerById(layerId + "title");
          layer1.setVisible(true);
        }
      },
      //控制图层不可见
      disshowLayersource(layerId){
        if(layerId == "temp"+this.level+"isv"){
            this.legendShow = false;
        }
        this.mapset.off('zoomend',this.getWind);
        this.mapset.off('moveend',this.getWind);
        console.log("disshowLayersource = "+layerId);
        var layer = this.mapset.findLayerById(layerId);
        layer.setVisible(false);
        if(this.mapset.findLayerById(layerId + "title"))
        {
          var layer1 = this.mapset.findLayerById(layerId + "title");
          layer1.setVisible(false);
        }
      },
      //控制图层位置
      moveLayer(id,fillLayer,lineLayer){
        console.log("moveLayer = "+id,fillLayer,lineLayer);
        if(this.mapset.findLayerById(id)){
          this.mapset.moveLayer(fillLayer,lineLayer)
        }else{

        }
      },
      //不同pbf数据渲染方法
      pbgAnalysis(graphType,geoJsonUrl,elementType,level,showExchange){
        console.log("pbgAnalysis = "+graphType,geoJsonUrl,elementType,level,showExchange);
        if(graphType == 'png'){
          this.addPngsource(geoJsonUrl,elementType,level,showExchange)
        }
        else{
            //添加等值面图层
            if(graphType + elementType == "isosurfacevector" + elementType)
            {
              if(this.getValueInArray(this.elementType+level+"isv")){
                this.showLayersource(this.elementType+level+"isv");
                this.legendShow = true;
              }else{
                this.addGridFillTileLayer(geoJsonUrl,showExchange)
              }
              if(this.getValueInArray(this.elementType+level+"iso")){
                this.showLayersource(this.elementType+level+"iso");
              }else{

              }
            }
            //添加等值线/流线图层
            if(graphType + elementType == "isoline" + elementType)
            {
              let pbdata;
              pbdata = this.protobuffer.requestData(geoJsonUrl, graphType)
              pbdata.then(data => {
                var geojson = getGeoJsonData(data);
                if(this.getValueInArray(this.elementType+level+"iso")){
                  this.showLayersource(this.elementType+level+"iso");
                }else{
//                  this.addGidLineTileLayer(geoJsonUrl,elementType,level,showExchange)
                  this.addIsolinesource(geojson,elementType,level,showExchange)
                }
                if(this.getValueInArray(this.elementType+level+"isv")){
                  this.disshowLayersource(this.elementType+level+"isv");
                  this.legendShow = false;
                }else{

                }
              })
            }
            //添加流线
            if( graphType == "wsl"){
              if(this.getValueInArray(this.elementType+level+"wwstree")){
                this.disshowLayersource(this.elementType+level+"wwstree");
              }else{

              }
//              this.addWslsource(geojson,elementType,level,showExchange);
              this.addWindLiu();
            }
            //添加风向杆
            if(graphType == "wws")
            {
              if(this.getValueInArray(this.elementType+level+"wsline")){
                this.disshowLayersource(this.elementType+level+"wsline");
              }else{

              }
//              this.addWwssource(geojson,elementType,level,showExchange)
              this.wwsLayId = showExchange;
              this.wwsdatapost = geoJsonUrl
              this.addGidWwsTileLayer();
            }

        }
      },
      //添加渲染数据
      addDataSource(geoJsonUrl,graphType,elementType,level,showExchange){
        console.log("addDataSource = "+geoJsonUrl,graphType,elementType,level,showExchange);
        if(this.mapset.findLayerById(this.layerId))
        {
          this.showLayersource(this.layerId);
        }
        else
        {
          this.pbgAnalysis(graphType,geoJsonUrl,elementType,level,showExchange)
        }
        this.$store.state.chufa = false;
      },
      //图层展示
      showLayer(layerId){
        for(var i =0 ;i<layerId.length;i++){
          if(this.mapset.findLayerById(layerId[i]))
          {
            this.showLayersource(layerId[i]);
          }
        }
      },
      addDataURL(url,type,id){
        if(this.mapset.findLayerById(id))
        {

        }
        else
        {
          if(type=="png"){
            this.addPngsource(url,type,"500",id)
          }
          else if(type=="isv"){
              this.addGridFillTileLayer(url,id);
          }else  if(type =="wws"){
              this.addGidWwsTileLayer(url,id);
          }else if(type == "isoline"){
            this.addGidLineTileLayer(url,id);
          }

        }
        this.$store.state.chufa = false;
      },

      //查找重复图层id的方法
      getValueInArray(value){
        console.log(this.saveLayerdata)
        console.log("getValueInArray = "+value);
        debugger;
        for(var i = 0 ;i< this.saveLayerdata.length;i++ ){
              if(value ==  this.saveLayerdata[i]){
                  return true;
              }
          }
          return false;
      },
      //判断id类型的方法
      decideIdtypeof(layerId){
        for(var i =0 ;i<layerId.length;i++){
          if(this.mapset.findLayerById(layerId[i]))
          {
            this.disshowLayersource(layerId[i]);
          }
        }
      },
      //渲染图例数据
      addLegenddata(){
          for(var i=0;i<this.legend.length;i++){
              this.colorIndex = this.legend[i].colorIndex;
              var classcolor = document.getElementsByClassName('tuli_color');
              classcolor[i].style.background = this.colorIndex;
          }
      }
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
      listenshowto(){
          return this.$store.state.showTo;
      },
      listenTimeshow(){
        return this.$store.state.timeValue;
      },
    },
    watch: {
      listenshowto(){
            if(this.$store.state.showTo){
              var layerId = this.$store.state.layerId;
              let typeOf = typeof (layerId);
              if(typeOf == 'string'){
                let layerIds;
                layerIds = layerId.split(",");
                this.showLayer(layerIds)
              }else{
                this.showLayer(layerId)
              }
              this.$store.state.showTo= false;
            }else{

            }
        },
      listenGraphType(){
          var dataValue = this.$store.state.dataValue;
          console.log(dataValue);
          if(this.$store.state.chufa){
            for(var temp in dataValue){
              if(temp == "add"){
                  for(var i =0 ;i<dataValue[temp].length;i++){
                    this.addDataURL(dataValue[temp][i].url,dataValue[temp][i].graphType,dataValue[temp][i].id)
                  }
              }else if(temp == "show"){
                  for(var i =0 ;i<dataValue[temp].length;i++){
                    this.layerShow(dataValue[temp][i].graphType,dataValue[temp][i].id);
                  }
                this.$store.state.chufa = false;
              }else if(temp == "hide"){
                  for(var i =0 ;i<dataValue[temp].length;i++){
                    this.layerHide(dataValue[temp][i].graphType,dataValue[temp][i].id);
                  }
                this.$store.state.chufa = false;
              }
            }
          }else{

          }
      },
      listenshow(){
        if(this.$store.state.show){


        }else{
          var layerId = this.$store.state.layerId;
          let typeOf = typeof (layerId);
          if(typeOf == 'string'){
            let layerIds;
            layerIds = layerId.split(",");
            this.decideIdtypeof(layerIds)
          }else{
            this.decideIdtypeof(layerId)
          }
          this.$store.state.show = true;
        }
      },
      listenTimeshow(){
        this.time =  this.$store.state.timeValue;
      },
    },
    mounted(){
      this.$store.state.Valuedatashow = true;
      this.$store.state.weatherlistIndex = 1;
//      this.pre_ajax();
      var url = window.location.href.substr(0,window.location.href.indexOf(window.location.hash));
      url = url.substr(0,url.lastIndexOf("/"))+"/static/sprite1/Weather";
      this.protobuffer = new PieParseProtoBuffer();
      this.mapset = this.loadMap.map(url);
      //改变地图风格,添加风向杆图
      this.mapset.on('load',() => {

        var world = new PIE.MetoStyle.FillLayer({data:"static/data/worldPolyGon.geojson",color:"rgba(243, 236, 236, 1)",id:"world"});
        this.mapset.add(world);
        this.mapset.on("click",this.getThreeLineDatas)
      });
      this.addLegenddata();
      this.isActive(this.$store.state.colorIndex);
      console.log("this.index = "+this.$store.state.colorIndex)
    },
  }

</script>

<style>
  /*时间插件样式*/
  .current {
    background: #062270;
  }
  .Value_router_con .tab a {
    width: 20%;
  }

  .nav_menu {
    position: absolute;
    right: 1%;
    width: 40px;
    top: 3%;
    z-index: 9;

  }

  .btn {
    overflow: hidden;
    padding: 4px 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .nav_menu .nav_menu_btn {
    width: 40px;
    height:40px;
    border-radius:20px;
    background: #2d427e;
    margin-bottom:1px;
    opacity: .9;
    color: #fff;
    outline: none;
    border: none;
    display: block;
    font-size: 16px;
    transition: .5s;
    z-index: 99999999;

  }

  .nav_menu .nav_menu_btn:hover {
    background: #062270;
  }

  #app .show_btn {
    position: absolute;
    bottom: 12%;
    right: 445px;
    cursor: pointer;
    border-radius: 20px;
    transition: .8s;
  }

  #app .dis_btn {
    position: absolute;
    bottom: 12%;
    right: 1%;
    cursor: pointer;
    border-radius: 20px;
    transition: .8s;
  }

  #app .show {
    position: absolute;
    /* bottom: 12%; */
    right: 445px;
    cursor: pointer;
    border-radius: 10px;
    transition: .8s;
  }

  #app .dis {
    position: absolute;
    /* bottom: 12%; */
    right: 1%;
    cursor: pointer;
    border-radius: 10px;
    transition: .8s;
  }

  .router_con .pressure {
    width: 40px;
    overflow: hidden;
    color: #fff;
    padding: 4px 0;
  }

  .router_con .pressure li {
    display: inline-block;
    width: 40px;
    height:40px;
    background: #2d427e;
    opacity: .9;
    border-radius:20px;
    line-height: 40px;
    font-size: 12px;
    margin-bottom:1px;
  }

  .nav_menu .pressure:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .router_con .pressure li:hover {
    background: #062270;
  }

  .Pre_val {
    position: absolute;
    right: 1%;
    top: 47%;
    /* bottom:50%; */
    font-size: 12px;
    z-index: 9;
    padding: 4px 0;
    background: #2d427e;
    overflow: hidden;
  }

  .Pre_val li {
    display: block;
    width: 40px;
    height: 24px;
    line-height: 24px;
    transition: .5s;
    background: #2d427e;
    opacity: 0.9;
    cursor: pointer;
    color: #ffffff;
  }

  .Pre_val li:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .Pre_val li:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .Pre_val li:hover {
    background: #062270;
  }

  .time {
    position: absolute;
    left: 50px;
    top: 20px;
    z-index: 99;
    width: 6%;
    height: 40px;
    opacity: .8;
    float: right;
    background: #2d427e;
    font-size: 16px;
    color: #fff;
    line-height: 40px;
    border-radius: 22px;
  }
  /*图例样式*/
  .tuli{
    width:122px;
    border:1px solid #2d427e;
    position:absolute;
    left:1%;
    bottom:2%;
    font-size:12px;
    color:#000;
    overflow:hidden;
    padding-top:10px;
  }
  .tuli_left{
    width:60px;
    float:left;
  }
  .tuli_right{
    width:60px;
    float:right;
  }
  .tuli_color{
    width:50px;
    height:15px;
    margin:5px 0;
  }
  .tuli_text{
    width:52px;
    height:15px;
    margin:5px 0;
    z-index:99
  }

</style>
