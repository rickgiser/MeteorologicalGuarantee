var Typhoon =  function (mapset) {
    var map = mapset,typhoon;
    var i =0,linePath =[];
    var marker;
    this.getTyphoon= function (id){
        $.ajax({
            async : false,
            type : "POST",
            dataType : "json",
            url : DatapostUrl+"/typhoon/typhoonToJson?id="+id,
            success : function(rs) {
                if (!rs || rs.length == 0) {
                    return;
                }
                console.log(rs);
                typhoon = rs;
                setInterval(animat,1000);
            },
        })
    };
    map.on('click', 'point_test', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.descripption;
        var radius = e.features[0].properties.radius;
        console.log(e);
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        var typhoon = {
            "EN":{"Seven": {Area: radius, start: 0},},
            "WN":{"Seven": {Area: radius, start: 90},},
            "WS":{"Seven": {Area: radius, start: 180},},
            "ES":{"Seven": {Area: radius, start: 270},},
        };
      //  getPolygon(typhoon)
       var popup =  new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
           .addTo(map.map);
        getPolygon(coordinates[0],coordinates[1],typhoon);
        removeMarker();
    });
    function removeMarker(){
        if(marker){
            marker.remove();
        }
    }
    map.on('mousedown', 'testfill', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.descripption;
        var div = document.createElement("div");
        div.innerHTML = description;
        removeMarker();
        marker =  new mapboxgl.Marker(div);
        marker.setLngLat(e.lngLat)
            .addTo(map.map)
    });
    function getPolygon(lng,lat,path) {
        console.log(path);
        var PolyGon = {
            "Seven":{
                Line:[],
                data:""
            }
        };
        var lines = [];
        for(var item in path){
            console.log(item);
            for(var Level in path[item]){
                if(Level == "Seven"){
                    var r=(path[item][Level].Area/100);
                    var start = path[item][Level].start;
                    var line = getLinePath(lng,lat,r,start);
                    console.log(line);
                    PolyGon[Level].Line = PolyGon[Level].Line.concat(line);
                }

            }
        }
        PolyGon[Level].data = "七级风圈（东北"+path["EN"]["Seven"]["Area"]+"km，东南"
            +path["WN"]["Seven"]["Area"]+"km，西北"
            +path["WS"]["Seven"]["Area"]+"km，西南"
            +path["ES"]["Seven"]["Area"]+"km）"
        console.log(PolyGon[Level].Line);

        if(map.getLayer("testfill")){
           map.getLayer("testfill").setSource(getFillData(PolyGon[Level].Line, PolyGon[Level].data));
        }else{
            var fillTyphoon = new PIE.MetoStyle.FillLayer({
                data:getFillData(PolyGon[Level].Line, PolyGon[Level].data),
                color:"#ffff00",
                id:"testfill"
            });
            map.add(fillTyphoon);
            map.moveLayer(fillTyphoon,map.getLayer("point_test"));
        }

    }

    function getLinePath(lng,lat,r,start) {
        console.log(lng,lat,start,r);
        var lines = [];

        for(var i=0;i<31;i++){
            var b = ((start+i*3)/180)*Math.PI;
            var x = lng + r*Math.sin(b);
            var y = lat + r*Math.cos(b);

            var temp = [x,y]
            lines.push(temp);
        }
        return lines;
    }
    function svgDraw() {
        var svgDom = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svgDom.setAttribute('width','2000');
        svgDom.setAttribute('height','2000');
       // getSvgRValue(,,400,400);
       var r = getSvgR();

       /* Mx y A r r 0 0 0 x+r-r*cos(α)  y+r*sin(α)  L x+r y z
            M730 325  A 50 50 0 0 0 740 365 L780 325 z
        这样就可以了，其中α为扇形的角，r为半径*/

        var path=document.createElementNS("http://www.w3.org/2000/svg","circle");
        path.setAttributeNS(null,"id","circle");
        path.setAttributeNS(null,"cx","1000");
        path.setAttributeNS(null,"cy","1000");
        path.setAttributeNS(null,"r",r);
        path.setAttributeNS(null,"fill","red");
        path.setAttributeNS(null,"fill-opacity","0.5");

        svgDom.appendChild(path);
        return svgDom;
    }
// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'point_test', function () {
        map.map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'point_test', function () {
        map.map.getCanvas().style.cursor = '';
    });
    function animat() {
        if(typhoon.result.length>i){
            var temp = typhoon.result[i];
            i++;
            linePath.push(temp);
            draw();
        }
    }
    function draw() {
        if(map.getLayer("point_test")){
            map.getLayer("point_test").setSource(getPointData(linePath));
        }else{
            points = new PIE.MetoStyle.PointLayer({data:getPointData(linePath),id:"point_test"});
            map.add(points);
        }
        if(map.getLayer("line_test")){
            map.getLayer("line_test").setSource(getLineData(linePath));
        }else{
            lines = new PIE.MetoStyle.LineLayer({data:getLineData(linePath),id:"line_test",color:"#ff0000",width:2});
            map.add(lines);
        }
        var obj = linePath[linePath.length-1];
        var radius = obj.SWCHRCD;
        var lng = obj.LON;
        var lat = obj.LAT;
        var typhoon = {
            "EN":{"Seven": {Area: radius, start: 0},},
            "WN":{"Seven": {Area: radius, start: 90},},
            "WS":{"Seven": {Area: radius, start: 180},},
            "ES":{"Seven": {Area: radius, start: 270},},
        };
        getPolygon(lng,lat,typhoon)

    }

    function getFillData(linePath,data) {
        var dataLine ={
            "type": "FeatureCollection",
            "features": []
        };
        var dataLineset = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [linePath]
            },
            "properties":{
                "descripption": "<div><p>"+data+"</p></div>",
            }
        };
        dataLine.features.push(dataLineset);
        return dataLine;
    }
    function getPointData(linePath) {

        var data ={
            "type": "FeatureCollection",
            "features": []
        };

        for(var i =0 ;i<linePath.length;i++){
            var obj = linePath[i];
            var date =obj.TIME// moment(obj.TIME,"YYYYMMDDHH").format("YYYY-MM-DD HH时");
            var dataset = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [obj.LON, obj.LAT]
                },
                "properties":{
                    "descripption": "<strong>"+date+"</strong><p><b>当前位置：</b>"+obj.LON+"°/"+obj.LAT+"°<br><b>中心气压：</b>"+obj.TGTQ+" 百帕<br><b>最大风速：</b>"+obj.SPEED+" M/s<br><b>七级半径：</b>"+obj.SWCHRCD+" 公里</p>",
                    "speed":obj.SPEED,
                    "radius":obj.SWCHRCD
                }
            };
            data.features.push(dataset);

        }
        console.log(data);
        return data;
    }

    function getLineData(linePath) {


        var dataLine ={
            "type": "FeatureCollection",
            "features": []
        };
        var dataLineset = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": []
            }
        };
        for(var i =0 ;i<linePath.length;i++){
            var obj = linePath[i];
            dataLineset.geometry.coordinates.push([obj.LON,obj.LAT]);
        }
        dataLine.features.push(dataLineset);
        return dataLine;
    }
};


