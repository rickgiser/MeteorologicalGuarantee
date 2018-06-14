/**
 * Created by Administrator on 2017/11/28.
 */

const Config = {};

/*
* 请求文件数据
* */
Config.weatherfileurl = "http://172.16.10.102:7777";
/*
* 设置全要素填图的风格
* */
Config.stationurl = Config.weatherfileurl+"/station/sprite";
/*
* 设置风向杆数据的风格
* */
Config.windpoleurl = Config.weatherfileurl+"/windPole/sprite";
/*
* 动画显示灰度卫星云图
* */
Config.sateliteblackurl = Config.weatherfileurl+"/cloudAtlas/png/";
/*
* 符号标绘服务
* */
Config.ploturl = "http://172.16.50.203:9110";
/*
* 符号标绘绘制面板符号图片下载
* */
Config.plotpicturedownloadurl = Config.ploturl +"/v1/symbol/file/download";

