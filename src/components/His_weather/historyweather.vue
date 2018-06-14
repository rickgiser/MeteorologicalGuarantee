<template>
  <div class="historyweather">
    <ul>
      <!--数据源选择-->
      <li>
        <Row>
          <i-col span="6" class="sy-title-text">数据源选择：</i-col>
          <i-col span="8">
            <i-select size="small">
              <i-option v-for="(item,index) in hisSourecedata" :value="item.value" :key="item.value">{{item.label}}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!--范围选择-->
      <li>
        <Row>
          <i-col span="6" class="sy-title-text">范围选择：</i-col>
          <i-col span="8">
            <i-select size="small">
              <i-option v-for="(item,index) in hisareaSelect" :value="item.value" :key="item.value">{{item.label}}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!--站点选择-->
      <li>
        <Row>
          <i-col span="6" class="sy-title-text">站点选择：</i-col>
          <i-col span="8">
            <i-select size="small">
              <i-option v-for="(item,index) in stationSelect" :value="item.value" :key="item.value">{{item.label}}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!--起始时间-->
      <li>
        <Row>
          <i-col span="6" class="sy-title-text">起始时间：</i-col>
          <i-col span="8" class="datePicker">
            <DatePicker  type="date" :value="starttimeValue"  confirm  placeholder="选择日期"></DatePicker>
          </i-col>
        </Row>
      </li>

      <!--终止时间-->
      <li>
        <Row>
          <i-col span="6" class="sy-title-text">终止时间：</i-col>
          <i-col span="8" class="datePicker">
            <DatePicker  type="date" :value="endtimeValue"  confirm  placeholder="选择日期"></DatePicker>
          </i-col>
        </Row>
      </li>

      <!--检索要素-->
      <li>
        <Row class="sy-title-text">检索要素</Row>
        <Row class="select_context">
          <i-col span="6" v-for="(item,index) in searchElement" :key="item.value">
            <Checkbox-group v-model="searchElementshow" :value="item.value">
              <Checkbox :label="item.label" ></Checkbox>
            </Checkbox-group>
          </i-col>
        </Row>
      </li>

      <!--检索列表-->
      <li>
        <Row class="sy-title">检索列表</Row>
        <Row class="selectlist">
          <div>
            <Table border ref="selection" :columns="selectlist" :data="selectlistdata"></Table>
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
        hisSourecedata:[
          {label:'地面实况',value:'地面实况'},
          {label:'高空实况',value:'高空实况'},
        ],//数据源选择
        hisareaSelect:[
          {label:'全国',value:'全国'},
          {label:'北京',value:'北京'},
        ],//范围选择
        stationSelect:[
          {label:'单站',value:'单站'},
          {label:'多站点联合统计',value:'多站点联合统计'},
        ],//站点选择
        starttimeValue:'',//起始时间
        endtimeValue:'',//终止时间
        searchElement:[
          {label:'高温',value:'高温'},
          {label:'低温',value:'低温'},
          {label:'降水',value:'降水'},
          {label:'大风',value:'大风'},
          {label:'大雪',value:'大雪'},
          {label:'雷暴',value:'雷暴'},
          {label:'大雾',value:'大雾'},
        ],//检索要素
        searchElementshow:'高温',//检索要素默认显示
        selectlist: [
//          {type: 'selection',width: 60,align: 'center'},
          {title: '编号',key: 'date'},
          {title: '省份',key: 'province'},
          {title: '类型',key: 'type'},
          {title: '时间',key: 'time'}
        ],//气旋信息列表数
        selectlistdata: [
          {date: '021',province: '山东省',type:'大雪',time: '2008-4-5'},
          {date: '022',province:'河北省',type:'大雨',time: '2008-4-6'},
          {date: '023',province:'北京市',type:'冰雹',time: '2008-4-7'},
          {date: '024',province: '广州省',type:'沙尘',time: '2008-4-8'},
          {date: '025',province: '山西省',type:'大风',time: '2008-4-9'}
        ],//气旋信息列表数据
      }
    }
  }
</script>
<style>
  .historyweather .sy-title{
    color:#fff;
    font-size:14px;
    text-align:left;
    margin:3% 0 0 3%;
  }
  .historyweather .sy-title-text{
    color:#fff;
    font-size:14px;
    text-align:left;
    margin:1% 0 0 3%;
  }

  /*检索要素*/
  .historyweather .select_context{
    color:#fff;
  }

  /*检索列表*/
  .historyweather .selectlist{
    padding:1% 3%;
  }
</style>
