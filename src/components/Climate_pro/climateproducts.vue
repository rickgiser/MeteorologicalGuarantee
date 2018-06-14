<template>
  <div class="climateproducts">

    <!--站点类型-->
    <Row class="climate_title">
      <i-col span="5" class="sy-title-text">站点类型：</i-col>
      <i-col span="10">
        <i-select size="small">
          <i-option v-for="(item,index) in stationType" :value="item.value" :key="item.value">{{item.label}}</i-option>
        </i-select>
      </i-col>
    </Row>

    <!--站点名称-->
    <Row class="climate_title">
      <i-col span="5" class="sy-title-text">站点名称：</i-col>
      <i-col span="10">
        <i-select size="small">
          <i-option v-for="(item,index) in stationName" :value="item.value" :key="item.value">{{item.label}}</i-option>
        </i-select>
      </i-col>
    </Row>

    <!--起始时间-->
    <Row class="climate_title">
      <i-col span="5" class="sy-title-text">日期选择：</i-col>
      <i-col span="10" class="datePicker">
        <DatePicker  type="date" :value="timeValue"  confirm  placeholder="选择日期"></DatePicker>
      </i-col>
    </Row>

    <!--起始时间-->
    <Row class="climate_title">
      <i-col span="5" class="sy-title-text">起止时间：</i-col>
      <i-col span="10" class="datePicker">
        <TimePicker type="timerange"  :value="startendtimeValue" format="HH-mm-ss"></TimePicker>
      </i-col>
    </Row>
    <!--要素选择-->
    <Row class="climate_title">
      <Row class="sy-title-text">要素选择：</Row>
      <Row >
        <div class="climateElement">
          <Tree :data="climateElement"></Tree>
        </div>
      </Row>
    </Row>

    <!--展示方式-->
    <Row class="climate_title">
      <Row class="sy-title-text">展示方式</Row>
      <Row class="show_context" style="text-align: left;">
        <i-col span="6" v-for="(item,index) in elementshowRadion" :key="item.value">
          <Radio-group v-model="elementshowRadionshow" :value="item.value">
            <Radio :label="item.label" ></Radio>
          </Radio-group>
        </i-col>
      </Row>
    </Row>

  </div>
</template>
<script>
  import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
  export default {
    components: {ElIcon}, data() {
      return {
        timeValue:'',//日期选择
        startendtimeValue:['09:41:00', '12:00:00'],//起止时间
        stationType:[
          {label:'1024',value:'1024'},
          {label:'1025',value:'1025'},
          {label:'1026',value:'1026'},
        ],//站点类型
        stationName:[
          {label:'北京',value:'北京'},
          {label:'天津',value:'天津'},
          {label:'上海',value:'上海'},
        ],//站点名称
        climateElement:[
          {
            title: '云量',expand: true,
            children: [
              {title: '月平均云量',expand: true},
              {title: '月最高云量',expand: true},
              {title: '月最低云量',expand: true}
            ]
          },
          {
            title: '海平面气压',expand: true,
            children: [
              {title: '月平均气压',expand: true},
              {title: '月平均最高气压',expand: true},
              {title: '月平均最低气压',expand: true}
            ]
          },
          {
            title: '气温',expand: false,
            children: [
              {title: '月平均气温',expand: true},
              {title: '月平均最高气温',expand: true},
              {title: '月平均最低气温',expand: true}
            ]
          },
          {
            title: '相对湿度',expand: false,
            children: [
              {title: '月平均相对湿度',expand: true},
              {title: '月平均最高相对湿度',expand: true},
              {title: '月平均最低相对湿度',expand: true}
            ]
          },
          {
            title: '风速',expand: false,
            children: [
              {title: '月平均风速',expand: true},
              {title: '月极端最大风速',expand: true},
            ]
          },
          {
            title: '风向',expand: false,
            children: [
              {title: '月平均风向',expand: true},
            ]
          },
          {
            title: '重要天气日数',expand: false,
            children: [
              {title: '月平均天气日数',expand: true},
            ]
          },
          {
            title: '降水',expand: false,
            children: [
              {title: '月平均降水',expand: true},
            ]
          },
          {
            title: '能见度',expand: false,
            children: [
              {title: '月平均能见度',expand: true},
            ]
          },
        ],//要素选择
        elementshowRadion:[
          {label:'折线图',value:'折线图'},
          {label:'柱状图',value:'柱状图'},
        ],//分析方式
        elementshowRadionshow:'折线图',//分析方式复选框初始值
      }
    }
  }
</script>
<style>
  /*文本titile样式*/
  .climateproducts .sy-title-text{
    font-size:14px;
    color:#fff;
    text-align: left;
    margin-top:1%;
  }
  .climateproducts .climate_title{
    margin:2% 0 0 3%;
  }

  /*下拉框样式更改*/
  .climateproducts .ivu-select-small.ivu-select-single .ivu-select-selection{
    border-radius:16px;
    background:none;
    color:#fff;
  }

  /*时间选择器样式*/
  .climateproducts .ivu-time-picker-cells-list:nth-child(2),.ivu-time-picker-cells-list:nth-child(3) {
    display: block;
  }
  .climateproducts .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:none;
    color:#fff;
    height:26px;
  }
  .climateproducts .ivu-input-icon{
    color:#fff;
    line-height:26px;
  }

  /*要素选择*/
  .climateproducts .ivu-tree-title{
    color:#fff;
    font-size:12px;
  }
  .climateproducts .ivu-tree-title:hover{
    color:#fff;
    font-size:12px;
    background: none;
  }
  .climateproducts .ivu-tree-children{
    color:#fff;
    font-size:12px;
  }
  .climateproducts .ivu-tree-children:hover{
    color:#fff;
    font-size:12px;
  }
  .climateproducts .climateElement{
    text-align: left;
    padding: 0 8%;
  }
  .climateproducts .show_context{
    color:#fff;
    margin:3% 0 0 8%;
  }
</style>
