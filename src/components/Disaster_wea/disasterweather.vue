<template>
  <div class="disasterweather">
    <Row class="tab_row">
      <i-col span="5" v-for="(item,index) in weatherSelect" class="sy-title-text"><div @click="isweatherActive(index)" class="title_height" :class="{modalActive: index == currentIndex}">{{item.label}}</div></i-col>
    </Row>
    <!--危险天气-->
    <div v-show="dangerModal">
      <!--预警要素-->
      <div>
        <Row class="sy-title">预警要素</Row>
        <Row class="warninglist">
          <div>
            <Table border ref="selection" :columns="warninglist" :data="warninglistdata"></Table>
          </div>
        </Row>
      </div>

      <!--预警级别-->
      <div>
        <Row class="sy-title">预警级别</Row>
        <Row class="warningrank">
          <i-col span="6">
            <span class="rankcolor_1"></span><p>蓝色预警</p>
          </i-col>
          <i-col span="6">
            <span class="rankcolor_2"></span><p>黄色预警</p>
          </i-col>
          <i-col span="6">
            <span class="rankcolor_3"></span><p>橙色预警</p>
          </i-col>
          <i-col span="6">
            <span class="rankcolor_4"></span><p>红色预警</p>
          </i-col>
        </Row>
      </div>

      <!--预警操作-->
      <div>
        <Row class="sy-title">预警操作</Row>
        <Row class="warningrank">
          <i-col span="11">
            <i class="fa fa-volume-up"></i><p>报警声音</p>
          </i-col>
          <i-col span="11">
            <i class="fa fa-retweet"></i><p>文字滚动显示</p>
          </i-col>
        </Row>
      </div>
    </div>

    <!--极端天气-->
    <div v-show="disasterModal">
      <!--预警要素-->
      <div>
        <Row class="sy-title">预警要素</Row>
        <Row class="warninglist">
          <div>
            <Table border ref="selection" :columns="extremelist" :data="extremelistdata"></Table>
          </div>
        </Row>
      </div>
    </div>

    <!--预警操作-->
    <div>
      <Row class="sy-title">预警操作</Row>
      <Row class="warningrank">
        <i-col span="8">
          <i class="fa fa-flickr"></i><p>高亮闪烁</p>
        </i-col>
        <i-col span="8">
          <i class="fa fa-volume-up"></i><p>报警声音</p>
        </i-col>
        <i-col span="8">
          <i class="fa fa-retweet"></i><p>文字滚动显示</p>
        </i-col>
      </Row>
    </div>

  </div>
</template>
<script>
  import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
  export default {
    components: {ElIcon}, data() {
      return {
        index:0,
        currentIndex:0,
        weatherSelect:[
          {label:'危险天气',value:'危险天气'},
          {label:'极端天气',value:'极端天气'},
        ],//天气状态选择
        dangerModal:true,//危险天气
        disasterModal:false,//灾害天气
        warninglist: [
          {type: 'selection',width: 60,align: 'center'},
          {title: '预警信号',key: 'sign'},
          {title: '检测阈值',key: 'threshold'},
          {
            title: '预警符号',
            key: 'symbol',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: params.row.symbol
                  }
                }),
              ]);
            }
          }
        ],//危险预警要素列表
        warninglistdata: [
          {sign: '道路结冰',threshold: '>=10',symbol: 'icecream'},
          {sign: '暴雪预警',threshold:'>=10',symbol: 'ios-snowy'},
          {sign: '暴雨预警',threshold:'>=7',symbol: 'umbrella'},
          {sign: '冰雹预警',threshold: '>=5',symbol: 'waterdrop'},
          {sign: '大风预警',threshold: '>=0',symbol: 'arrow-swap'},
          {sign: '大露预警',threshold: '>=0',symbol: 'waterdrop'},
          {sign: '高温预警',threshold: '>=5',symbol: 'bonfire'},
          {sign: '低温预警',threshold: '>=0',symbol: 'thermometer'},
          {sign: '干旱预警',threshold: '>=10',symbol: 'ios-sunny-outline'},
          {sign: '寒潮预警',threshold: '>=7',symbol: 'ios-rainy'},
          {sign: '雷电预警',threshold: '>=5',symbol: 'ios-thunderstorm'},
          {sign: '霜冻预警',threshold: '>=10',symbol: 'thermometer'},
          {sign: '霾预警',threshold: '>=0',symbol: 'android-alert'},
          {sign: '沙尘暴预警',threshold: '>=0',symbol: 'shuffle'},
          {sign: '冻雨预警',threshold: '>=0',symbol: 'ios-cloudy'},
          {sign: '能见度预警',threshold: '>=0',symbol: 'eye'},
        ],//危险预警要素列表数据
        extremelist: [
          {type: 'selection',width: 60,align: 'center'},
          {title: '预警信号',key: 'sign'},
          {title: '检测阈值',key: 'threshold'},
          {
            title: '预警符号',
            key: 'symbol',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: params.row.symbol
                  }
                }),
              ]);
            }
          }
        ],//极端预警要素列表
        extremelistdata: [
          {sign: '高温',threshold: '>=10',symbol: 'bonfire'},
          {sign: '低温',threshold:'>=10',symbol: 'thermometer'},
          {sign: '降水',threshold:'>=7',symbol: 'umbrella'},
          {sign: '大风',threshold: '>=5',symbol: 'arrow-swap'},
          {sign: '霾',threshold: '>=0',symbol: 'android-alert'},
          {sign: '大雪',threshold: '>=0',symbol: 'ios-snowy'},
          {sign: '大露',threshold: '>=5',symbol: 'waterdrop'},
        ],//极端预警要素列表数据
      }
    },
    methods:{
      isweatherActive(index){
        this.currentIndex = index;
        if(index ==0){
          this.dangerModal = true;
          this.disasterModal = false;
        }else if(index==1){
          this.dangerModal = false;
          this.disasterModal = true;
        }
      },//控制天气tab面板切换
    }
  }
</script>
<style>
  .disasterweather .sy-title{
    color:#fff;
    font-size:14px;
    text-align:left;
    margin:3% 0 0 3%;
  }
  .disasterweather .tab_row{
    box-shadow: 0 12px 8px rgba(0,0,0,0.2);
    background: #161823;
  }
  .disasterweather .title_height {
    height:40px;  line-height:40px;
  }
  .disasterweather .sy-title-text{
    color:#fff;
    font-size:14px;
    text-align:center;
    cursor:pointer;
  }

  /*预警要素*/
  .disasterweather .warninglist{
    padding:1% 3%;
  }
  /*.disasterweather .ivu-table-column-center{*/
    /*background: none !important;*/
  /*}*/
  .disasterweather .ivu-table th{
    background: none !important;
    height:26px;
  }
  .disasterweather .ivu-table{
    background: none !important;
    color:#fff;
  }
  .disasterweather .ivu-table td{
    background: none !important;
    color:#fff;
    height:26px;
  }

  /*预警级别*/
  .disasterweather .warningrank{
    color:#fff;
    font-size:14px;
  }
  .disasterweather .warningrank span{
    display:block;
    width:20px;
    height:20px;
    margin: 5% 0 5% 36%;
  }
  .disasterweather .rankcolor_1{
    background:#1DA1F2;
  }
  .disasterweather .rankcolor_2{
    background:#ffff00;
  }
  .disasterweather .rankcolor_3{
    background:#f29100;
  }
  .disasterweather .rankcolor_4{
    background:red;
  }

</style>
