var DatapostUrl = "http://10.1.6.71:8060/PIE-Web";
var SeBanTuURL = "/showPrd/surf/{z}/{x}/{y}.png?";
var IsoLineURL = "/showPrd/getDigitalData?";
var WindDirectingURL = "/showPrd/getDigitalWindVectorData?";
var pointDataURL ="/showPrd/getPointValueByLonLat?";
var threeLineDataURL ="/singleStation/getThreeLineData?";

function getData(url) {
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
};
/*rect.minX = 73.5f;
rect.maxX = 135.f;
rect.minY = 18.f;
rect.maxY = 54.f;*/
function addImage(map,name,url) {
  var coordinates = [[73,54],[135,54],[135,18],[73,18]];
  var img = new PIE.MetoStyle.RasterLayer({
    url:url,
    coordinates:coordinates,
    id:name,
    opacity:1,
  });
  map.add(img);
}
function showAnalyzeLayer(map,id) {
  var dsp =  map.map;
  if(dsp.getLayer(id+"Line")){
    dsp.setLayoutProperty( id+"Line", 'visibility', 'visible');
  }
  if(dsp.getLayer(id+"Linetitle")){
    dsp.setLayoutProperty( id+"Linetitle", 'visibility', 'visible');
  }
  if(dsp.getLayer(id+"Point")){
    dsp.setLayoutProperty( id+"Point", 'visibility', 'visible');
  }
}
function hideAnalyzeLayer(map,id) {
  var dsp =  map.map;
  if(dsp.getLayer(id+"Line")){
    dsp.setLayoutProperty( id+"Line", 'visibility', 'none');
  }
  if(dsp.getLayer(id+"Linetitle")){
    dsp.setLayoutProperty( id+"Linetitle", 'visibility', 'none');
  }
  if(dsp.getLayer(id+"Point")){
    dsp.setLayoutProperty( id+"Point", 'visibility', 'none');
  }
}
function addStationDataValue(rs,map,name,color,isShow,isSolid,width,hight,low) {
  console.log(rs);
  var dsp =  map.map;
  // 获取数据类型
  var paint = {

  }
  if(isSolid){
    paint ={
      "line-color":color,
      "line-width":width

    }
  }else{
    paint ={
      "line-color":color,
      "line-width":width,
      "line-dasharray":[2,4]
    }
  }

  // 刷新数据源

  if (rs ) {
    dsp.addSource(name,{
      type:"geojson",
      data:rs
    });
    dsp.addLayer({
      "id":name+"Line",
      "source":name,
      "type":"line",
      "paint":paint,
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "filter": ["==", "$type", "LineString"]

    });
    dsp.addLayer({
      "id":name+"Linetitle",
      "source":name,
      "type":"symbol",
      "paint":{
        "text-color":color
      },
      "layout": {
        "text-field": "{value}",
        "text-font":["Open Sans Bold"],
      },
      "filter": ["==", "$type", "LineString"]

    });
    if(isShow){
      dsp.addLayer({
        "id":name+"Point",
        "source":name,
        "type":"symbol",
        "paint":{
          "text-color": {
            "property": "isHigh",
            "type":"categorical",
            "stops": [
              [true, "#00f"],
              [false, "#f00"]
            ]
          }
        },
        "layout":{
          "text-field": {
            "property": "isHigh",
            "type":"categorical",
            "stops": [
              [true, hight],
              [ false, low]
            ]
          },
          "text-font":["Open Sans Bold"],
        },
        "filter": ["==", "$type", "Point"]
      })
    }

  }
}
