import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
  state: {
    Synthesis: {
      loadUrl: ''
    },
    //请求地址
    apiUrl: {
      pre_url: 'http://172.16.10.101:9116/service/getfactors?param=%E9%99%8D%E6%B0%B4', //获取未来小时
      syn_url: 'http://172.16.10.102:8001/service/weather/v1/factors/getfactorinfo', //获取气象要素
      fac_url: 'http://172.16.10.102:8001/service/weather/v1/processdata/getdatainfo', //获取气象数据信息
      wea_dataDown: 'http://172.16.10.102:8001/service/weather/v1/download/getdataload', //获取气象数据下载
    },

    //主界面控制tab显示隐藏
    Livedatashow:true,//实况分析
    Valuedatashow:true,//数值预报
    imagedatashow:true,//图形图像
    Hisdatashow:true,//历史天气
    Tropicaldatashow:true,//热带气旋
    Disaterdatashow:true,//灾害天气
    Forecastdatashow:true,//预报产品
    opsupportdatashow:true,//作战保障
    Climatedatashow:true,//气候产品


    //子界面tab标签颜色更改
    weatherlistIndex:'',//项目子选项tab标签切换更改颜色
    colorIndex:'',//数值预报tab标签切换更改颜色值
    groundcolorIndex:'',//地面实况tab标签切换更改颜色值
    imagescolorIndex:'',//地面实况tab标签切换更改颜色值

    //地面实况模块定义的全局变量
    showelementbox:false,//单站实况中分析要素弹出框

    //数值预报模块定义的全局变量
    timeValue:'',//界面时间变更
    geojson: '',//解析数据
    graphType: [],//渲染类型
    layerName:"",//监听添加图层的方法
    elementType:"",//监听要素类型
    level:"",//监听气压层层级选择
    layerId:"",//监听layerId的变化
    show:true,//监听该值渲染数据源
    // geoJsonUrl: "",
    geoJsonUrl:[],//子界面传到主界面的图层id
    chufa:false,//监听该值清除图层
    showTo:false,
    showExchange:'',//层级切换展示

    //热带气旋模块定义的全局变量
    tropical:{
      clearImage:'',
      imagePlay:'',
    },
    tropicalshow:false,

    dataValue:"",
    liveAnalysisStatus:false,
    liveAnalysisDataValue:"",
    //封装时间左右切换的方法
    formatDate(date) { //时间格式转换
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    PreTime(timeValue){
      var s_value = timeValue.split("-");
      var td1 = new Date(s_value[0], s_value[1] - 1, s_value[2]);
      var d1 = td1.setDate(td1.getDate() - 1);
      var date_value = new Date(d1)
      var _timeValue =this.formatDate(date_value);
      return _timeValue;
    },
    NextTime(timeValue){
      var s_value = timeValue.split("-");
      var td1 = new Date(s_value[0], s_value[1] - 1, s_value[2]);
      var d1 = td1.setDate(td1.getDate() + 1);
      var date_value = new Date(d1)
      var _timeValue =this.formatDate(date_value);
      return _timeValue;
    }
  }
})
