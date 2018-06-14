(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.PIE = {})));
}(this, (function (exports) { 'use strict';

	// Polyfills

	if ( Number.EPSILON === undefined ) {

		Number.EPSILON = Math.pow( 2, - 52 );

	}

	if ( Number.isInteger === undefined ) {

		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger

		Number.isInteger = function ( value ) {

			return typeof value === 'number' && isFinite( value ) && Math.floor( value ) === value;

		};

	}

	//

	if ( Math.sign === undefined ) {

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign

		Math.sign = function ( x ) {

			return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;

		};

	}

	if ( 'name' in Function.prototype === false ) {

		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name

		Object.defineProperty( Function.prototype, 'name', {

			get: function () {

				return this.toString().match( /^\s*function\s*([^\(\s]*)/ )[ 1 ];

			}

		} );

	}

	if ( Object.assign === undefined ) {

		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

		( function () {

			Object.assign = function ( target ) {

				if ( target === undefined || target === null ) {

					throw new TypeError( 'Cannot convert undefined or null to object' );

				}

				var output = Object( target );

				for ( var index = 1; index < arguments.length; index ++ ) {

					var source = arguments[ index ];

					if ( source !== undefined && source !== null ) {

						for ( var nextKey in source ) {

							if ( Object.prototype.hasOwnProperty.call( source, nextKey ) ) {

								output[ nextKey ] = source[ nextKey ];

							}

						}

					}

				}

				return output;

			};

		} )();

	}

	function EventDispatcher() {}

	Object.assign( EventDispatcher.prototype, {

	    addEventListener: function ( type, listener ) {

	        if ( this._listeners === undefined ) this._listeners = {};

	        var listeners = this._listeners;

	        if ( listeners[ type ] === undefined ) {

	            listeners[ type ] = [];

	        }

	        if ( listeners[ type ].indexOf( listener ) === - 1 ) {

	            listeners[ type ].push( listener );

	        }

	    },

	    hasEventListener: function ( type, listener ) {

	        if ( this._listeners === undefined ) return false;

	        var listeners = this._listeners;

	        return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

	    },

	    removeEventListener: function ( type, listener ) {

	        if ( this._listeners === undefined ) return;

	        var listeners = this._listeners;
	        var listenerArray = listeners[ type ];

	        if ( listenerArray !== undefined ) {

	            var index = listenerArray.indexOf( listener );

	            if ( index !== - 1 ) {

	                listenerArray.splice( index, 1 );

	            }

	        }

	    },

	    dispatchEvent: function ( event ) {

	        if ( this._listeners === undefined ) return;

	        var listeners = this._listeners;
	        var listenerArray = listeners[ event.type ];

	        if ( listenerArray !== undefined ) {

	            event.target = this;

	            var array = listenerArray.slice( 0 );

	            for ( var i = 0, l = array.length; i < l; i ++ ) {

	                array[ i ].call( this, event );

	            }

	        }

	    }

	} );

	//require
	/***
	 *
	 * @author yqq
	 */
	function Mapbox() {
	    EventDispatcher.call(this);
	    this.map = null;
	    this.style={
	        "version": 8,
	        "name": "Klokantech Basic",
	        "metadata": {
	            "mapbox:autocomposite": false,
	            "mapbox:type": "template",
	            "maputnik:renderer": "mbgljs"
	        },
	        "center": [8.54806714892635, 47.37180823552663],
	        "zoom": 12.241790506353492,
	        "bearing": 0,
	        "pitch": 0,
	        "sources": {},
	        "glyphs": "fonts/{fontstack}/{range}.pbf",
	        "layers":[{"id":"background","type":"background","paint":{"background-color":"#A7C2DF"}}]
	    };
	    var self = this;
	    this.defaultSettings = {
	        center: [0,0],
	        zoom:0,
	        container:'map',
	        style:self.style,
	    };
	    this.mapSources = [];
	    this.layers = [];

	}
	Mapbox.prototype =Object.assign(Object.create(EventDispatcher.prototype),{
	    changeStyles:function (options) {
	        var self = this;
	        for(var pro in options) {
	            if(pro == "container"){
	                self.defaultSettings.container = options[pro];
	            }
	            if(pro == "zoom"){
	                self.defaultSettings.zoom = options[pro];
	            }
	            if(pro == "center"){
	                self.defaultSettings.center = options[pro];
	            }
	            if(pro == "type"){
	                self.defaultSettings.type = options[pro];
	            }
	            if(pro == "sprite"){
	                self.defaultSettings.style.sprite = options[pro];
	            }
	            if(pro == "glyphs"){
	                self.defaultSettings.style.glyphs = options[pro];
	            }
	        }
	    },
	    initMap:function () {
	        var self = this;
	        self.map = new mapboxgl.Map(self.defaultSettings);
	        return self.map;
	    },
	    innerSource:function (source) {
	        var self = this;
	        if(!source) {console.error("数据源错误");return;}
	        if(self.map.getSource(source.id)){
	            self.map.getSource(source.id).setData(source.source.data);
	        }else{
	            self.map.addSource(source.id,source.source);
	        }
	    },
	    EventListener:function(layer){
	        var self = this;
	        layer.addEventListener("source",function (e) {
	            console.log(e);
	            console.log( self.map.getSource(layer.source.id));
	            if(layer.type == "rasterLayer"){
	                self.map.getSource(layer.source.id).url = e.data;
	            }else{
	                self.map.getSource(layer.source.id).setData(e.data);
	            }

	        });

	        layer.addEventListener("visible",function (e) {
	            self.map.setLayoutProperty(layer.id, 'visibility', e.visible);
	        });
	        layer.addEventListener("opacity",function (e) {
	            console.log(layer.id,layer.layer.type+'-opacity');
	            console.log(e.target.layer.type);
	            self.map.setPaintProperty(layer.id, e.target.layer.type+'-opacity', e.opacity);
	        });
	        this.layers.push(layer);
	    },
	    addSource:function(id,obj){
	        var self = this;
	        if (!self.map.getSource(id)) {
	            var r = self.map.addSource(id, obj);
	            self.mapSources.push(id);
	            return r;
	        } else {
	            return false;
	        }
	    },
	    addLayer:function (obj,layerId) {
	        var self = this;
	        if (!self.map.getLayer(obj.id)) {
	            var r = self.map.addLayer(obj, layerId);
	            this.layers.push(r);
	            return r;
	        } else {
	            return false;
	        }
	    },
	    add:function (layer) {
	        var self = this;
	        console.log("add"+layer.type);
	        self.EventListener(layer);
	        if(layer.type == "Graphics"){
	            this.innerSource(layer.source);
	            self.map.addLayer(layer.layer);
	        }else if(layer.type == "GraphicsLayer"){
	            for(var i=0;i< layer.graphics.length;i++){
	                self.add(layer.graphics[i]);
	            }
	        }else if(layer.type == "VectorTileLayer"){
	            if(layer.style == ""){
	                layer.addEventListener("load",function () {
	                    self.map.setStyle(layer.style);
	                });
	            }
	        }else{
	            if(layer.source){
	                self.innerSource(layer.source);
	                self.map.addLayer(layer.layer);
	            }else{
	                layer.addEventListener("load",function () {
	                    self.innerSource(layer.source);
	                    console.log("llll");
	                    self.map.addLayer(layer.layer);
	                });

	            }
	        }
	    },
	    remove:function (layer) {
	        var self = this;
	        self.map.removeLayer(layer.id);
	    },
	    findLayerById:function (layerId) {
	        for(var i =0 ;i< this.layers.length;i++){
	            if(this.layers[i].id == layerId){
	                return this.layers[i];
	            }
	        }

	    },
	    getLayer:function (layerId) {
	        for(var i =0 ;i< this.layers.length;i++){
	            if(this.layers[i].id == layerId){
	                return this.layers[i];
	            }
	        }
	    },
	    moveLayer:function (layer,beforelayer) {
	        var self = this;
	        self.map.moveLayer(layer.id,beforelayer.id);
	    },
	    queryRenderedFeatures:function (point,layer) {
	            var temp =this.map.queryRenderedFeatures(point,{layers:[layer.id]});

	            return temp

	    },
	    getCenter:function () {
	            return this.map.getCenter();
	    },
	    setCenter:function (lnglat) {
	      this.map.setCenter(lnglat);
	    },
	    getZoom:function () {
	        return this.map.getZoom();
	    },
	    setZoom:function (index) {
	        this.map.setZoom(index);
	    },
	    getBounds:function () {
	        return this.map.getBounds();
	    },

	});

	function Collection() {
	    this.length =0;
	    this.array = [];
	}
	Collection.prototype = {
	    add:function (Layer) {
	        this.array.push(Layer);
	    },
	    clone:function(){

	    },
	    remove:function () {

	    }
	};

	function BaseMap() {
	    this.id = "";
	    this.baseLayers = [];
	    this.title = "";
	}
	BaseMap.prototype = function () {

	};

	/***
	 *
	 * @param options
	 * @author yqq
	 */
	function Map$1(options) {

	        this.mapbox = new Mapbox();
	        this.map ;
	        this.defaultSettings = {
	            type:1
	        };
	        this.basemap = new BaseMap() || options.baseMap;
	        this.layers =new Collection();

	}
	Map$1.prototype = {

	        initMap:function () {
	            console.log("initMap");
	            var self = this;
	            if(self.defaultSettings.type == 1)
	            {
	               self.map =self.mapbox.initMap();
	            }else{

	            }
	        },
	        addSource:function(id,obj){
	            var self = this;
	            if(self.defaultSettings.type == 1)
	            {
	                return self.mapbox.addSource(id,obj);
	            }
	        },
	        addLayer:function (obj,layerId) {
	            var self = this;
	            if(self.defaultSettings.type == 1)
	            {
	                return  self.mapbox.addLayer(obj,layerId);
	            }
	        },
	        add : function(layer) {
	            console.log("add");
	            var self = this;
	            if(self.defaultSettings.type == 1)
	            {
	                self.mapbox.add(layer);
	            }else{

	            }
	        },
	        addMany : function (layers) {
	            console.log("addMany");
	            var self = this;
	            for(var i=0;i<layers.length;i++){
	                if(self.defaultSettings.type == 1)
	                {
	                    self.mapbox.add(layers[i]);
	                }else{

	                }
	            }

	        },
	        remove : function (layer) {
	            console.log("remove");
	            var self = this;
	            if(this.defaultSettings.type == 1) {
	                self.mapbox.remove(layer);
	            }
	        },
	        removeMany:function (layers) {
	            console.log("removeMany");
	            var self = this;
	            for(var i=0;i<layers.length;i++){
	                if(self.defaultSettings.type == 1)
	                {
	                    self.mapbox.remove(layers[i]);
	                }else{

	                }
	            }
	        },
	        removeAll : function() {

	        },
	        findLayerById:function(id) {
	            if(this.defaultSettings.type == 1){
	                return this.mapbox.findLayerById(id);
	            }

	        },
	        getLayer:function(id) {
	            if(this.defaultSettings.type == 1){
	                return this.mapbox.getLayer(id);
	            }

	        },
	        moveLayer:function (layer,beforelayer) {
	            if(this.defaultSettings.type == 1){
	                this.mapbox.moveLayer(layer,beforelayer);
	            }
	        },
	        on:function(type,listen){
	            var self = this;
	            self.map.on(type,listen);
	        },
	        off:function (type,listen) {
	            var self = this;
	            self.map.off(type,listen);
	        },
	        on:function(type,layer,listen){
	            var self = this;
	            self.map.on(type,layer,listen);
	        },
	        off:function (type,layer,listen) {
	            var self = this;
	            self.map.off(type,layer,listen);
	        },
	        queryRenderedFeatures:function (point,layer) {
	            if(this.defaultSettings.type == 1){
	               return this.mapbox.queryRenderedFeatures(point,layer);
	            }
	        },
	        getCenter:function(){
	            if(this.defaultSettings.type == 1){
	                return this.mapbox.getCenter();
	            }
	        },
	        getZoom:function () {
	            if(this.defaultSettings.type == 1){
	                return this.mapbox.getZoom();
	            }
	        },
	        setZoom:function (index) {
	            if(this.defaultSettings.type == 1){
	                return this.mapbox.setZoom(index);
	            }
	        },
	        getBounds:function () {
	            if(this.defaultSettings.type == 1){
	                return this.mapbox.getBounds();
	            }
	        }
	    };

	/***
	 *
	 * @param parameters
	 * @author yqq
	 */
	function View(parameters) {

	    parameters = parameters || {};
	    this.type = "View";
	    this.container = parameters.container !== undefined ? parameters.container : document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
	    this.graphics = parameters.graphics !== undefined ? parameters.graphics : new Collection();
	    this.map = parameters.Map !== undefined ? parameters.Map : new Map();
	}
	View.prototype ={


	};

	/***
	 *
	 * @param options
	 * @author yqq
	 */
	var layerId = 1;

	function Layer(options) {
	    EventDispatcher.call(this);
	    options = options || {};
	    this.id = options.id !== undefined ? options.id : "Layer"+layerId ++;
	    this.style = options.style !== undefined ? options.style : "";
	    this.data = options.data !== undefined ? options.data : "";
	    this.opacity = options.opacity !== undefined ? options.opacity : 1;
	    this.visible = options.visible !== undefined ? options.visible : true;

	}
	Layer.prototype = Object.assign(Object.create(EventDispatcher.prototype),{
	    initData:function (options) {
	        var self = this;
	       if(options.visible == "none" || options.visible == false){
	            this.visible = "none";
	        }else if(options.visible == "visible" || this.visible == true||options.visible == true){
	            this.visible = "visible";
	        }
	        if(options.color !== undefined && options.color){
	            this.color = options.color;
	        }
	        else{
	            this.color = "";
	        }

	        if(this.url !== ""){
	            this.getData(this.url)
	                .then(
	                     function(_this){
	                         _this.handleData(_this);
	                         self.initLayer(self.data);
	                         console.log("jjjj");
	                         self.setLoad();
	                    });
	            //this.initLayer(this.url);
	        }
	        if(this.data !== ""){
	            if(typeof( this.data) == "string"){
	                this.getData(this.data).then(
	                    function(_this){
	                        _this.handleData(_this);
	                        self.initLayer(self.data);
	                        console.log("jjjj");
	                        self.setLoad();
	                    });
	            }else{
	                this.handleData(this);
	                self.initLayer(self.data);
	                console.log("jjjj");
	                self.setLoad();
	            }
	        }

	    },
	    setVisible:function(visible){
	        if(visible){
	            this.dispatchEvent({type: "visible",visible:"visible"});
	        }else{
	            this.dispatchEvent({type: "visible",visible: "none"});
	        }
	    },
	    setOpacity:function(opacity){
	        this.dispatchEvent({type: "opacity",opacity:opacity});
	    },
	    setLoad:function () {
	        this.dispatchEvent({type:"load"});
	    },
	    setSource:function (data) {
	        var self = this;
	        if(self.type == "rasterLayer"){
	            self.dispatchEvent({type: "source",data:data});
	        }else{
	            if(typeof (data )== "string"){
	                this.getData(data).then(function (self) {
	                    self.handleData(self);
	                    self.dispatchEvent({type: "source",data:self.data});
	                });
	            }else{
	                self.data =data;
	                self.handleData(self);
	                self.dispatchEvent({type: "source",data:self.data});
	            }
	        }


	    },
	    /*getDataSource:function () {
	        this.dispatchEvent({type: "opacity",opacity:opacity});
	    },*/
	    getData : function (url) {

	        var self = this;
	        return new Promise( (resolve,reject) =>{
	            const xhr = new XMLHttpRequest();
	        //xhr.open("GET","http://"+url, true);
	        xhr.open("GET",url, true);
	        xhr.onload = () => {
	            if (xhr.status == 200 ) {
	                var result = JSON.parse(xhr.response);
	                if (result.length === 0) {
	                    console.log('数据读取失败');
	                    reject('数据读取失败');
	                    return false;
	                }
	                self.data = result;
	                resolve(self);
	            } else {
	                reject(xhr.statusText);
	            }

	        };
	        xhr.onerror = function () {
	            reject(xhr.statusText);
	        };
	        xhr.send(null);
	    })
	    }
	});

	/***
	 *
	 * @param options
	 * @author yqq
	 */
	function GraphicsLayer(options) {
	    Layer.call(this);
	    this.type = "GraphicsLayer";
	    options = options || {};
	    this.map = options.map !== undefined ? options.map : "";
	    this.graphics = options.graphics !== undefined ? options.graphics : [];

	}

	GraphicsLayer.prototype = Object.assign(Object.create(Layer.prototype),{
	    add: function(graphics) {
	        this.graphics.push(graphics);
	        console.log(graphics);
	        for(var i= 0;i<this.graphics.length;i++)
	        {
	            if(this.map!= ""){
	                this.map.add(graphics);
	            }

	        }

	    },
	    addMany:function (graphics) {
	        for(var i=0;i<graphics.length;i++){
	            this.graphics.push(graphics[i]);
	            this.map.add(graphics[i]);
	        }

	    },
	    toJSON:function () {

	    }
	});

	/***
	 *
	 * @param parameters
	 * @author yqq
	 */
	function MapView(parameters) {
	    View.call(this);
	    this.type = "MapView";
	    parameters = parameters || {};
	    this.container = parameters.container !== undefined ? parameters.container : document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
	    this.map = parameters.map !== undefined ? parameters.map : new Map$1();
	    this.graphics = parameters.graphics !== undefined ? parameters.graphics : new GraphicsLayer({map:this.map});
	   /* this.center = parameters.center !== undefined ? parameters.center : [0,0];
	    this.zoom = parameters.zoom !== undefined ? parameters.zoom : 0;
	    this.style = parameters.style !== undefined ? parameters.style : simple;
	    this.extent = parameters.extent !== undefined ? parameters.extent : "";
	    this.sprite = parameters.sprite !== undefined ? parameters.sprite : "";*/
	    this.initMap(parameters);
	}
	MapView.prototype  = Object.assign( Object.create( View.prototype ), {
	    initMap:function (options) {
	      if(this.map.defaultSettings.type ==1)
	      {
	          this.map.mapbox.changeStyles(options);
	          this.map.initMap();
	      }
	    },
	    getZoom:function() {
	        if(this.map.defaultSettings.type ==1)
	        {
	            return this.map.mapbox.getZoom()
	        }
	    },
	    setZoom:function() {

	    },
	    getCenter:function() {
	        if(this.map.defaultSettings.type ==1)
	        {
	           return this.map.mapbox.getCenter()
	        }
	    },
	    setCenter:function() {

	    },
	    getVisible:function() {
	        return this.visible;
	    },
	    setVisible:function() {

	    },
	    getExtent:function() {
	        return this.extent;
	    },
	    setExtent:function() {

	    },
	    getStyle:function() {
	        return this.style;
	    },
	    setStyle:function() {

	    },
	    getGraphics:function() {
	        return this.graphics;
	    },
	    setGraphics:function() {

	    }
	});

	/***
	 *
	 * @param options
	 * @author yqq
	 */
	function VectorTileLayer(options) {
	    Layer.call(this);
	    options = options || {};
	    this.type = "VectorTileLayer";
	    this.url = options.url !== undefined ? options.url:"";
	    this.style = options.style !== undefined ? options.style : "";
	    this.title = options.title !== undefined ?options.title:"";
	    this.sprite = options.sprite !== undefined ?options.sprite:"";
	    this.minScale = options.minScale !== undefined ? options.minScale : 0;
	    this.maxScale = options.maxScale !== undefined ? options.maxScale : 0;
	    this.getData( this.url).then(this.addStyle);
	}

	VectorTileLayer.prototype =Object.assign(Object.create(Layer.prototype),{

	    addStyle:function (self) {
	        console.log(self);
	        if(self.sprite == ""){

	        }else{
	            self.data.sprite = self.sprite;
	        }
	        self.style = self.data;
	        self.setLoad();
	    }
	});

	/***
	 *
	 * @param options
	 * @author yqq
	 */
	var gridTileLayer =1;
	function GridTileLayer(options) {
	    Layer.call(this);

	    options = options || {};
	    this.type = "GridTileLayer";
	    this.url = options.url !== undefined ? options.url : "";
	    this.tileSize = options.tileSize !== undefined ?options.tileSize : 256;
	    this.id = options.id !== undefined ?options.id : "gridTileLayer"+gridTileLayer++;
	    this.opacity = options.opacity !== undefined ? options.opacity : 1;
	    if(this.url != ""){
	        this.initLayer();
	    }
	    else{
	        this.source = false;
	    }

	}
	GridTileLayer.prototype =Object.assign(Object.create(Layer.prototype),{
	    initLayer:function () {
	        this.source= {
	            "id":this.id,
	            "source":{
	                "type":"raster",
	                "tiles": [this.url],
	                "tileSize":this.tileSize
	            }
	        };
	        this.layer = {
	            "id": this.id,
	            "type": "raster",
	            "source": this.id,
	            'paint':{"raster-opacity":this.opacity}
	        };
	    }
	});

	var geometryId = 1;
	function Geometry() {
	    Object.defineProperty( this, 'id', { value: "Geometry"+geometryId ++ } );
	    this.type = "Geometry";
	    this.extent="";
	    this.spatialReference= "WDS";

	}

	Geometry.prototype =  {
	      clone:function () {
	    
	      },
	      toJSON:function () {
	          if(this.type == "Point"){
	              var data ={
	                  "type": "FeatureCollection",
	                  "features": [{
	                      "type": "Feature",
	                      "geometry": {
	                          "type": "Point",
	                          "coordinates": [this.x, this.y]
	                      }
	                  }]
	              };
	              return data;
	          }else if(this.type == "Line"){

	              var data ={
	                  "type": "FeatureCollection",
	                  "features": []
	              };
	              if(this.PolyLine) {
	                  for (var i = 0; i < this.path.length; i++) {
	                      var line = {  "type": "Feature",
	                          "geometry": {
	                              "type": "LineString",
	                              "coordinates":[]}
	                      };
	                      for (var j = 0; j < this.path[i].length; j++) {
	                          line.geometry.coordinates.push(this.path[i][j]);
	                      }
	                      data.features.push(line);
	                  }
	              }
	              else{
	                  var line = {  "type": "Feature",
	                      "geometry": {
	                          "type": "LineString",
	                          "coordinates":[]}
	                  };
	                  for (var i = 0; i < this.path.length; i++) {
	                      line.geometry.coordinates.push(this.path[i]);
	                  }
	                  data.features.push(line);
	              }

	              return data;
	          }else if(this.type == "Polygon"){

	              var data ={
	                  "type": "FeatureCollection",
	                  "features": []
	              };
	              if(this.Polygon){
	                  for (var i = 0; i < this.path.length; i++) {
	                      var Polycount = this.path[i].length;
	                      var polygon = {  "type": "Feature",
	                          "geometry": {
	                              "type": "Polygon",
	                              "coordinates":[]}
	                      };

	                      polygon.geometry.coordinates.push(this.path[i]);
	                      data.features.push(polygon);
	                  }
	              }else{
	                  var polygon = {  "type": "Feature",
	                      "geometry": {
	                          "type": "Polygon",
	                          "coordinates":[]}
	                  };
	                  polygon.geometry.coordinates.push(this.path);
	                  data.features.push(polygon);

	              }



	              return data;
	          }
	      },
	      fromJSON:function () {
	          
	      }
	};

	/***
	 *
	 * @author yqq
	 */
	function Symbol() {
	    this.type ="Symbol";
	}
	Symbol.prototype={
	    fromJSON:function () {
	        
	    },
	    toJSON:function () {
	        if(this.type=="MarketSymbol"){
	             return {
	                "type":"circle",
	                "paint":{
	                    "circle-radius": this.size,
	                    "circle-color": "#"+this.color.getHexString()
	                },
	                "layout":{

	                }
	            }

	        }else if(this.type=="LineSymbol"){
	            return{
	                "type":"line",
	                "paint":{
	                    "line-width": this.width,
	                    "line-color": "#"+this.color.getHexString()
	                },
	                "layout":{
	                    "line-join": "round",
	                    "line-cap": "round"
	                }
	            }

	        }else if(this.type=="FillSymbol"){
	            return {
	                "type":"fill",
	                "paint":{
	                    "fill-opacity": this.opacity,
	                    "fill-color": "#"+this.color.getHexString()
	                },
	                "layout":{
	                    "visibility": "visible"
	                }
	            }

	        }
	    }
	};

	var _Math = {

		DEG2RAD: Math.PI / 180,
		RAD2DEG: 180 / Math.PI,

		generateUUID: ( function () {

			// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

			var lut = [];

			for ( var i = 0; i < 256; i ++ ) {

				lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 ).toUpperCase();

			}

			return function () {

				var d0 = Math.random() * 0xffffffff | 0;
				var d1 = Math.random() * 0xffffffff | 0;
				var d2 = Math.random() * 0xffffffff | 0;
				var d3 = Math.random() * 0xffffffff | 0;
				return lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
					lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
					lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
					lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];

			};

		} )(),

		clamp: function ( value, min, max ) {

			return Math.max( min, Math.min( max, value ) );

		},

		// compute euclidian modulo of m % n
		// https://en.wikipedia.org/wiki/Modulo_operation

		euclideanModulo: function ( n, m ) {

			return ( ( n % m ) + m ) % m;

		},

		// Linear mapping from range <a1, a2> to range <b1, b2>

		mapLinear: function ( x, a1, a2, b1, b2 ) {

			return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

		},

		// https://en.wikipedia.org/wiki/Linear_interpolation

		lerp: function ( x, y, t ) {

			return ( 1 - t ) * x + t * y;

		},

		// http://en.wikipedia.org/wiki/Smoothstep

		smoothstep: function ( x, min, max ) {

			if ( x <= min ) return 0;
			if ( x >= max ) return 1;

			x = ( x - min ) / ( max - min );

			return x * x * ( 3 - 2 * x );

		},

		smootherstep: function ( x, min, max ) {

			if ( x <= min ) return 0;
			if ( x >= max ) return 1;

			x = ( x - min ) / ( max - min );

			return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

		},

		// Random integer from <low, high> interval

		randInt: function ( low, high ) {

			return low + Math.floor( Math.random() * ( high - low + 1 ) );

		},

		// Random float from <low, high> interval

		randFloat: function ( low, high ) {

			return low + Math.random() * ( high - low );

		},

		// Random float from <-range/2, range/2> interval

		randFloatSpread: function ( range ) {

			return range * ( 0.5 - Math.random() );

		},

		degToRad: function ( degrees ) {

			return degrees * _Math.DEG2RAD;

		},

		radToDeg: function ( radians ) {

			return radians * _Math.RAD2DEG;

		},

		isPowerOfTwo: function ( value ) {

			return ( value & ( value - 1 ) ) === 0 && value !== 0;

		},

		ceilPowerOfTwo: function ( value ) {

			return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

		},

		floorPowerOfTwo: function ( value ) {

			return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

		}

	};

	var ColorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
		'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
		'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
		'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
		'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
		'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
		'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
		'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
		'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
		'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
		'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
		'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
		'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
		'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
		'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
		'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
		'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
		'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
		'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
		'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
		'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
		'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
		'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
		'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

	function Color( r, g, b ) {

		if ( g === undefined && b === undefined ) {

			// r is THREE.Color, hex or string
			return this.set( r );

		}

		return this.setRGB( r, g, b );

	}

	Object.assign( Color.prototype, {

		isColor: true,

		r: 1, g: 1, b: 1,

		set: function ( value ) {

			if ( value && value.isColor ) {

				this.copy( value );

			} else if ( typeof value === 'number' ) {

				this.setHex( value );

			} else if ( typeof value === 'string' ) {

				this.setStyle( value );

			}

			return this;

		},

		setScalar: function ( scalar ) {

			this.r = scalar;
			this.g = scalar;
			this.b = scalar;

			return this;

		},

		setHex: function ( hex ) {

			hex = Math.floor( hex );

			this.r = ( hex >> 16 & 255 ) / 255;
			this.g = ( hex >> 8 & 255 ) / 255;
			this.b = ( hex & 255 ) / 255;

			return this;

		},

		setRGB: function ( r, g, b ) {

			this.r = r;
			this.g = g;
			this.b = b;

			return this;

		},

		setHSL: function () {

			function hue2rgb( p, q, t ) {

				if ( t < 0 ) t += 1;
				if ( t > 1 ) t -= 1;
				if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
				if ( t < 1 / 2 ) return q;
				if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
				return p;

			}

			return function setHSL( h, s, l ) {

				// h,s,l ranges are in 0.0 - 1.0
				h = _Math.euclideanModulo( h, 1 );
				s = _Math.clamp( s, 0, 1 );
				l = _Math.clamp( l, 0, 1 );

				if ( s === 0 ) {

					this.r = this.g = this.b = l;

				} else {

					var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
					var q = ( 2 * l ) - p;

					this.r = hue2rgb( q, p, h + 1 / 3 );
					this.g = hue2rgb( q, p, h );
					this.b = hue2rgb( q, p, h - 1 / 3 );

				}

				return this;

			};

		}(),

		setStyle: function ( style ) {

			function handleAlpha( string ) {

				if ( string === undefined ) return;

				if ( parseFloat( string ) < 1 ) {

					console.warn( 'THREE.Color: Alpha component of ' + style + ' will be ignored.' );

				}

			}


			var m;

			if ( m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec( style ) ) {

				// rgb / hsl

				var color;
				var name = m[ 1 ];
				var components = m[ 2 ];

				switch ( name ) {

					case 'rgb':
					case 'rgba':

						if ( color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

							// rgb(255,0,0) rgba(255,0,0,0.5)
							this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
							this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
							this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

							handleAlpha( color[ 5 ] );

							return this;

						}

						if ( color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

							// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
							this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
							this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
							this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

							handleAlpha( color[ 5 ] );

							return this;

						}

						break;

					case 'hsl':
					case 'hsla':

						if ( color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

							// hsl(120,50%,50%) hsla(120,50%,50%,0.5)
							var h = parseFloat( color[ 1 ] ) / 360;
							var s = parseInt( color[ 2 ], 10 ) / 100;
							var l = parseInt( color[ 3 ], 10 ) / 100;

							handleAlpha( color[ 5 ] );

							return this.setHSL( h, s, l );

						}

						break;

				}

			} else if ( m = /^\#([A-Fa-f0-9]+)$/.exec( style ) ) {

				// hex color

				var hex = m[ 1 ];
				var size = hex.length;

				if ( size === 3 ) {

					// #ff0
					this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 0 ), 16 ) / 255;
					this.g = parseInt( hex.charAt( 1 ) + hex.charAt( 1 ), 16 ) / 255;
					this.b = parseInt( hex.charAt( 2 ) + hex.charAt( 2 ), 16 ) / 255;

					return this;

				} else if ( size === 6 ) {

					// #ff0000
					this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 1 ), 16 ) / 255;
					this.g = parseInt( hex.charAt( 2 ) + hex.charAt( 3 ), 16 ) / 255;
					this.b = parseInt( hex.charAt( 4 ) + hex.charAt( 5 ), 16 ) / 255;

					return this;

				}

			}

			if ( style && style.length > 0 ) {

				// color keywords
				var hex = ColorKeywords[ style ];

				if ( hex !== undefined ) {

					// red
					this.setHex( hex );

				} else {

					// unknown color
					console.warn( 'THREE.Color: Unknown color ' + style );

				}

			}

			return this;

		},

		clone: function () {

			return new this.constructor( this.r, this.g, this.b );

		},

		copy: function ( color ) {

			this.r = color.r;
			this.g = color.g;
			this.b = color.b;

			return this;

		},

		copyGammaToLinear: function ( color, gammaFactor ) {

			if ( gammaFactor === undefined ) gammaFactor = 2.0;

			this.r = Math.pow( color.r, gammaFactor );
			this.g = Math.pow( color.g, gammaFactor );
			this.b = Math.pow( color.b, gammaFactor );

			return this;

		},

		copyLinearToGamma: function ( color, gammaFactor ) {

			if ( gammaFactor === undefined ) gammaFactor = 2.0;

			var safeInverse = ( gammaFactor > 0 ) ? ( 1.0 / gammaFactor ) : 1.0;

			this.r = Math.pow( color.r, safeInverse );
			this.g = Math.pow( color.g, safeInverse );
			this.b = Math.pow( color.b, safeInverse );

			return this;

		},

		convertGammaToLinear: function () {

			var r = this.r, g = this.g, b = this.b;

			this.r = r * r;
			this.g = g * g;
			this.b = b * b;

			return this;

		},

		convertLinearToGamma: function () {

			this.r = Math.sqrt( this.r );
			this.g = Math.sqrt( this.g );
			this.b = Math.sqrt( this.b );

			return this;

		},

		getHex: function () {

			return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

		},

		getHexString: function () {

			return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

		},

		getHSL: function ( optionalTarget ) {

			// h,s,l ranges are in 0.0 - 1.0

			var hsl = optionalTarget || { h: 0, s: 0, l: 0 };

			var r = this.r, g = this.g, b = this.b;

			var max = Math.max( r, g, b );
			var min = Math.min( r, g, b );

			var hue, saturation;
			var lightness = ( min + max ) / 2.0;

			if ( min === max ) {

				hue = 0;
				saturation = 0;

			} else {

				var delta = max - min;

				saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

				switch ( max ) {

					case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
					case g: hue = ( b - r ) / delta + 2; break;
					case b: hue = ( r - g ) / delta + 4; break;

				}

				hue /= 6;

			}

			hsl.h = hue;
			hsl.s = saturation;
			hsl.l = lightness;

			return hsl;

		},

		getStyle: function () {

			return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

		},

		offsetHSL: function ( h, s, l ) {

			var hsl = this.getHSL();

			hsl.h += h; hsl.s += s; hsl.l += l;

			this.setHSL( hsl.h, hsl.s, hsl.l );

			return this;

		},

		add: function ( color ) {

			this.r += color.r;
			this.g += color.g;
			this.b += color.b;

			return this;

		},

		addColors: function ( color1, color2 ) {

			this.r = color1.r + color2.r;
			this.g = color1.g + color2.g;
			this.b = color1.b + color2.b;

			return this;

		},

		addScalar: function ( s ) {

			this.r += s;
			this.g += s;
			this.b += s;

			return this;

		},

		sub: function ( color ) {

			this.r = Math.max( 0, this.r - color.r );
			this.g = Math.max( 0, this.g - color.g );
			this.b = Math.max( 0, this.b - color.b );

			return this;

		},

		multiply: function ( color ) {

			this.r *= color.r;
			this.g *= color.g;
			this.b *= color.b;

			return this;

		},

		multiplyScalar: function ( s ) {

			this.r *= s;
			this.g *= s;
			this.b *= s;

			return this;

		},

		lerp: function ( color, alpha ) {

			this.r += ( color.r - this.r ) * alpha;
			this.g += ( color.g - this.g ) * alpha;
			this.b += ( color.b - this.b ) * alpha;

			return this;

		},

		equals: function ( c ) {

			return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.r = array[ offset ];
			this.g = array[ offset + 1 ];
			this.b = array[ offset + 2 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.r;
			array[ offset + 1 ] = this.g;
			array[ offset + 2 ] = this.b;

			return array;

		},

		toJSON: function () {

			return this.getHex();

		}

	} );

	/***
	 *
	 * @param options
	 * @author yqq
	 */
	function MarketSymbol(options) {
	    Symbol.call( this );
	    this.type="MarketSymbol";
	    options =options||{};
	    this.color=options.color !== undefined ? new Color(options.color):new Color("#ffffff");
	    this.size =options.size !== undefined ? options.size:1;

	}

	MarketSymbol.prototype=Object.assign( Object.create( Symbol.prototype ), {
	    set:function (options) {
	        this.color = new Color("#ffffff")||options.color;
	        this.size = 1 || options.size;
	    },

	    setColor:function (color) {
	        if( color && color.isColor){
	            this.color = color.copy();
	        }else{
	            this.color = new Color(color);
	        }

	    },
	    getColor:function () {
	        return this.color;
	    },
	    setSize:function (number) {
	        this.size = number;
	    },
	    getSize:function () {
	        return this.size;
	    }

	});

	function Point(x,y) {
	    Geometry.call( this );
	    this.type = "Point";
	    this.x = 0||x;
	    this.y = 0||y;
	    if(x instanceof Array){
	        this.x = x[0];
	        this.y = x[1];
	    }

	}

	Point.prototype = Object.assign( Object.create( Geometry.prototype ), {
	    isPoint:true,
	    set: function ( x, y ) {

	        this.x = x;
	        this.y = y;

	        return this;

	    },

	    setX: function ( x ) {

	        this.x = x;

	        return this;

	    },

	    setY: function ( y ) {

	        this.y = y;

	        return this;

	    },

	    getSymbol:function () {
	      return this.Symbol;
	    },
	    setSymbol:function (symbol) {
	        this.Symbol.set(symbol);
	    },

	    equals:function (p) {
	        return ( ( p.x === this.x ) && ( p.y === this.y ));
	    },
	    distance:function (p) {
	        return Math.sqrt( this.distanceToSquared( p ) );
	    },
	    distanceToSquared: function ( p ) {

	        var dx = this.x - p.x, dy = this.y - p.y;

	        return dx * dx + dy * dy ;

	    },
	    normalize:function () {

	    },
	    clone: function () {

	        return new this.constructor( this.x, this.y );

	    },
	    copy:function (p) {
	        this.x = p.x;
	        this.y = p.y;

	        return this;
	    }
	});

	/***
	 *
	 * @param options
	 * @author yqq
	 */
	function LineSymbol(options) {
	    Symbol.call( this );
	    options = options || {};
	    this.type="LineSymbol";
	    this.color= options.color !== undefined ? new Color(options.color) : new Color("#ffffff");
	    this.width =  options.width !==undefined ? options.width:1;

	}

	LineSymbol.prototype=Object.assign( Object.create( Symbol.prototype ), {
	    set:function (options) {
	        this.color = new Color("#ffffff")||options.color;
	        this.width = 1 || options.width;
	    },

	    setColor:function (color) {
	        if( color && color.isColor){
	            this.color = color.copy();
	        }else{
	            this.color = new Color(color);
	        }

	    },
	    getColor:function () {
	        return this.color;
	    },
	    setWidth:function (number) {
	        this.width = number;
	    },
	    getWidth:function () {
	        return this.width;
	    }

	});

	function Line(path) {
	    Geometry.call( this );
	    this.type = "Line";
	    this.path = path;

	    this.PolyLine=multiarr(path);
	    function multiarr(arr){
	        for (var i=0,len=arr.length;i<len;i++)
	            if(arr[i][0] instanceof Array)return true;
	        return false;
	    }
	}

	Line.prototype = Object.assign( Object.create( Geometry.prototype ), {
	    isLine:true,
	    addPath: function ( points ) {
	        this.path = points;
	        return this;

	    },
	    getPoint:function (pathIndex,pointIndex) {
	        return new Point(this.path[pathIndex-1][pointIndex-1]);
	    },
	    insertPoint:function () {

	    },
	    removePath:function () {

	    },
	    removePoint:function () {

	    },
	    getSymbol:function () {
	        return this.Symbol;
	    },
	    setSymbol:function (symbol) {
	        this.Symbol.set(symbol);
	    },
	    setPoint:function () {

	    },
	    clone: function () {

	        return new this.constructor( this.path );

	    },
	    copy:function (p) {
	        this.path = p.path;
	        return this;
	    }
	});

	/***
	 *
	 * @param options
	 * @author yqq
	 */
	function FillSymbol(options) {
	    Symbol.call( this );
	    this.type="FillSymbol";
	    options = options || {};
	    this.color=options.color !== undefined ? new Color(options.color):new Color("#ffffff");
	    this.opacity = options.opacity !== undefined ? options.opacity:1;

	}

	FillSymbol.prototype=Object.assign( Object.create( Symbol.prototype ), {
	    set:function (options) {
	        this.color = new Color("#ffffff")||options.color;
	        this.opacity = 1 || options.opacity;
	    },

	    setColor:function (color) {
	        if( color && color.isColor){
	            this.color = color.copy();
	        }else{
	            this.color = new Color(color);
	        }

	    },
	    getColor:function () {
	        return this.color;
	    },
	    setOpacity:function (number) {
	        this.opacity = number;
	    },
	    getOpacity:function () {
	        return this.opacity;
	    }

	});

	function Polygon(path) {
	    Geometry.call( this );
	    this.type = "Polygon";
	    this.path = path;
	    this.Polygon=multiarr(path);
	    function multiarr(arr){
	        var isResult = false;
	        for (var i=0,len=arr.length;i<len;i++){
	            for(var j = 0,len_j=arr[i].length;j<len_j;j++){
	                if(arr[i][j] instanceof Array)
	                    return true;

	            }
	        }
	        return isResult;
	    }
	}

	Polygon.prototype = Object.assign( Object.create( Geometry.prototype ), {
	    isPolygon:true,
	    addPath: function ( points ) {
	        this.path = points;
	        return this;

	    },
	    getPoint:function (pathIndex,pointIndex) {
	        return new Point(this.path[pathIndex-1][pointIndex-1]);
	    },
	    insertPoint:function () {

	    },
	    removeRing:function (index) {

	    },
	    removePoint:function () {

	    },
	    setPoint:function () {

	    },
	    getSymbol:function () {
	        return this.Symbol;
	    },
	    setSymbol:function (symbol) {
	        this.Symbol.set(symbol);
	    },
	    clone: function () {

	        return new this.constructor( this.path );

	    },
	    copy:function (p) {
	        this.path = p.path;
	        return this;
	    }
	});

	/***
	 *
	 * @param options
	 * @author yqq
	 */
	function Graphics(options) {
	    options = options || {};
	    Layer.call(this);
	    this.attributes = "" || options.attributes;
	    this.geometry = options.geometry !== undefined ? options.geometry : new Geometry();
	    this.symbol = options.symbol !== undefined ? options.symbol : new Symbol();
	    this.type = "Graphics";
	    this.id = this.geometry.id;
	    this.source = {
	        "id":this.id,
	        "source":{
	            "type":"geojson",
	            "data":this.geometry.toJSON()
	        }
	    };
	    this.layer ={
	        "id":this.id,
	        "source":this.id,
	        "paint":this.symbol.toJSON().paint,
	        "type":this.symbol.toJSON().type,
	        "layout":this.symbol.toJSON().layout
	    };
	    this.visible = true || options.visible;

	}
	Graphics.prototype = Object.assign(Object.create(Layer.prototype),{
	    clone:function () {
	        
	    },
	    fromJSON:function () {
	        
	    },
	    getAttribute:function () {
	        
	    },
	    setAttribute:function () {
	        
	    },
	    toJSON:function () {
	        
	    }
	});

	function Paint() {
	    this.type = "fill";
	}

	Paint.prototype = {

	    File_color: {
	        get: function () {

	            return self.file_color;
	        },
	        set:function (value) {
	            this.file_color = value;
	        }
	    },
	    Line_color: {
	        get: function () {
	            return this.line_color;
	        },
	        set:function (value) {
	            this.line_color = value;
	        }
	    },
	    Line_width: {
	        get: function () {
	            return this.line_width;
	        },
	        set:function (value) {
	            this.line_width = value;
	        }
	    },
	    Raster_Opacity:{
	        get: function () {
	            return this.raster_opacity;
	        },
	        set:function (value) {
	            this.raster_opacity = value;
	        }
	    },
	    Raster_Opacity_Transition:{
	        get: function () {
	            return this.raster_opacity_transition;
	        },
	        set:function (value) {
	            this.raster_opacity_transition = value;
	        }
	    }
	};
	Paint.prototype.toJson = function(){
	    var strJson = JSON.stringify(this);
	    var strReplace = "\"type\":"+JSON.stringify(this.type)+",";
	    strJson = strJson.replace(strReplace,"");
	    if(this.type=="line"){
	        strJson = strJson.replace(/line_color/,"line-color");
	        strJson = strJson.replace(/line_width/,"line-width");
	    }else{
	        strReplace = "\"line_color\":"+JSON.stringify(this.line_color)+",";
	        strReplace += "\"line_width\":"+JSON.stringify(this.line_width)+",";
	        strJson = strJson.replace(strReplace,"");
	    }
	    if(this.type=="fill"){
	        strJson = strJson.replace(/fill_color/,"fill-color");
	    }else{
	        strReplace = "\"fill_color\":"+JSON.stringify(this.fill_color)+",";
	        strJson = strJson.replace(strReplace,"");
	    }

	    if(this.type == "raster"){
	        strJson = strJson.replace(/raster_opacity/,"raster-opacity");
	        strJson = strJson.replace(/raster_opacity_transition/,"raster-opacity-transition");
	    }else{
	        strReplace = "\"raster_opacity\":"+JSON.stringify(this.raster_opacity)+",";
	        strReplace = "\"raster_opacity_transition\":"+JSON.stringify(this.raster_opacity_transition)+",";
	        strJson = strJson.replace(strReplace,"");
	    }
	    var strJson = JSON.parse(strJson);
	    return strJson;
	};

	function Filter() {
	    this.filter ="";
	    
	}
	Filter.prototype = {

	};

	var REVISION = '0.01';
	var MetoStyle = {};

	exports.Map = Map$1;
	exports.MapView = MapView;
	exports.Layer = Layer;
	exports.GraphicsLayer = GraphicsLayer;
	exports.VectorTileLayer = VectorTileLayer;
	exports.GridTileLayer = GridTileLayer;
	exports.Geometry = Geometry;
	exports.Point = Point;
	exports.Line = Line;
	exports.Polygon = Polygon;
	exports.Symbol = Symbol;
	exports.MarketSymbol = MarketSymbol;
	exports.LineSymbol = LineSymbol;
	exports.FillSymbol = FillSymbol;
	exports.Math = _Math;
	exports.Color = Color;
	exports.Graphics = Graphics;
	exports.Collection = Collection;
	exports.EventDispatcher = EventDispatcher;
	exports.BaseMap = BaseMap;
	exports.View = View;
	exports.Paint = Paint;
	exports.Filter = Filter;
	exports.REVISION = REVISION;
	exports.MetoStyle = MetoStyle;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
