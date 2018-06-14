<template>
  <div class="synthesis">
    <Row class="sy">
      <i-col span="6">
        <i-button class="sy-btn">预报时间</i-button>
      </i-col>
      <i-col span="8">
        <DatePicker type="date" :value="timeValue" class="getlefttime" confirm  @on-change="getDate" placeholder="选择日期"></DatePicker>
      </i-col>
      <i-col span="6">
        <TimePicker :value="Htime" format="HH" class="getTime"></TimePicker>
      </i-col>
    </Row>
    <div>
      <i-button icon="arrow-left-a" class="sy-btn-c sy-btn" @click = "Nexttime"></i-button>
      <i-button icon="arrow-right-a" class="sy-btn-c sy-btn"  @click = "Pretime"></i-button>
      <i-button icon="loop" class="sy-btn-c sy-btn" @click = "Reset"></i-button>
    </div>
    <ul class="sy-lists">
      <!-- 添加要素 start -->
      <li>
        <Collapse v-model="addElement">
          <Panel name="1" style="font-size:10px;" >
            <i-col span="5" class="sy-title" style="float: left">添加要素</i-col>
            <div slot="content" style="padding:0;">
              <div class="sy-elemt roundelement">
                <i-button class="sy-btn sy-btn-elemt" v-for="(item,index) in wind_Rose" :key="index" @click="windroseClick(item,index)"><div :class="{modalActive: index == elementClickIndex}">{{item.msg}}</div></i-button>
              </div>
              <Row style="padding:0 10px;margin-top:5px;">
                <i-select size="small" v-model.sync="windstatus" @on-change="windpoleModeClick">
                  <i-option v-for="item in this.windpoleMode" :value="item" :key="item" >{{item}}</i-option>
                </i-select>
              </Row>

            </div>
          </Panel>
        </Collapse>
      </li>
      <!-- 其他 end -->

      <!-- 图层管理面板 start -->
      <li>
        <Row class="sy-comm">
          <i-col span="7" class="sy-title">图层管理面板</i-col>
        </Row>
        <Row class="sy-comm roundelement" v-for="(item,index) in this.manageLayer">
          <i-col span="10">
            <i-button class="sy-btn elementdisclick">{{item.name + item.level}}</i-button>
          </i-col>
          <i-col span="6">
            <i-button class="sy-btn elementclick" @click="visibleElementClick(item)">{{item.visible}}</i-button>
          </i-col>
          <i-col span="3">
            <i-button class="sy-btn elementclick" @click="deleteElementClick(item)">{{item.disvisible}}</i-button>
          </i-col>
        </Row>
      </li>

      <!-- 图层管理面板 end -->
    </ul>
  </div>
</template>

<script>
  import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
  export default {
    components: {ElIcon}, data() {
      return {
        levelstatus:'',//层级展示方式切换
        windstatus:'',//玫瑰图展示方式切换
        addElement: '1',//添加要素折叠面板
        wind_Rose:[//玫瑰图数据源
          {msg:"玫瑰图",visible:'可见',disvisible:'不可见',elementType:"wind",Graph:[{"GraphType":"wind_Rose","GraphName":"玫瑰图","CategoryType":"static/data/wind_Rose"}]}
        ],
        manageLayer:[],//图层管理数组
        elementType:'',//要素类型
        windpoleMode:[],//玫瑰图展示方式
        windpoleModeurl:[],//玫瑰图数据源
        managename:'',//图层管理显示名称
        t_value: '',//时间
        timeValue: '',//日期
        Htime: new Date(),//默认的日期显示
        index:0,//要素当前状态初始值
        elementClickIndex:-1,//地面要素当前状态
        metegrapheClickIndex:-1,//气压要素当前状态
      }
    },
    methods: {
      //获取日期
      getDate(value) {
        this.timeValue = value ;
      },
      //获取前一天日期
      Pretime(){
        this.timeValue = this.$store.state.PreTime(this.timeValue);
      },
      //获取后一天日期
      Nexttime(){ //后一天
        this.timeValue = this.$store.state.NextTime(this.timeValue);
      },
      //日期重置
      Reset(){  //刷新
        this.timeValue = '';
      },
      //添加图层面板信息
      addElementname(){
        var temp = true ;
        for(var i=0;i<this.manageLayer.length;i++){
          if(this.manageLayer[i].value == (this.$store.state.elementType + this.levelstatus)){
            temp = false;
          }
        }
        if(temp){
          var layerId = {
            name:this.managename,
            level:this.levelstatus,
            value:this.$store.state.elementType + this.levelstatus + this.$store.state.showExchange,
            visible:"可见",
            disvisible:"不可见"
          };
          this.manageLayer.push(layerId);
          this.$store.state.chufa = true;
        }
      },
      //玫瑰图展示
      windroseClick(item,index){
        this.elementClickIndex = item;
        this.windpoleMode = [];
        this.windpoleModeurl = [];
        this.windstatus = "";
        var data = item.Graph;
        for(var i=0;i<data.length;i++){
          this.windpoleMode.push(item.Graph[i].GraphName)
          this.windpoleModeurl.push(item.Graph[i].CategoryType)
        }
        this.$store.state.elementType = item.elementType;
        this.managename = item.msg;
      },
      //玫瑰图展示方式切换
      windpoleModeClick(){
        var graphType;
        if(this.windstatus == "") return;
        switch(this.windstatus){
          case "玫瑰图":
            graphType = 'isoline';
            this.$store.state.showExchange = 'iso';
            this.$store.state.graphType = graphType;
            this.$store.state.geoJsonUrl = this.windpoleModeurl[0];
            break;
        }
        this.addElementname();
        this.$store.state.layerId= "";
        console.log(this.manageLayer)


      },
      //可见方法
      visibleElementClick(item,index){
        this.$store.state.layerId = item.value;
        this.$store.state.chufa = true;
      },
      //不可见方法
      deleteElementClick(item,index){
        this.$store.state.layerId = item.value;
        this.$store.state.show = false;
      }
    },
    mounted() {
      this.protobuffer = new PieParseProtoBuffer();
      this.timeValue = this.$store.state.formatDate(new Date());
    }
  }
</script>
<style>
  .ivu-collapse-content>.ivu-collapse-content-box{
    padding-top:0;
  }
</style>
