/**
 * Created by Administrator on 2017/10/30.
 */
function PieParseProtoBuffer() {
  this._state = {
    ready: false,
    message: null
  };
  loadProtoFile(this._state);

  function loadProtoFile(state) {
    return new Promise((resolve) => {
      protobuf.load(['static/js/proto/wpIsolineRenderData.proto',
        'static/js/proto/wpIsoSurfaceRenderData.proto',
        'static/js/proto/streamline.proto',
        'static/js/proto/wpGeoWindPole.proto'
      ], (err, root) => {
        let datasetMessage = root.lookup("pbufWeather.wpIsolineRenderData");
        let datasurfaceMessage = root.lookup("pbufWeather.wpIsoSurfaceRenderData");
        let datastreamlineMessage = root.lookup("streamline.GeoStreamline");
        let datawindpoleMessage = root.lookup("windpole.wpGeoWindPole");
        state.ready = true;
        state.message = [datasetMessage, datasurfaceMessage, datastreamlineMessage, datawindpoleMessage];
        // state.message = {'isoline':datasetMessage,
        //                 'isv':datasurfaceMessage,
        //                 'wsl':datastreamlineMessage,
        //                 'wws':datawindpoleMessage
        //                 };
        resolve();
      });
    })
  }
}

PieParseProtoBuffer.prototype.requestData = function (url, type) {
  return getProtobuf(this._state.message, url, type);
}

function getProtobuf(msg, url, type) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    console.log(url)
    xhr.open("GET", "http://" + url, true);
    //xhr.open("GET",url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = () => {
      let result = new Uint8Array(xhr.response);
      if (result.length === 0) {
        console.log('数据读取失败');
        return false;
      }
      var readerData = new protobuf.Reader(result);
      let protoData;
      if (type == "isoline") {
        protoData = msg[0].decode(readerData);
      } else if (type == "isosurfacevector") {
        protoData = msg[1].decode(readerData);
      } else if (type == "wsl") {
        protoData = msg[2].decode(readerData);
      } else if (type == "wws") {
        protoData = msg[3].decode(readerData);
      }
      resolve(protoData);
    };
    xhr.send(null);
  })
}
/*
 * 解析protocol buffer数据为等值线的geojson格式
 * */
function getGeoJsonData(val) {
  debugger;
  var geojson = {
    "type": "FeatureCollection",
    "features": []
  };
  if (val.wGeoLineArray) {
    for (var i = 0; i < val.wGeoLineArray.length; i++) {
      // 获取GeoLine
      var xArr = val.wGeoLineArray[i].xArray;
      var yArr = val.wGeoLineArray[i].yArray;
      var pntCount = xArr.length;
      var featureL = {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": []
        }
      }
      for (var j = 0; j < pntCount; j++) {
        featureL.geometry.coordinates.push([xArr[j], yArr[j]]);
      }
      geojson.features.push(featureL);
    }
  } else if (val.wpGeoRegionArray) {
    var colorArr = [];
    //等值面
    for (var i = 0; i < val.wpGeoRegionArray.length; i++) {
      // 获取GeoLine
      var xArr = val.wpGeoRegionArray[i].xArray;
      var yArr = val.wpGeoRegionArray[i].yArray;
      var valueArr = val.wpGeoRegionArray[i].Value;
      colorArr.push(valueArr);
      var pntcountArr = val.wpGeoRegionArray[i].SubPntCounts;
      var featureR = {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": []
        },
        "properties": {
          "colorIndex": parseInt(colorArr[i])
        }
      };
      for (var k = 0; k < 1; k++) {
        var featureL = {
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates": []
          },
          "properties": {
            "colorIndex": parseInt(colorArr[i])
          }
        };
        var pcount = 0;
        for (var j = pcount; j < pntcountArr[k] + pcount; j++) {
          featureL.geometry.coordinates.push([xArr[j], yArr[j]]);
        }
        pcount += pntcountArr[k];
        featureR.geometry.coordinates.push(featureL.geometry.coordinates);
        // remove laset ，
      }
      geojson.features.push(featureR);
    }
  } else if (val.geoLines) {
    //流线数据
    for (var i = 0; i < val.geoLines.length; i++) {
      // 获取GeoLine
      var points = val.geoLines[i].points;
      var featureL = {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": []
        }
      }
      for (var j = 0; j < points.length; j++) {
        featureL.geometry.coordinates.push([points[j].x, points[j].y]);
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
          "angle":windpole.Angle
        }
      }
      geojson.features.push(featureW)
    }
  }
  return geojson;
}
