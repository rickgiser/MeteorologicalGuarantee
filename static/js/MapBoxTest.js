var MapBoxText = function () {
    var scope = this;
    this.map = "";
    var url = window.location.href.substr(0,window.location.href.indexOf(window.location.hash));
    url = url.substr(0,url.lastIndexOf("/"))+"/static/sprite/sprite";


    var style = "http://172.16.10.101:8887/styles/img.json";

    this.simple =style;
    console.log(this.simple);
    this.initMapBox = function () {
        scope.map = new mapboxgl.Map({
            container: 'map_con',
            style: scope.simple,
            zoom: 0,
            center: [115.3750026759328,39.916660402236516]
        });
    };
    //**
    //sourceType: vector, raster, raster-dem, geojson, image, video, canvas.
    //layerType:background, fill, line, symbol, raster, circle, fill-extrusion, heatmap, hillshade.
    //**
    this.addMapboxLayer = function (options) {
        switch(options.sourceType)
        {
            case"raster":
                addGeojsonSource(options);
                break;
            case"vector":
                addGeojsonSource(options);
                break;
            case "geojson":
                addGeojsonSource(options);
                break;
            case"image":
                addImageSource(options);
                break;
            case "icon":
                addIconSource(options);
                break;
        }
        switch(options.layerType)
        {
            case "fill":
                addFillLayer(options);
                break;
            case"line":
                addLineLayer(options);
                break;
            case"symbol":
                addSymbolLayer(options);
                break;
            case"raster":
                addRasterLayer(options);
                break;
        }
    };
    function removeMapboxSource(options) {
      if(scope.map.getSource(options.sourceId)){
        for (const layerId in scope.map.style._layers) {
          if (scope.map.style._layers[layerId].source === options.sourceId) {
            scope.map.removeLayer(layerId);
          }
        }
        scope.map.removeSource(options.sourceId);
      }
    }
    function addGeojsonSource(options) {
      removeMapboxSource(options);
        scope.map.addSource(options.sourceId, {
            type: options.sourceType,
            data: options.url
        });
    }
    function addIconSource(options) {
      removeMapboxSource(options);
        scope.map.addSource(options.sourceId,{
           "type":"geojson",
           "data":options.data
        });
    }
    function addImageSource(options) {
      removeMapboxSource(options);
        scope.map.addSource(options.sourceId, {
            "type": options.sourceType,
            "url": options.url,
            "coordinates": options.coordinates
        });
    }

    function addFillLayer(options) {
        console.log(options.layerId);
        if(typeof options.layerId == 'string')
        {
            scope.map.addLayer({
                "id" :options.layerId,
                "type": options.layerType,
                "source": options.sourceId,
                "layout": {
                    "visibility": "visible"
                },
                'paint': {
                    'fill-color': options.color,
                }
            });
        }
        else {
            for (var i =0 ;i<options.filters.length;i++)
            {
                scope.map.addLayer({
                    "id" :"isv"+i,
                    "type": options.layerType,
                    "source": options.sourceId,
                    "layout": {
                        "visibility": "visible"
                    },
                    "filter":options.filters[i],
                    'paint': {
                        'fill-color': options.colors[i],
                    }
                });
            }
        }

    }
    function addLineLayer(options) {
        scope.map.addLayer({
            "id" :options.layerId,
            "type": options.layerType,
            "source": options.sourceId,
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            'paint': {
                'line-color': options.color,
                "line-width": 1
            },
            "filter": options.filters

        });
    }
    function addSymbolLayer(options) {
        var layerStyle = {
            "id" :options.layerId,
            "type": options.layerType,
            "source": options.sourceId,
            'layout': {
                'icon-image': '{iconUrl}',
                "icon-allow-overlap":true,
                "icon-ignore-placement":true
            }
        };
        scope.map.addLayer(layerStyle);
        let features = options.data.features;
        features.forEach((marker) => {
            scope.map.setLayoutProperty(options.layerId, 'icon-rotate', {'type':'identity','property':'angle'});
        });
    }
    function addRasterLayer(options) {
        scope.map.addLayer({
            "id" :options.layerId,
            "type": options.layerType,
            "source": options.sourceId,
            "layout": {
                "visibility": "visible"
            },
            "paint": {"raster-opacity": 0.85}
        });
    }

    this.deleteMapboxLayer = function (layerId) {
        scope.map.removeLayer(layerId);
    };
};

