/**
 * Created by Administrator on 2017/10/30.
 */
function PieParseProtoBuffer(callback){
    this._state = {
        ready:false,
        message:null
    };

    loadProtoFile(this._state,callback);
    function loadProtoFile(state,callback){
        return new Promise((resolve) => {
            protobuf.load([ 'static/data/proto/wpIsolineRenderData.proto',
                'static/data/proto/wpIsoSurfaceRenderData.proto',
                'static/data/proto/streamline.proto',
                'static/data/proto/wpGeoWindPole.proto'], (err, root) => {
                let datasetMessage = root.lookup("pbufWeather.wpIsolineRenderData");
                let datasurfaceMessage = root.lookup("pbufWeather.wpIsoSurfaceRenderData");
                let datastreamlineMessage = root.lookup("streamline.GeoStreamline");
                let datawindpoleMessage = root.lookup("windpole.GeoWindPole");
                state.ready = true;
                state.message = [datasetMessage,datasurfaceMessage,datastreamlineMessage,datawindpoleMessage];
                // state.message = {'isoline':datasetMessage,
                //                 'isv':datasurfaceMessage,
                //                 'wsl':datastreamlineMessage,
                //                 'wws':datawindpoleMessage
                //                 };

				if(callback)
				{
					callback();
				}
                resolve();
            });
        })
    }
}

PieParseProtoBuffer.prototype.requestData = function(url,type){
    return getProtobuf(this._state.message,url,type);
}

function getProtobuf(msg,url,type) {
    return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
        //xhr.open("GET","http://"+url, true);
        xhr.open("GET",url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
            let result = new Uint8Array(xhr.response);
            if (result.length === 0) {
                console.log('数据读取失败');
                return false;
            }
            var readerData = new protobuf.Reader(result);
            let protoData;
            if(type=="isoline"){
                protoData = msg[0].decode(readerData);
            }else if(type=="isosurfacevector"){
                protoData = msg[1].decode(readerData);
            }else if(type == "wsl"){
                protoData = msg[2].decode(readerData);
            }else if(type == "wws"){
                protoData = msg[3].decode(readerData);
            }
            resolve(protoData);
		};
        xhr.send(null);

    })
}

function ab2str(buf) {
   var string = String.fromCharCode.apply('\n',new Uint8Array(buf));
   return string;
}
function getTrueValue(value) {
    if(value<15){
        return "0"+value.toString(16);
    }
    else{
        return value.toString(16);
    }
}
function color(rgb) {
    rgb = Math.abs(rgb);
    //return rgb.toString(16);


    var a = (rgb)>>(24)&(0xff);
    //console.log(sa)
    var r  = (rgb)>>(16)&(0xff);

    var g  = (rgb)>>(8)&(0xff);

    var b  = (rgb)&(0xff);
   // console.log(getTrueValue(r),getTrueValue(g),getTrueValue(b))
    var _rgb = getTrueValue(r)+getTrueValue(g)+getTrueValue(b);


    return _rgb;
}
function TestRgexp(re, s){ // 参数说明 re 为正则表达式 s 为要判断的字符
    return re.test(s)
}

function addPoint(geojson,val){
	var point={
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": []
			},
			"properties":{
				"colorIndex":"",
				"angle":"",
				"valueColor":""
			}
		};
	var re =/^-?\d+$/;
	for(var i=0;i<val.length;i++){

		point.geometry.coordinates.push(val[i].X);
		point.geometry.coordinates.push(val[i].Y);
		var _colorIndex = val[i].Value;
		if( _colorIndex != "+"&&!TestRgexp(re , _colorIndex)){
			_colorIndex=  parseFloat( _colorIndex).toFixed(1)
		}
		if(val[i].ValueString.length != 0)
		{
			//console.log(ab2str(ValueString))
			_colorIndex = ab2str(val[i].ValueString) ;
		}
		point.properties.colorIndex = _colorIndex;
		point.properties.angle = (val[i].Angle*180/Math.PI);
		point.properties.valueColor = '#'+ color(val[i].ValueColor);

		geojson.features.push(point);
	}


}
/*
 * 解析protocol buffer数据为等值线的geojson格式
 * */
function getGeoJsonData(val,to){
    var geojson = {
        "type": "FeatureCollection",
        "features": []
    };
    if(val.wGeoLineArray){
		var Pointgeojson = {
			"type": "FeatureCollection",
			"features": []
		};
        //等值线
        var valueColorArr = [];
        var re =/^-?\d+$/;
        for(var i=0;i<val.wGeoLineArray.length;i++){
            // 获取GeoLine
			if(val.wGeoLineArray[i].Label)
			{
				console.log(val.wGeoLineArray[i].Label);
				addPoint(Pointgeojson,val.wGeoLineArray[i].Label.wGeoPointArray)
			}
            var xArr = val.wGeoLineArray[i].xArray;
            var yArr = val.wGeoLineArray[i].yArray;
            var valueArr = val.wGeoLineArray[i].Value;

            var _angleArr = val.wGeoLineArray[i].Angle;


            var  valuecolorArr = val.wGeoLineArray[i].ValueColor;
            valueColorArr.push(valuecolorArr);

            valuecolorArr ='#'+ color(valuecolorArr);
            //console.log(valuecolorArr);

            var pntCount = xArr.length;
            var ValueString = val.wGeoLineArray[i].ValueString;

            var LineString =ab2str(val.wGeoLineArray[i].LineTypeString);
            if(LineString == "Strong"){
                LineString = 3;
            }
            else {
                LineString =1;
            }

            var _colorIndex =valueArr;
            /*if(to && _colorIndex<1){
                _colorIndex = "+";
            }*/
            if( _colorIndex != "+"&&!TestRgexp(re , _colorIndex))
            {
                _colorIndex=  parseFloat( _colorIndex).toFixed(1)
            }

          //  console.log(ValueString);
            if(ValueString.length != 0)
            {
                //console.log(ab2str(ValueString))
                _colorIndex = ab2str(ValueString) ;
            }
            var featureL={
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                },
                "properties":{
                    "colorIndex":_colorIndex,
                    "angle":_angleArr*180/Math.PI,
                    "valueColor":valuecolorArr,
                    "LineTypeString":LineString
                }
            };
            for(var j =0; j<pntCount;j++){
                if(pntCount>=2)
                {
                    featureL.geometry.coordinates.push([xArr[j],yArr[j]]);

                }

            }
            if(pntCount>=2)
            {
                geojson.features.push(featureL);
            }

        }
		return {
			point:Pointgeojson,
			line:geojson
		}
    }else if(val.wpGeoRegionArray){
        var colorArr = [];
        //等值面
        for(var i=0;i<val.wpGeoRegionArray.length;i++){
            // 获取GeoLine
            var xArr = val.wpGeoRegionArray[i].xArray;
            var yArr = val.wpGeoRegionArray[i].yArray;
            var valueArr = val.wpGeoRegionArray[i].Value;
            colorArr.push(valueArr);
            var pntcountArr = val.wpGeoRegionArray[i].SubPntCounts;
            var featureR={
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates":[]
                },
                "properties":{
                    "colorIndex":parseInt(colorArr[i]*100)/100
                }
            };
            for(var k=0;k<1;k++){
                var featureL={
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates":[]
                    },
                    "properties":{
                        "colorIndex":parseInt(colorArr[i]*100)/100
                    }
                };
                var pcount = 0;
                for(var j = pcount;j<pntcountArr[k]+pcount;j++){
                    featureL.geometry.coordinates.push([xArr[j],yArr[j]]);
                }
                pcount += pntcountArr[k];
                featureR.geometry.coordinates.push(featureL.geometry.coordinates);
                // remove laset ，
            }
            geojson.features.push(featureR);
        }
    }else if(val.geoLines){
        //静态流线数据
        for(var i=0;i<val.geoLines.length;i++){
            // 获取GeoLine
            var points = val.geoLines[i].points;
            var featureL={
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                }
            }
            for(var j =0; j<points.length;j++){
                featureL.geometry.coordinates.push([points[j].x,points[j].y]);
            }
            geojson.features.push(featureL);
        }
    }else if(val.windPole){
        //风向杆数据
        for(var i=0; i<val.windPole.length;i++){
            var windpole = val.windPole[i]
            var featureW = {
                "type":"Feature",
                "geometry":{
                    "type":"Point",
                    "coordinates":[windpole.X,windpole.Y]
                },
                "properties":{
                    //{"iconUrl":"%s.png","iconSize":[80,80], "iconAnchor":[25, 25], "popupAnchor":[0,-25], "className":"dot", "angle":%f}
                    "iconUrl":windpole.Value+".png",
                    "angle":((windpole.Angle)*180/Math.PI)
                }
            }
            geojson.features.push(featureW)
        }
    }
    return geojson;
}



