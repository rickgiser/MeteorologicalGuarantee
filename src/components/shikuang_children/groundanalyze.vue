<template>
    <div class="groundanalyze">

      <!--预报时间-->
      <Row class="forecasetime singlecolor">
        <i-col span="4" class="ground_text">预报时间</i-col>
        <i-col class="datePicker">
          <DatePicker  type="date" :value="timeValue"  confirm  placeholder="选择日期"></DatePicker>
        </i-col>
        <i-col class="selecttime">
          <TimePicker :value="Htime" class="getTime" format="H" placeholder="选择时次"></TimePicker>
        </i-col>
      </Row>

      <ul class="sy-lists">
        <!--数据源选择-->
        <li>
          <Row class="forecasetime singlecolor">
            <i-col span="6" class="ground_text">数据源</i-col>
            <i-col span="6" class="station">
              <Checkbox v-model="platform">地方站台</Checkbox>
            </i-col>
            <i-col span="6" class="station">
              <Checkbox v-model="ations">jun内站台</Checkbox>
            </i-col>
          </Row>
        </li>

        <!--投影方式-->
        <li>
          <Row class="forecasetime singlecolor">
            <i-col span="6" class="ground_text">投影方式</i-col>
            <i-col span="18">
              <i-select size="small">
                <i-option v-for="(item,index) in projectiveMode" :value="item.value" :key="item.value">{{item.label}}</i-option>
              </i-select>
            </i-col>
          </Row>
        </li>

        <!--显示要素-->
        <li>
          <Row class="col_forecasetime elementcolor" id="elementCollapse">
            <i-col span="6" class="ground_text">要素选择</i-col>
            <i-col span="4" class="switch">
              <i-switch v-model="elementswitch" @on-change="elementswitchChange"></i-switch>
            </i-col>
          </Row>
          <Row class="switch_collapse elementcolor" v-show="elementCollapes">
            <div class="sy-elemt">
              <Tooltip :content="item.title" v-for="(item,index) in elementselect" placement="top">
                <i-button class="sy-btn" :key="item.label" @click="groundelementClick(item,index)"><div :class="item.disable? 'iselementActive':'noelementActive'">{{item.label}}</div></i-button>
              </Tooltip>
            </div>
          </Row>
        </li>

        <!--分析内容-->
        <li>
          <Row class="col_forecasetime analyzecolor" id="analyzeCollapse">
            <i-col span="6" class="ground_text">分析内容</i-col>
            <i-col span="4" class="switch">
              <i-switch v-model="analyseswitch" @on-change="analyzeswitchChange"></i-switch>
            </i-col>
          </Row>
          <Row class="switch_collapse analyzecolor" v-show="analyzeCollapes">
            <div class="sy-elemt">
              <i-col v-for="(item,index) in analyzeContent" class="analyze_col">
                <Checkbox-group v-model="analyzeContentshow">
                  <Checkbox :label="item.value" >{{item.label}}</Checkbox>
                </Checkbox-group>
              </i-col>
            </div>
            <div style="padding-left:10px;">
              <i-button class="analyze_button" @click="analysis">分析</i-button>
            </div>
          </Row>
        </li>

        <!--参数设置-->
        <li>
          <Row class="col_forecasetime pressurecolor" id="pressureCollapse">
            <i-col span="6" class="ground_text">参数设置</i-col>
            <i-col span="4" class="switch">
              <i-switch v-model="pressureswitch" @on-change="pressureswitchChange"></i-switch>
            </i-col>
          </Row>
          <Row class="switch_collapse pressurecolor" style="padding-right:10px;" v-show="pressureCollapes">
            <div class="sy-elemt">
              <Row class="line">- - - - - - - - - - - - - - - - - -&nbsp &nbsp等压线参数&nbsp &nbsp- - - - - - - - - - - - - - - - - -</Row>
              <Row class="line_bottom">
                <i-col span="8">
                  <Row align="middle" type="flex">
                    <i-col span="7" class="sy-title-text"><p>间隔</p></i-col>
                    <i-col span="15">
                      <i-input size="small" placeholder="输入"></i-input>
                    </i-col>
                  </Row>
                </i-col>

                <i-col span="8">
                  <Row align="middle" type="flex">
                    <i-col span="7" class="sy-title-text"><p>粗细</p></i-col>
                    <i-col span="15">
                      <i-input size="small" placeholder="输入"></i-input>
                    </i-col>
                  </Row>
                </i-col>

                <i-col span="8">
                  <Row align="middle" type="flex">
                    <i-col span="7" class="sy-title-text"><p>颜色</p></i-col>
                    <i-col span="15">
                      <ColorPicker v-model="color1" size='small' />
                    </i-col>
                  </Row>
                </i-col>
              </Row>
            </div>

            <div class="sy-elemt">
              <Row class="line">- - - - - - - - - - - - - - - - &nbsp &nbsp三小时变压参数&nbsp &nbsp - - - - - - - - - - - - - - - -</Row>
              <Row class="line_bottom">
                <i-col span="8">
                  <Row align="middle" type="flex">
                    <i-col span="7" class="sy-title-text"><p>间隔</p></i-col>
                    <i-col span="15">
                      <i-input size="small" placeholder="输入"></i-input>
                    </i-col>
                  </Row>
                </i-col>

                <i-col span="8">
                  <Row align="middle" type="flex">
                    <i-col span="7" class="sy-title-text"><p>粗细</p></i-col>
                    <i-col span="15">
                      <i-input size="small" placeholder="输入"></i-input>
                    </i-col>
                  </Row>
                </i-col>

                <i-col span="8">
                  <Row align="middle" type="flex">
                    <i-col span="7" class="sy-title-text"><p>颜色</p></i-col>
                    <i-col span="15">
                      <ColorPicker v-model="color1" size='small' />
                    </i-col>
                  </Row>
                </i-col>

                <i-col span="8">
                  <Row align="middle" type="flex">
                    <i-col span="7" class="sy-title-text"><p style="margin-top:11px;">线条</p></i-col>
                    <i-col span="15">
                      <i-select :model.sync="lineStyleSelect" size="small">
                        <i-option v-for="(item,index) in lineStyle" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                      </i-select>
                    </i-col>
                  </Row>
                </i-col>

              </Row>
            </div>
          </Row>
        </li>

        <!-- 图层管理面板 start -->
        <li>
          <Row class="col_forecasetime managecolor" id="manageCollapes">
            <i-col span="6" class="ground_text">图层管理面板</i-col>
            <i-col span="4" class="switch">
              <i-switch v-model="manageswitch" @on-change="manageswitchChange"></i-switch>
            </i-col>
          </Row>
          <Row class="manageswitch_collapse managecolor managebottom" v-show="manageCollapes">
            <div class="ground-elemt" >
              <i-button v-for = "(item,index) in layers" :class="item.disable? 'manageelementclick':'nomanageelementclick'" @click = "manageLayer(item,index)" >{{item.label}}</i-button>
            </div>
          </Row>
        </li>

      </ul>
    </div>
</template>
<script>
  import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
  export default {
    components: {ElIcon}, data() {
      return {
        getanalysisURL:{
          "json":"/groundLive/getGroundLiveDataCoutour?",
          "wind":"/groundLive/getGroundLiveDataWind6Contour?",
          "image":"/groundLive/showStationColorPng?",
        },
        timeValue:'',//选择日期初始值
        Htime:'',//选择时刻初始值
        platform:false,//地方站台
        ations:false,//jun内站台
        projectiveMode:[
          {label:'墨卡托投影1',value:'墨卡托投影1'},
          {label:'墨卡托投影2',value:'墨卡托投影2'},
          {label:'墨卡托投影3',value:'墨卡托投影3'},
          {label:'墨卡托投影4',value:'墨卡托投影4'},
        ],//投影方式选择
        elementswitch:true,//要素开关
        elementCollapes:true,//要素折叠面板
        elementselect:[
          {label:'h',value:'h',title:'云底低于2500米的云底高度',disable:true},
          {label:'vv',value:'VIS',title:'有效水平能见度',disable:true},
          {label:'N',value:'N',title:'总云量',disable:true},
          {label:'Dd',value:'WI',title:'风向(风的来向)',disable:true},
          {label:'Fmfm',value:'WS',title:'平均风速',disable:true},
          {label:'TT',value:'T',title:'气温',disable:true},
          {label:'TdTd',value:'TD',title:'露点温度',disable:true},
          {label:'PPP',value:'SLP',title:'海平面气压',disable:true},
          {label:'a',value:'a',title:'过去三小时气压倾向',disable:true},
          {label:'PP',value:'DP3',title:'三小时气压变量',disable:true},
          {label:'RR',value:'RR',title:'过去六小时内(包括本次观测时)的降水量',disable:true},
          {label:'WW',value:'WW',title:'现在天气现象',disable:true},
          {label:'W1',value:'W1',title:'过去天气现象1',disable:true},
          {label:'W2',value:'W2',title:'过去天气现象2',disable:true},
          {label:'Nh',value:'NH',title:'云底低于2500米的低云或中云的总量',disable:true},
          {label:'Lh',value:'LH',title:'低云高',disable:true},
          {label:'CL',value:'CL',title:'低云状',disable:true},
          {label:'CM',value:'CM',title:'中云状',disable:true},
          {label:'CH',value:'CH',title:'高云状',disable:true}
        ],//要素
        analyseswitch:true,//分析方式开关
        analyzeCollapes:true,//分析方式折叠面板
        analyzeContent:[
          {label:'等压线',value:"SLP"},
          {label:'三小时变压',value:"DP3"},
          {label:'降雨区',value:"RR"},
         /* {label:'雾霾区',value:"wumai"},
          {label:'雷暴区',value:"leibao"},
          {label:'高温区',value:"gaowen"},*/
          {label:'大风区',value:"WS"}],//分析方式
        analyzeContentshow:['SLP'],//分析方式复选框初始值
        pressureswitch:true,//参数设置开关
        pressureCollapes:true,//参数设置折叠面板
        lineStyleSelect:'',//线条样式
        lineStyle:[
          {label:'实线',value:'solid'},
          {label:'虚线',value:'dotted'},
        ],//线条样式内容
        color1:'#ff0000',//颜色默认值
        manageswitch:true,//图层管理开关样式
        manageelementswitch:false,//图层管理开关样式
        manageCollapes:true,//图层管理折叠面板
        layerIDs:[],
        layers:[]
      }
    },
    methods:{
      manageLayer(item){
        console.log(item);
        item.disable = !item.disable;
        if(item.disable){
          this.$store.state.liveAnalysisDataValue = {
            show:[{
              id:item.value,
            }]
          }
        }else{
          this.$store.state.liveAnalysisDataValue = {
            hide:[{
              id:item.value,
            }]
          }
        }
        this.$store.state.liveAnalysisStatus = true;
      },
      addLayerManage(id,type){
        var temp = {
          label:id,
          value:id,
          disable:true,
        };
        this.layers.push(temp)
      },
      getUrlFormat(element){
        var temp ;
        if(element=="RR"){
          temp = this.getanalysisURL.image;
        }else if(element == "WS"){
          temp = this.getanalysisURL.wind;
        }else{
          temp = this.getanalysisURL.json;
        };

        var url =DatapostUrl+
          temp +
          "params=date:2018-01-02," +
          "type:liveInfo_ground," +
          "span:5.0," +
          "level:999," +
          "element:"+element;
        if(element == "WS"){
          url += ",WI:11";
        }
        return url;
      },
      getAnalysisLayerId(id){
        for (var i=0;i<this.layerIDs.length;i++){
          if(id==this.layerIDs[i])
            return true;
        }
        return false;
      },
      analysis(){
        this.$store.state.liveAnalysisDataValue = {
          addAnalyze:[]
        }
        console.log(this.analyzeContentshow);
        var analyzeDatas = this.analyzeContentshow;
        for(var i=0;i<analyzeDatas.length;i++){
          var url = this.getUrlFormat(analyzeDatas[i]);
          var id =  analyzeDatas[i];
          if(url && !this.getAnalysisLayerId(id)){
            var temp = {
              url: url,
              id:id,
              type:analyzeDatas[i]
            };
            this.layerIDs.push(id);
            this.addLayerManage(id,analyzeDatas[i]);
            this.$store.state.liveAnalysisDataValue.addAnalyze.push(temp);
          }
        }
        this.$store.state.liveAnalysisStatus = true;
      },
      groundelementClick(item,index){
        console.log(item);
        item.disable = !item.disable;
        if(item.disable){
          this.$store.state.liveAnalysisDataValue = {
            show:[{
              id:"ground_"+item.value,
            }]
          }
        }else{
          this.$store.state.liveAnalysisDataValue = {
            hide:[{
              id:"ground_"+item.value,
            }]
          }
        }
        this.$store.state.liveAnalysisStatus = true;
      },
      elementswitchChange(status) {
        var col_title = $("#elementCollapse");
        if(status == true){
            this.elementCollapes = true;
            col_title.css("border-bottom-left-radius","0px")
            col_title.css("border-bottom-right-radius","0px")
        }else{
          this.elementCollapes = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      },//要素开关点击方法
      analyzeswitchChange(status) {
        var col_title = $("#analyzeCollapse");
        if(status == true){
          this.analyzeCollapes = true;
          col_title.css("border-bottom-left-radius","0px")
          col_title.css("border-bottom-right-radius","0px")
        }else{
          this.analyzeCollapes = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      },//分析方式点击方法
      pressureswitchChange(status) {
        var col_title = $("#pressureCollapse");
        if(status == true){
          this.pressureCollapes = true;
          col_title.css("border-bottom-left-radius","0px")
          col_title.css("border-bottom-right-radius","0px")
        }else{
          this.pressureCollapes = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      },//参数设置点击方法
      manageswitchChange(status) {
        var col_title = $("#manageCollapes");
        if(status == true){
          this.manageCollapes = true;
          col_title.css("border-bottom-left-radius","0px")
          col_title.css("border-bottom-right-radius","0px")
        }else{
          this.manageCollapes = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      },//图层管理点击方法
    },
    mounted(){
      console.log("buduile")
      var url =DatapostUrl+"/groundLive/getGroundLiveData?date=land&span=land&type=liveInfo_ground&level=land&zoom=";
      var temp = {
        url: url,
        id:"ground",
        type:"ground"
      };
      this.$store.state.liveAnalysisDataValue= {
        add:[temp]
      };
      this.$store.state.liveAnalysisStatus = true;
      this.$store.state.groundcolorIndex = 0;
    }
  }
</script>
<style>
  /*总体样式*/
  .groundanalyze{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .groundanalyze .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .groundanalyze .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .groundanalyze .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .groundanalyze .analyzecolor{
    border-left:4px solid #00D062;
  }
  .groundanalyze .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .groundanalyze .managecolor{
    border-left:4px solid #6E63FF;
  }

  /*预报时间样式*/
  .groundanalyze .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .groundanalyze .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .groundanalyze .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .groundanalyze .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*数据源*/
  .groundanalyze .station{
    margin:12px 22px 0 12px;
  }

  /*投影方式*/
  .groundanalyze .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    margin-top:10px;
    color:#fff;
    border:none;
  }
  .groundanalyze .ivu-select-arrow{
    color:#fff;
  }

  /*开关折叠样式*/
  .groundanalyze .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .groundanalyze .switch{
    margin-top:10px;
    float:right;
  }
  .groundanalyze .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .groundanalyze .manageswitch_collapse{
    background:#171D24;
    padding: 10px 10px 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .groundanalyze .ivu-switch-checked{
    border-color: #00D062;
    background-color: #00D062;
  }

  /*复选框*/
  .groundanalyze .ivu-checkbox-checked .ivu-checkbox-inner{
    border-color: #00D062;
    background-color: #00D062;
  }

  /*要素显示样式*/
  .groundanalyze .iselementActive{
    color:#fff;
  }
  .groundanalyze .sy-elemt{
    display: flex;
    /*justify-content: space-between;*/
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .groundanalyze .ground-elemt{
    display: flex;
    justify-content: space-between;
    /*justify-content: flex-start;*/
    flex-wrap: wrap;
  }
  .groundanalyze .sy-btn{
    width: 60px;
    height: 24px;
    border-radius:3px;
    padding:0;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    background:#04A5F7;
    border:none;
    margin:0 10px 10px 0;
  }
  .groundanalyze .noelementActive{
    color:#fff;
    background-color: #0D1014;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    border-radius: 2px;
    width: 60px;
    height: 24px;
    line-height:24px;
    padding:0;
    border:none;
    margin:0 10px 10px 0;
  }

  /*分析内容*/
  .groundanalyze .analyze_col{
    margin:0 10px 10px 0;
    text-align:left;
  }
  .groundanalyze .analyze_col:last-child{
    margin:0 10px 10px 24px;
  }
  .groundanalyze .ivu-checkbox{
    margin-right:5px;
  }
  .groundanalyze .analyze_button{
    background: none;
    color: #fff;
    height: 24px;
    padding: 0;
    line-height: 24px;
    width:100%;
    margin: 0 10px 10px 0;
    float: right;
    border:none;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    background: #11cf6f;
  }

  /*参数设置*/
  .groundanalyze .sy-title-text{
    color:#fff;
    text-align:left;
  }
  .groundanalyze .ivu-input-small{
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
  }
  .groundanalyze .line{
    text-align: center;
    width:100%;
    margin-bottom:10px;
  }
  .groundanalyze .line_bottom{
    margin-bottom:16px;
  }
  .groundanalyze .ivu-color-picker{
    width:100%;
  }
  .groundanalyze .ivu-color-picker-small .ivu-color-picker-color{
    width:40px;
  }
  .groundanalyze .ivu-color-picker-color div{
    border-radius:10px;
  }

  /*图层管理样式start*/
  .groundanalyze .manageelementclick{
    border-radius:10px;
    border:none;
    background:#6E63FF;
    margin-bottom:10px;
    width:45%;
    padding:0;
    color:#fff;
    height:22px;
    line-height:22px;
  }
  .groundanalyze .nomanageelementclick{
    border-radius:10px;
    border:none;
    color:#fff;
    background-color: #0D1014;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    margin-bottom:10px;
    width:45%;
    padding:0;
    height:22px;
    line-height:22px;
  }
  .groundanalyze .managebottom{
    padding-bottom:10px;
  }

</style>
