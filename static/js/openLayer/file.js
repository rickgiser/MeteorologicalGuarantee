function myAsyncFunctionGet(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

var Symdatas;

function addPointol(data)
{
	var name =data[0];
	var lng = parseFloat(data[1]);
	var lat = parseFloat(data[2]);
	var cloudVolume = parseInt(data[5]);
	var cloudVolumeid = GetCloudVolumeSymbolIndex(cloudVolume,9999);

	var windF = parseInt(data[6]);
	var wind  = parseInt(data[7]);
	var windid =  parseInt(GetWindSymbolIndex(wind,9999));
	//console.log(Symdatas[windid]);

	if(Symdatas[windid]&&Symdatas[cloudVolumeid])
	{
		var cloud_offset = [parseInt(Symdatas[cloudVolumeid].attributes.xpos.value),parseInt(Symdatas[cloudVolumeid].attributes.ypos.value)];
		var cloud_size = [parseInt(Symdatas[cloudVolumeid].attributes.width.value),parseInt(Symdatas[cloudVolumeid].attributes.height.value)];

		var wind_offset = [parseInt(Symdatas[windid].attributes.xpos.value),parseInt(Symdatas[windid].attributes.ypos.value)];
		var wind_size = [parseInt(Symdatas[windid].attributes.width.value),parseInt(Symdatas[windid].attributes.height.value)];
		var wind_anchor=[0.5,0.5],wind_anchorOrigin="top-right",clound_anchor=[0.5,0.5],clound_anchorOrigin="top-right";
		if (windF <=90)
		{
			wind_anchor = [0.5,1];
			clound_anchor= [0.5, 1];
			wind_anchorOrigin = "bottom-right";
			clound_anchorOrigin = "top-right";
		}
		else if(windF <=180)
		{
			wind_anchor = [0.5,0];
			clound_anchor= [0.5, 0.5];
			wind_anchorOrigin = "bottom-left";
			clound_anchorOrigin = "bottom-right";
		}
		else if(windF <=270)
		{
			wind_anchor = [0,1];
			clound_anchor= [1, 1];
			wind_anchorOrigin = "bottom-right";
			clound_anchorOrigin = "bottom-left";
		}
		else if(windF <=360)
		{
			wind_anchor = [1,0.5];
			clound_anchor= [0.5, 0];
			wind_anchorOrigin = "bottom-right";
			clound_anchorOrigin = "top-right";
		}
		if(lng)
		{
			var point = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.transform(ol.proj.fromLonLat([lng, lat]),'EPSG:3857','EPSG:2700')),

			});

			  var style = [new ol.style.Style({
				image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
				  anchor: wind_anchor,
				  anchorOrigin:wind_anchorOrigin,
				  anchorXUnits:'pixels',
				  anchorYUnits:'pixels',
				  offset:wind_offset,
				  size:wind_size,
				  scale:0.5,
				  rotateWithView:true,
				  rotation:windF*Math.PI/180,

				  src: 'static/images/Weather.png'
				})),
				text: new ol.style.Text({
					text: name.toString(),
					font: '8px sans-serif',
					offsetX:20,
					offsetY:20,
					scale:0.8
				})
			  }),
			  new ol.style.Style({
				image:new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
					 anchor: clound_anchor,
				  anchorOrigin:clound_anchorOrigin,
				  anchorXUnits:'pixels',
				  anchorYUnits:'pixels',
				  offset:cloud_offset,
				  size:cloud_size,
				  scale:0.5,
				  rotation:0,
				  src: 'static/images/Weather.png'
				})),

			  })];
			point.setStyle(style);

			return point;
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}




}

function getXML()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","static/data/Weather.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    //获取video2里的值：video2.mp4
    //var xmlvar = xmlDoc.getElementsByTagName("video2")[0].childNodes[0].nodeValue;
	Symdatas = xmlDoc.getElementsByTagName("Symbol");

}

//获取风符合索引
function GetWindSymbolIndex(dWindSpeed, missing_value/* = 9999*/)
{
	if(dWindSpeed == missing_value)
	{
		return -1;
	}
	dWindSpeed = dWindSpeed+1;
	var Num=dWindSpeed/20;//Num整数
	var Num2=(dWindSpeed-Num*20)/4;//Num2为整数
	var Num3=(dWindSpeed-Num*20-Num2*4)/2;//Num3为整数
	var Num4=Num*10+Num2*2+Num3;
	if (Num4 == 0)
	{
		return 157;//无风
	}
	else
	{
		var Num5 = Num4 + 47;
		if (Num5>75)
		{
			Num5 = 75;
		}
		return 157 + Num5 - 48;
	}
	return -1;
}



//获取云量符合索引
function GetCloudVolumeSymbolIndex(dCloudVolume,missing_value/* = 9999*/)
{
	if(dCloudVolume == missing_value)
	{
		return -1;
	}
	//if (dCloudVolume >= 10)
	{
		if (dCloudVolume > 2)
		{
			dCloudVolume -= 1;
		}
		if (dCloudVolume > 7)
		{
			dCloudVolume -= 1;
		}
	}

	return 96 + dCloudVolume;
}

//获取云状符合索引
function GetCloudStateSymbolIndex( dCloudState, missing_value/* = 9999*/)
{
	if(dCloudState == missing_value)
	{
		return -1;
	}
	if (dCloudState >= 31 && dCloudState <= 40)
	{
		return dCloudState - 31 + 113;
	}
	else if (dCloudState >= 21 && dCloudState <= 30)
	{
		return dCloudState - 21 + 122;
	}
	else if (dCloudState >= 11 && dCloudState <= 20)
	{
		return dCloudState - 11 + 131;
	}
	return -1;
}

//获取过去天气符合索引
function GetPastWeatherSymbolIndex(dWeather, missing_value/* = 9999*/)
{
	if(dWeather == missing_value)
	{
		return -1;
	}
	if (dWeather >= 3 && dWeather <= 9)
	{
		return dWeather - 3 + 106;
	}
	return -1;
}

//获取现在天气符合索引
function GetNowWeatherSymbolIndex(dWeather, missing_value/* = 9999*/)
{
	if(dWeather == missing_value)
	{
		return -1;
	}
	if (dWeather >= 100)
	{
		dWeather = dWeather - 100;
	}
	if (dWeather<4)
	{
		return -1;
	}
	else if (dWeather<66)
	{
		return dWeather - 5 + 1;
	}
	else if (dWeather<78)
	{
		return dWeather - 67 + 63;
	}
	else if (dWeather<9999)
	{
		return dWeather - 79 + 75;
	}
	return -1;
}
