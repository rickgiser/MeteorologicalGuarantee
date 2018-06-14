<template>
  <div class="facsimile">
    <!--预报时间-->
    <Row class="forecasetime singlecolor">
      <i-col span="4" class="ground_text">预报时间</i-col>
      <i-col span="8" class="datePicker">
        <DatePicker  type="date" :value="imgtimeValue"  confirm  placeholder="选择日期"></DatePicker>
      </i-col>
      <i-col span="8" class="selecttime">
        <TimePicker :value="imgHtime" class="getTime" format="H" placeholder="选择时次" ></TimePicker>
      </i-col>
    </Row>
    <ul class="sy-lists">
      <!-- 来源渠道-->
      <li>
        <Row class="col_forecasetime elementcolor" id="fac_sourceSelect">
          <i-col span="6" class="ground_text">来源渠道</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="fac_sourceswitch" @on-change="fac_sourceswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse elementcolor" type="flex" v-show="fac_sourceCollapse">
          <i-col span="8" class="sy-context" v-for="(item,index) in basedata" :key="index">
            <Radio-group v-model="basedatashow">
              <Radio :label="item.label" ></Radio>
            </Radio-group>
          </i-col>
        </Row>
      </li>

      <!--预报时效-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="4" class="ground_text">预报时效</i-col>
          <i-col span="3"  class="sy-title-text">
            <i class="fa fa-fast-backward"></i>
          </i-col>
          <i-col span="14">
            <i-input size="small" placeholder="输入"></i-input>
          </i-col>
          <i-col span="3"  class="sy-title-text">
            <i class="fa fa-fast-forward"></i>
          </i-col>
        </Row>
      </li>

      <!--图层设置-->
      <li>
        <Row class="col_forecasetime pressurecolor" id="facsimile_tucengsetting">
          <i-col span="6" class="ground_text">图层设置</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="facsimile_tucengsettingswitch" @on-change="facsimile_tucengsettingChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse pressurecolor" type="flex" v-show="facsimile_tucengsettingCollapse">
          <i-col  class="col_play">
            <i class="fa fa-fast-backward"></i><p>上一帧</p>
          </i-col>
          <i-col  class="col_play">
            <i class="fa fa-fast-forward"></i><p>下一帧</p>
          </i-col>
          <i-col  class="col_play">
            <i class="fa fa-refresh"></i><p>旋转</p>
          </i-col>
          <i-col  class="col_play">
            <i class="fa fa-slack"></i><p>单张显示</p>
          </i-col>
          <i-col  class="col_play">
            <i class="fa fa-columns"></i><p>分屏显示</p>
          </i-col>
        </Row>
      </li>

    </ul>

  </div>
</template>
<script>
  import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
  export default{
    components: {ElIcon}, data() {
      return{
        imgtimeValue:'',
        imgHtime:'',
        basedata:[
          {label:'预报图',value:'预报图'},
          {label:'分析图',value:'分析图'},
          {label:'警报图',value:'警报图'},
          {label:'气候图',value:'气候图'},
          {label:'其他',value:'其他'},
        ],//要素分类
        basedatashow:'预报图',//展示分类单选框初始值
        fac_sourceswitch:true,
        fac_sourceCollapse:true,
        facsimile_tucengsettingswitch:true,//图层设置开关
        facsimile_tucengsettingCollapse:true,//图层设置折叠面板
      }
    },
    methods:{
      fac_sourceswitchChange(status){
        var col_title = $("#fac_sourceSelect");
        if (status == true) {
          this.fac_sourceCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.fac_sourceCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },
      facsimile_tucengsettingChange(status){
        var col_title = $("#facsimile_tucengsetting");
        if (status == true) {
          this.facsimile_tucengsettingCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.facsimile_tucengsettingCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//图层设置开关点击方法
    },
    mounted(){
      this.$store.state.imagescolorIndex = 3;
    }
  }
</script>
<style>
  .facsimile{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .facsimile .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .facsimile .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .facsimile .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .facsimile .analyzecolor{
    border-left:4px solid #00D062;
  }
  .facsimile .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .facsimile .managecolor{
    border-left:4px solid #6E63FF;
  }

  /*预报时间样式*/
  .facsimile .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .facsimile .sy-title-text{
    height:22px;
    line-height:22px;
    margin-top:11px;
  }
  .facsimile .ivu-input-small{
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
    margin-top:10px;
  }
  .facsimile .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .facsimile .colselect_top{
    margin-top:10px;
  }
  .facsimile .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .facsimile .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*开关折叠样式*/
  .facsimile .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .facsimile .switch{
    margin-top:10px;
    float:right;
  }
  .facsimile .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .facsimile .sy-context{
    color:#fff;
    text-align: left;
    margin-bottom:10px;
  }
  .facsimile .col_play{
    margin-bottom:10px;
    width:19%;
  }


</style>
