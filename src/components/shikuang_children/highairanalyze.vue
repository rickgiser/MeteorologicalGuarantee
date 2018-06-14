<template>
  <div class="highanalyze">
    <!--预报时间-->
    <Row class="forecasetime singlecolor">
      <i-col span="4" class="ground_text">预报时间</i-col>
      <i-col span="8" class="datePicker">
        <DatePicker  type="date" :value="timeValue"  confirm  placeholder="选择日期"></DatePicker>
      </i-col>
      <i-col span="8" class="selecttime">
        <TimePicker :value="Htime" class="getTime" format="H" placeholder="选择时次"></TimePicker>
      </i-col>
    </Row>

    <ul class="sy-lists">
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

      <!--层次选择-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">层次选择</i-col>
          <i-col span="18">
            <i-select size="small">
              <i-option v-for="(item,index) in highleveSelect" :value="item.value" :key="item.value">{{item.label}}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

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
              <i-button class="sy-btn" :key="item.label" @click="highelementClick(item,index)"><div :class="item.disable? 'iselementActive':'noelementActive'">{{item.label}}</div></i-button>
            </Tooltip>
          </div>
        </Row>
      </li>

      <!--分析内容-->
      <li>
        <Row class="col_forecasetime analyzecolor" id="highanalyzeCollapse">
          <i-col span="6" class="ground_text">分析内容</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="highanalyseswitch" @on-change="highanalyzeswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse analyzecolor" v-show="highanalyzeCollapes">
          <div class="col_left">
            <i-col span="6" class="col_bottom" v-for="(item,index) in analyzeContent">
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
        <Row class="col_forecasetime pressurecolor" id="highpressureCollapse">
          <i-col span="6" class="ground_text">参数设置</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="highpressureswitch" @on-change="highpressureswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse pressurecolor" style="padding-right:10px;" v-show="highpressureCollapes">
          <div class="sy-elemt">
            <!--等压线参数设置-->
            <Row class="line">- - - - - - - - - - - - - - - - - -&nbsp &nbsp等高线参数&nbsp &nbsp- - - - - - - - - - - - - - - - - -</Row>
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

          <!--三小时变压参数设置-->
          <div class="sy-elemt">
            <Row class="line">- - - - - - - - - - - - - - - - &nbsp &nbsp等温线参数&nbsp &nbsp - - - - - - - - - - - - - - - -</Row>
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
        <Row class="col_forecasetime managecolor" id="highmanageCollapes">
          <i-col span="6" class="ground_text">图层管理面板</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="highmanageswitch" @on-change="highmanageswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse managecolor" v-show="highmanageCollapes">
          <div class="sy-elemt" >
            <i-button v-for = "(item,index) in layers" class="manageelementclick" @click = "manageLayer(item,index)" >{{item.label}}</i-button>
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
        return{
          timeValue:'',
          Htime:'',
          index:0,
          elementClickIndex:0,
          projectiveMode:[
            {label:'墨卡托投影1',value:'墨卡托投影1'},
            {label:'墨卡托投影2',value:'墨卡托投影2'},
            {label:'墨卡托投影3',value:'墨卡托投影3'},
            {label:'墨卡托投影4',value:'墨卡托投影4'},
          ],//投影方式选择
          highleveSelect:[
            {label:'100',value:'100'},
            {label:'200',value:'200'},
            {label:'300',value:'300'},
            {label:'400',value:'400'},
            {label:'500',value:'500'},
          ],//层次选择
          platform:false,//地方站台
          ations:false,//jun内站台
          showelement:'1',//要素显示折叠面板
          elementswitch:true,//要素开关
          elementCollapes:true,//要素开关
          elementselect:[
            {label:'Fmfm',value:'WS',title:'平均风速',disable:true},
            {label:'TT',value:'T',title:'气温',disable:true},
            {label:'TdTd',value:'TD',title:'露点温度',disable:true},
            {label:'H',value:'H',title:'位势高度',disable:true},
          ],//要素
          analyzeContent:[
            {label:'等高线',value:"H"},
            {label:'等温线',value:"TD"}
            ],//分析方式
          analyzeContentshow:['H'],//分析方式复选框初始值
          highanalyseswitch:true,//分析方式开关
          highanalyzeCollapes:true,//分析方式开关
          color1:'#ff0000',
          highpressureswitch:true,
          highpressureCollapes:true,
          paramSetting:'1',//参数设置折叠面板
          lineStyleSelect:'',//线条样式
          lineStyle:[
            {label:'实线',value:'solid'},
            {label:'虚线',value:'dotted'},
          ],//线条样式内容
          Layermanagevalue:'1',//图层管理折叠面板
          highmanageswitch:true,
          highmanageCollapes:true,
          layerIDs:[],
          layers:[],
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
      getUrlFormat(element){
        var temp = "/upperLive/getUpperLiveDataCoutour?";

        var url =DatapostUrl+
          temp +"params=" +
          "date:20140308," +
          "type:upperInfo_upper," +
          "span:0800," +
          "level:850," +
          "element:"+element
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
            this.addLayerManage(id,analyzeDatas[i]);
            this.layerIDs.push(id);
            this.$store.state.liveAnalysisDataValue.addAnalyze.push(temp);
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
      highelementClick(item,index){
//        this.elementClickIndex = index;
        item.disable = !item.disable;
        if(item.disable){
          this.$store.state.liveAnalysisDataValue = {
            show:[{
              id:"upper850_"+item.value,
            }]
          }
        }else{
          this.$store.state.liveAnalysisDataValue = {
            hide:[{
              id:"upper850_"+item.value,
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
      highpressureswitchChange(status){
        var col_title = $("#highpressureCollapse");
        if(status == true){
          this.highpressureCollapes = true;
          col_title.css("border-bottom-left-radius","0px")
          col_title.css("border-bottom-right-radius","0px")
        }else{
          this.highpressureCollapes = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      },//参数设置点击开关
      highanalyzeswitchChange(status){
        var col_title = $("#highanalyzeCollapse");
        if(status == true){
          this.highanalyzeCollapes = true;
          col_title.css("border-bottom-left-radius","0px")
          col_title.css("border-bottom-right-radius","0px")
        }else{
          this.highanalyzeCollapes = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      },//分析方式点击开关
      highmanageswitchChange(status){
        var col_title = $("#highmanageCollapes");
        if (status == true) {
          this.highmanageCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.highmanageCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },
    },
    mounted(){
      var url =DatapostUrl+"/upperLive/getUpperLiveData?" +
        "date=20140308&" +
        "span=0800&" +
        "type=upperInfo_upper&" +
        "level=850&" +
        "zoom=";
      var temp = {
        url: url,
        id:"upper850",
        type:"upper"
      };
      this.$store.state.liveAnalysisDataValue= {
        add:[temp]
      };
      this.$store.state.liveAnalysisStatus = true;
      this.$store.state.groundcolorIndex = 1;


      console.log("kkk")
    }
  }
</script>
<style>
   /* 总体样式*/
   .highanalyze{
     color:#fff;
     font-size:12px;
     padding:20px 8px;
     font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
   }
   .highanalyze .sy-lists li{
     margin-top:5%;
   }
   /*边栏颜色*/
   .highanalyze .singlecolor{
     border-left:4px solid #00FFFF;
   }
   .highanalyze .elementcolor{
     border-left:4px solid #04A5F7;
   }
   .highanalyze .analyzecolor{
     border-left:4px solid #00D062;
   }
   .highanalyze .pressurecolor{
     border-left:4px solid #FFD200;
   }
   .highanalyze .managecolor{
     border-left:4px solid #6E63FF;
   }
   /*预报时间样式*/
   .highanalyze .forecasetime{
     height:42px;
     border-radius:6px;
     /*background-color: #171D24;*/
     background-color: #060a0e;
     box-shadow:0px 6px 12px rgba(0,0,0,0.2);
     padding:0 20px 0 8px;
   }
   .highanalyze .ground_text{
     background: transparent;
     border:none;
     line-height:42px;
     text-align: left;
   }
   .highanalyze .ivu-input-icon-normal+.ivu-input{
     border-radius:18px;
     background:#273037;
     color:#fff;
     height:22px;
     border: none;
   }
   .highanalyze .ivu-input-icon{
     color:#fff;
     line-height:22px;
   }

   /*投影方式*/
   .highanalyze .ivu-select-small.ivu-select-single .ivu-select-selection{
     height:22px;
     border-radius:16px;
     background:#273037;
     margin-top:10px;
     color:#fff;
     border:none;
   }
   .highanalyze .ivu-select-arrow{
     color:#fff;
   }

   /*数据源*/
   .highanalyze .station{
     margin:12px 22px 0 12px;
   }

   /*开关折叠样式*/
   .highanalyze .col_forecasetime{
     height:42px;
     border-top-left-radius:6px;
     border-top-right-radius: 6px;
     border-bottom-left-radius: 0;
     border-bottom-right-radius: 0;
     background-color: #060a0e;
     padding:0 20px 0 8px;
   }
   .highanalyze .analyze_button{
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
   .highanalyze .switch{
     margin-top:10px;
     float:right;
   }
   .highanalyze .switch_collapse{
     background:#171D24;
     padding: 10px 0 0 10px;
     border-top-left-radius:0;
     border-top-right-radius: 0;
     border-bottom-left-radius: 6px;
     border-bottom-right-radius: 6px;
   }
   .highanalyze .col_left{
     text-align: left;
   }
   .highanalyze .col_bottom{
     margin-bottom:10px;
   }
   .highanalyze .ivu-switch-checked{
     border-color: #00D062;
     background-color: #00D062;
   }

   /*要素显示样式*/
   .highanalyze .iselementActive{
     color:#fff;
   }
   .highanalyze .sy-elemt{
     display: flex;
     justify-content: flex-start;
     flex-wrap: wrap;
   }
   .highanalyze .noelementActive{
     color:#fff;
     background-color: #0D1014;
     border-radius: 2px;
     width: 60px;
     height: 24px;
     line-height:24px;
     padding:0;
     border:none;
     margin:0 10px 10px 0;
   }

   .highanalyze .sy-btn{
     width: 60px;
     height: 24px;
     border-radius: 2px;
     padding:0;
     box-shadow: 0px 6px 12px rgba(0,0,0,0.2);

     background:#04A5F7;
     border:none;
     margin:0 10px 10px 0;
   }
   .highanalyze .noelementActive{
     color:#fff;
     background-color: #0D1014;
     border-radius: 2px;
     width: 60px;
     height: 24px;
     line-height:24px;
     padding:0;
     border:none;
     margin:0 10px 10px 0;
   }

   /*参数设置*/
   .highanalyze .sy-title-text{
     color:#fff;
     text-align:left;
   }
   .highanalyze .ivu-input-small{
     height:22px;
     line-height:22px;
     border-radius:14px;
     background:none;
     color:#fff;
     border:none;
     background:#273037;
   }
   .highanalyze .line{
     text-align: center;
     width:100%;
     margin-bottom:10px;
   }
   .highanalyze .line_bottom{
     margin-bottom:16px;
   }
   .highanalyze .ivu-color-picker{
     width:100%;
   }
   .highanalyze .ivu-color-picker-small .ivu-color-picker-color{
     width:40px;
   }
   .highanalyze .ivu-color-picker-color div{
     border-radius:10px;
   }

   /*图层管理面板样式*/
   .highanalyze .managelabel{
     padding-left:13px;
   }
</style>
