<template>
  <div class="hitguarantee">
    <!--查询条件-->
    <Row class="climate_title">
      <i-col span="5" class="sy-title-text">时间选择：</i-col>
      <i-col span="8" class="datePicker">
        <DatePicker  type="date" :value="timeValue"  confirm  placeholder="选择日期"></DatePicker>
      </i-col>
    </Row>

    <!--查询条件-->
    <Row class="climate_title">
      <Row class="sy-title-text">查询条件：</Row>
      <Row>
        <i-col span="7" v-for="(item,index) in queryCondition" class="queryCondition">
          <Checkbox-group v-model="queryConditionshow" :value="item">
            <Checkbox :label="item" ></Checkbox>
          </Checkbox-group>
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
        timeValue:'',
        queryCondition:['机场名称','机场代号','机场位置','跑道方向','起降条件'], //检索要素
        queryConditionshow:['机场名称'],//检索要素默认显示
      }
    }
  }
</script>
<style>
  /*文本titile样式*/
  .hitguarantee .climate_title{
    margin:2% 0 0 3%;
  }
  .hitguarantee .sy-title-text{
    font-size:14px;
    color:#fff;
    margin-top:1%;
    text-align: left;
  }
  /*时间选择*/
  .hitguarantee .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:none;
    color:#fff;
    height:26px;
  }
  .hitguarantee .ivu-input-icon{
    color:#fff;
    line-height:26px;
  }

  /*查询条件*/
  .hitguarantee .queryCondition{
    color:#fff;
    margin:1% 0;
  }
</style>
