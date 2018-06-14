<template>
  <div class="armyanalyze">
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
        <Row class="col_forecasetime elementcolor" id="armyanalyzelementCollapse">
          <i-col span="6" class="ground_text">要素选择</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="armyanalyzelementswitch" @on-change="armyanalyzelementswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse elementcolor" v-show="armyanalyzelementCollapes">
          <div class="sy-elemt">
            <Tooltip :content="item.title" v-for="(item,index) in elementselect" placement="top">
              <i-button class="sy-btn" :key="item.label" @click="highelementClick(item,index)"><div :class="item.disable? 'iselementActive':'noelementActive'">{{item.label}}</div></i-button>
            </Tooltip>
          </div>
        </Row>
      </li>

      <!--分析内容-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">分析内容</i-col>
          <i-col span="6" class="station" v-for="(item,index) in analyzeContent">
            <Checkbox-group v-model="analyzeContentshow">
              <Checkbox :label="item" ></Checkbox>
            </Checkbox-group>
          </i-col>
        </Row>
      </li>

      <!--参数设置-->
      <li>
        <Row class="col_forecasetime pressurecolor" id="armyanalyzepressureCollapse">
          <i-col span="6" class="ground_text">参数设置</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="armyanalyzepressureswitch" @on-change="armyanalyzepressureswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse pressurecolor" style="padding-right:10px;" v-show="armyanalyzepressureCollapes">
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

            </Row>
          </div>
        </Row>
      </li>

      <!-- 图层管理面板 start -->
      <li>
        <Row class="col_forecasetime managecolor" id="armyanalyzemanageCollapes">
          <i-col span="6" class="ground_text">图层管理面板</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="armyanalyzemanageswitch" @on-change="armyanalyzemanageswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse managecolor" v-show="armyanalyzemanageCollapes">

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
        armyanalyzelementswitch:true,
        armyanalyzelementCollapes:true,
        elementselect:[
          {label:'h',value:'h',title:'云底低于2500米的云底高度'},
          {label:'vv',value:'vv',title:'有效水平能见度'},
          {label:'N',value:'N',title:'总云量'},
          {label:'Dd',value:'Dd',title:'风向(风的来向)'},
          {label:'Fmfm',value:'Fmfm',title:'平均风速'},
          {label:'TT',value:'TT',title:'气温'},
          {label:'TdTd',value:'TdTd',title:'露点温度'},
          {label:'PPP',value:'PPP',title:'海平面气压'},
          {label:'a',value:'a',title:'过去三小时气压倾向'},
          {label:'PP',value:'PP',title:'三小时气压变量'},
          {label:'RR',value:'RR',title:'过去六小时内(包括本次观测时)的降水量'},
          {label:'WW',value:'WW',title:'现在天气现象'},
          {label:'W',value:'W',title:'过去天气现象'},
          {label:'Nh',value:'Nh',title:'云底低于2500米的低云或中云的总量'},
          {label:'CL',value:'CL',title:'低云状'},
          {label:'CM',value:'CM',title:'中云状'},
          {label:'CH',value:'CH',title:'高云状'}
        ],//要素
        analyzeContent:['等高线', '等温线'],//分析方式
        analyzeContentshow:['等高线'],//分析方式复选框初始值
        color1:'#ff0000',
        armyanalyzepressureswitch:true,
        armyanalyzepressureCollapes:true,
        paramSetting:'1',//参数设置折叠面板
        Layermanagevalue:'1',//图层管理折叠面板
        armyanalyzemanageswitch:true,
        armyanalyzemanageCollapes:true,
      }
    },
    methods: {
      highelementClick(item, index){
//        this.elementClickIndex = index;
        item.disable = !item.disable;
      },
      armyanalyzelementswitchChange(status) {
        var col_title = $("#armyanalyzelementCollapse");
        if (status == true) {
          this.armyanalyzelementCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.armyanalyzelementCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//要素开关点击方法
      armyanalyzepressureswitchChange(status){
        var col_title = $("#armyanalyzepressureCollapse");
        if (status == true) {
          this.armyanalyzepressureCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.armyanalyzepressureCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//参数设置点击开关
      armyanalyzemanageswitchChange(status){
        var col_title = $("#armyanalyzemanageCollapes");
        if (status == true) {
          this.armyanalyzemanageCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.armyanalyzemanageCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },
    },
    mounted(){
      this.$store.state.groundcolorIndex = 2;

    }
  }
</script>
<style>
  /* 总体样式*/
  .armyanalyze{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .armyanalyze .sy-lists li{
    margin-top:5%;
  }
  /*边栏颜色*/
  .armyanalyze .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .armyanalyze .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .armyanalyze .analyzecolor{
    border-left:4px solid #00D062;
  }
  .armyanalyze .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .armyanalyze .managecolor{
    border-left:4px solid #6E63FF;
  }
  /*预报时间样式*/
  .armyanalyze .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .armyanalyze .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .armyanalyze .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .armyanalyze .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*投影方式*/
  .armyanalyze .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    margin-top:10px;
    color:#fff;
    border:none;
  }
  .armyanalyze .ivu-select-arrow{
    color:#fff;
  }

  /*数据源*/
  .armyanalyze .station{
    margin:12px 22px 0 12px;
  }

  /*开关折叠样式*/
  .armyanalyze .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .armyanalyze .switch{
    margin-top:10px;
    float:right;
  }
  .armyanalyze .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .armyanalyze .ivu-switch-checked{
    border-color: #00D062;
    background-color: #00D062;
  }

  /*要素显示样式*/
  .armyanalyze .iselementActive{
    color:#fff;
  }
  .armyanalyze .sy-elemt{
    display: flex;
    /*justify-content: space-between;*/
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .armyanalyze .noelementActive{
    color:#fff;
    border-radius: 2px;
    width: 60px;
    height: 24px;
    line-height:24px;
    padding:0;
    border:none;
    margin:0 10px 10px 0;
  }
  .armyanalyze .sy-elemt{
    display: flex;
    /*justify-content: space-between;*/
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .armyanalyze .sy-btn{
    width: 60px;
    height: 24px;
    border-radius: 2px;
    padding:0;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);

    background:#04A5F7;
    border:none;
    margin:0 10px 10px 0;
  }
  .armyanalyze .noelementActive{
    color:#fff;
    border-radius: 2px;
    width: 60px;
    height: 24px;
    line-height:24px;
    padding:0;
    border:none;
    margin:0 10px 10px 0;
  }


  /*参数设置*/
  .armyanalyze .sy-title-text{
    color:#fff;
    text-align:left;
  }
  .armyanalyze .ivu-input-small{
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
  }
  .armyanalyze .line{
    text-align: center;
    width:100%;
    margin-bottom:10px;
  }
  .armyanalyze .line_bottom{
    margin-bottom:16px;
  }
  .armyanalyze .ivu-color-picker{
    width:100%;
  }
  .armyanalyze .ivu-color-picker-small .ivu-color-picker-color{
    width:40px;
  }
  .armyanalyze .ivu-color-picker-color div{
    border-radius:10px;
  }

  /*图层管理面板样式*/
  .armyanalyze .managelabel{
    padding-left:13px;
  }
  .armyanalyze .tuceng{
    display: block;
    margin-bottom:5px;
    width:20%;
  }
  .armyanalyze .tucengelement{
    margin-bottom:5px;
    border: 1px solid #ddd;
    border-radius: 14px;
    background:none;
    height: 26px;
    line-height: 26px;
    font-size:12px;
    color:#fff;
    text-align:center;
    padding:0 10px;
  }
  .armyanalyze .elementdisclick{
    cursor:text;
  }
  .armyanalyze .elementdisclick:hover{
    border:1px solid #ddd;
  }
  .armyanalyze .elementclick:hover{
    color:#fff;
    border: 1px solid rgba(45,140,240,.9);
    border-radius: 14px;
  }











  /*图层管理面板样式*/
  .armyanalyze .managelabel{
    padding-left:13px;
  }
  .armyanalyze .tuceng{
    display: block;
    margin-bottom:5px;
    width:20%;
  }
  .armyanalyze .tucengelement{
    margin-bottom:5px;
    border: 1px solid #ddd;
    border-radius: 14px;
    background:none;
    height: 26px;
    line-height: 26px;
    font-size:12px;
    color:#fff;
    text-align:center;
    padding:0 10px;
  }
  .armyanalyze .elementdisclick{
    cursor:text;
  }
  .armyanalyze .elementdisclick:hover{
    border:1px solid #ddd;
  }
  .armyanalyze .elementclick:hover{
    color:#fff;
    border: 1px solid rgba(45,140,240,.9);
    border-radius: 14px;
  }
</style>
