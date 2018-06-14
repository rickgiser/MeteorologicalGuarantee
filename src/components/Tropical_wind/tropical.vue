<template>
  <div class="tropical">
    <ul class="sy-lists">
      <!--气旋信息列表-->
      <li class="tropicallist">
        <Row class="col_forecasetime analyzecolor" id="tropicallist">
          <i-col span="6" class="ground_text">气旋信息列表</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="tropicallistswitch" @on-change="tropicallistChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse analyzecolor" v-show="tropicallistCollapes">
          <div>
            <Table border ref="selection" @on-select="tropicalClick()" :columns="tropicallist" :data="tropicaldata"></Table>
          </div>
        </Row>
      </li>

      <!--条件检索设置-->
      <li>
        <Row class="col_forecasetime pressurecolor" id="conditionsearch">
          <i-col span="6" class="ground_text">条件检索设置</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="conditionsearchstswitch" @on-change="conditionsearchChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse pressurecolor" v-show="conditionsearchCollapes">
          <div>
            <!--时间选择-->
            <Row class="col_bottom">
              <i-col span="4" class="sy-title-text">时间选择</i-col>
              <i-col span="19">
                <DatePicker style="width:100%;" type="date" :value="timeValue"  confirm  placeholder="选择日期"></DatePicker>
              </i-col>
            </Row>

            <!--范围选择-->
            <Row class="col_bottom">
              <i-col span="4" class="sy-title-text">范围选择</i-col>
              <i-col span="19">
                <i-select size="small">
                  <i-option v-for="(item,index) in areaSelect" :value="item.value" :key="item.value">{{item.label}}</i-option>
                </i-select>
              </i-col>
            </Row>

            <!--相似路径-->
            <Row class="col_bottom">
              <i-col span="4" class="sy-title-text">相似路径</i-col>
              <i-col span="19">
                <i-input size="small" placeholder="输入"></i-input>
              </i-col>
            </Row>

            <!--登录状态-->
            <Row>
              <i-col span="4" class="sy-title-text">登录状态</i-col>
              <i-col span="19">
                <i-button size="small" class="sy-btn">已登录</i-button>
              </i-col>
            </Row>

            <!--相似路径-->
            <Row>
              <i-col span="4" class="sy-title-text">历史最强</i-col>
              <i-col span="19">
                <i-input size="small" placeholder="输入"></i-input>
              </i-col>
            </Row>

            <Row>
              <i-col span="23">
                <i-button size="small" class="sy-btn-jiansuo">检索</i-button>
              </i-col>
            </Row>
          </div>
        </Row>
      </li>

      <!--检索气旋数据列表-->
      <li class="tropicaldatalist">
        <Row class="col_forecasetime elementcolor" id="tropicaldatalist">
          <i-col span="6" class="ground_text">检索气旋数据</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="tropicaldatalistswitch" @on-change="tropicaldatalistChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse elementcolor" v-show="tropicaldatalistCollapes">
          <div>
            <Table border ref="selection" :columns="tropicallist" :data="tropicaldata"></Table>
          </div>
        </Row>
      </li>

      <!--气旋设置-->
      <li>
        <Row class="col_forecasetime managecolor" id="tropicalsettinglist">
          <i-col span="6" class="ground_text">检索气旋数据</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="tropicalsettingswitch" @on-change="tropicalsettingChange"></i-switch>
          </i-col>
        </Row>
        <Row class="switch_collapse managecolor" v-show="tropicalsettingCollapes">
          <div>
            <!--时间选择-->
            <Row class="col_bottom">
              <i-col span="4" class="sy-title-text">气旋符号</i-col>
              <i-col span="19">
                <i-select size="small">
                  <i-option v-for="(item,index) in tropicalSymbol" :value="item.value" :key="item.value">{{item.label}}</i-option>
                </i-select>
              </i-col>
            </Row>

            <!--路径线性-->
            <Row class="col_bottom">
              <i-col span="4" class="sy-title-text">路径线性</i-col>
              <i-col span="19">
                <i-select size="small">
                  <i-option v-for="(item,index) in pathline" :value="item.value" :key="item.value">{{item.label}}</i-option>
                </i-select>
              </i-col>
            </Row>

            <!--名称标注-->
            <Row class="col_bottom">
              <i-col span="4" class="sy-title-text">名称标注</i-col>
              <i-col span="19">
                <i-select size="small">
                  <i-option v-for="(item,index) in nameLabel" :value="item.value" :key="item.value">{{item.label}}</i-option>
                </i-select>
              </i-col>
            </Row>

            <!--时间标注-->
            <Row class="col_bottom">
              <i-col span="4" class="sy-title-text">时间标注</i-col>
              <i-col span="19">
                <i-select size="small">
                  <i-option v-for="(item,index) in timeLabel" :value="item.value" :key="item.value">{{item.label}}</i-option>
                </i-select>
              </i-col>
            </Row>

            <!--符号大小-->
            <Row class="col_bottom">
              <i-col span="4" class="sy-title-text">符号大小</i-col>
              <i-col span="19">
                <i-select size="small">
                  <i-option v-for="(item,index) in symboleSize" :value="item.value" :key="item.value">{{item.label}}</i-option>
                </i-select>
              </i-col>
            </Row>

            <!--路径宽度-->
            <Row class="col_bottom">
              <i-col span="4" class="sy-title-text">路径宽度</i-col>
              <i-col span="19">
                <i-select size="small">
                  <i-option v-for="(item,index) in lineWidth" :value="item.value" :key="item.value">{{item.label}}</i-option>
                </i-select>
              </i-col>
            </Row>

            <!--图例显示-->
            <Row>
              <i-col span="4" class="sy-title-text">图例显示</i-col>
              <i-col span="19">
                <i-button size="small" class="sy-btn-tuli">图例</i-button>
              </i-col>
            </Row>
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
          timeValue:'',//时间初始值
          tropicallist: [
            {type: 'selection',width: 60,align: 'center'},
            {title: '编号',key: 'date'},
            {title: '中文名',key: 'name'},
            {title: '英文名',key: 'englishname'}
          ],//气旋信息列表数
          tropicaldata: [
            {date: '20170208',name: '启德',englishname: 'Lai-Tak'},
            {date: '20170207',name:'鸿雁',englishname: 'Kirogy'},
            {date: '20170206',name:'海葵',englishname: 'Haikui'},
            {date: '20170205',name: '达维',englishname: 'Damrey'},
            {date: '20170204',name: '苏拉',englishname: 'Saola'}
          ],//气旋信息列表数据
          areaSelect:[
            {label:'全国',value:'全国'},
            {label:'北京',value:'北京'},
            {label:'上海',value:'上海'},
            {label:'南京',value:'南京'},
          ],//范围选择
          tropicalSymbol:[
            {label:'显示',value:'显示'},
            {label:'隐藏',value:'隐藏'},
          ],//气旋符号
          pathline:[
            {label:'动画路径',value:'动画路径'},
            {label:'基本路径',value:'基本路径'},
          ],//路径线性
          nameLabel:[
            {label:'无',value:'无'},
            {label:'有',value:'有'},
          ],//名称标注
          timeLabel:[
            {label:'无',value:'无'},
            {label:'有',value:'有'},
          ],//时间标注
          symboleSize:[
            {label:'1',value:'1'},
            {label:'2',value:'2'},
            {label:'3',value:'3'},
            {label:'4',value:'4'},
          ],//符号大小
          lineWidth:[
            {label:'3',value:'3'},
            {label:'4',value:'4'},
            {label:'5',value:'5'},
          ],//路径宽度
          tropicallistswitch:true,//气旋信息列表开关
          tropicallistCollapes:true,//气旋信息列表
          conditionsearchstswitch:true,//条件检索设置开关
          conditionsearchCollapes:true,//条件检索设置折叠
          tropicaldatalistswitch:true,//检索气旋开关
          tropicaldatalistCollapes:true,//检索气旋数据折叠
          tropicalsettingswitch:true,//气旋设置开关
          tropicalsettingCollapes:true,//气旋设置折叠
        }
    },
    methods:{
      tropicalClick(){
        this.$store.state.tropicalshow = true;
      },
      tropicallistChange(status){
        var col_title = $("#tropicallist");
        if(status == true){
          this.tropicallistCollapes = true;
          col_title.css("border-bottom-left-radius","0px")
          col_title.css("border-bottom-right-radius","0px")
        }else{
          this.tropicallistCollapes = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      },//气旋信息列表
      conditionsearchChange(status){
        var col_title = $("#conditionsearch");
        if(status == true){
          this.conditionsearchCollapes = true;
          col_title.css("border-bottom-left-radius","0px")
          col_title.css("border-bottom-right-radius","0px")
        }else{
          this.conditionsearchCollapes = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      },//条件检索设置
      tropicaldatalistChange(status){
        var col_title = $("#tropicaldatalist");
        if(status == true){
          this.tropicaldatalistCollapes = true;
          col_title.css("border-bottom-left-radius","0px")
          col_title.css("border-bottom-right-radius","0px")
        }else{
          this.tropicaldatalistCollapes = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      },//检索气旋数据列表
      tropicalsettingChange(status){
        var col_title = $("#tropicalsettinglist");
        if(status == true){
          this.tropicalsettingCollapes = true;
          col_title.css("border-bottom-left-radius","0px")
          col_title.css("border-bottom-right-radius","0px")
        }else{
          this.tropicalsettingCollapes = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      },//气旋设置点击方法
    },
    mounted(){

    }
  }
</script>
<style>
  /*总体样式*/
  .tropical{
    color:#fff;
    font-size:12px;
    padding:0 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .tropical .sy-lists li{
    margin-top:5%;
  }
  .tropical .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .tropical .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .tropical .analyzecolor{
    border-left:4px solid #00D062;
  }
  .tropical .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .tropical .managecolor{
    border-left:4px solid #6E63FF;
  }
  /*表格样式更改*/
  .tropical .ivu-table th{
    background: none !important;
    height:26px;
  }
  .tropical .ivu-table{
    background: none !important;
    color:#fff;
  }
  .tropical .ivu-table td{
    background: none !important;
    color:#fff;
    height:26px;
  }
  /*气旋信息列表*/
  /*.tropical .tropicallist.ivu-table-border td, .ivu-table-border th{*/
    /*border:1px solid #00D062;*/
  /*}*/
  /*.tropical .tropicaldatalist.ivu-table-border td, .ivu-table-border th{*/
    /*border:1px solid #04A5F7;*/
  /*}*/

  .tropical .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .tropical .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
    text-align: center;
  }
  .tropical .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }
  .tropical .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    color:#fff;
    border:none;
  }
  .tropical .ivu-select-arrow{
    color:#fff;
  }
  .tropical .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .tropical .switch{
    margin-top:10px;
    float:right;
  }
  .tropical .switch_collapse{
    background:#171D24;
    padding: 10px 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .tropical .ivu-switch-checked{
    border-color: #00D062;
    background-color: #00D062;
  }
  .tropical .ivu-checkbox-checked .ivu-checkbox-inner{
    border-color: #00D062;
    background-color: #00D062;
  }
  .tropical .sy-btn{
    width:100%;
    height: 22px;
    line-height:22px;
    border-radius:14px;
    color:#999;
    padding:0;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    background:#273037;
    border:none;
    margin:0 10px 10px 0;
  }
  .tropical .sy-btn-jiansuo{
    width:100%;
    height: 22px;
    line-height:22px;
    border-radius:14px;
    color:#000;
    padding:0;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    background:#FFD200;
    border:none;
    margin-top:10px;
  }
  .tropical .sy-btn-tuli{
    width:100%;
    height: 22px;
    line-height:22px;
    border-radius:14px;
    color:#000;
    padding:0;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    background:#6E63FF;
    border:none;
  }
  .tropical .sy-title-text{
    color:#fff;
    text-align:left;
    height:22px;
    line-height:24px;
  }
  .tropical .ivu-input-small{
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
    text-align: center;
  }
  .tropical .ivu-color-picker{
    width:100%;
  }
  .tropical .ivu-color-picker-small .ivu-color-picker-color{
    width:40px;
  }
  .tropical .ivu-color-picker-color div{
    border-radius:10px;
  }
  .tropical .col_bottom{
    margin-bottom:10px;
  }

</style>
