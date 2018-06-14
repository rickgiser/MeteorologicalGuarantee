<template>
  <div class="compositemapping">
    <!--数据源选择-->
    <Row class="climate_title">
      <i-col span="6" class="sy-title-text">数据类型：</i-col>
      <i-col span="8">
        <i-select size="small">
          <i-option v-for="(item,index) in dataType" :value="item.value" :key="item.value">{{item.label}}</i-option>
        </i-select>
      </i-col>
    </Row>

    <!--范围选择-->
    <Row class="climate_title">
      <i-col span="6" class="sy-title-text">范围选择：</i-col>
      <i-col span="8">
        <i-select size="small">
          <i-option v-for="(item,index) in areadataSelect" :value="item.value" :key="item.value">{{item.label}}</i-option>
        </i-select>
      </i-col>
    </Row>

    <!--起始时间-->
    <Row class="climate_title">
      <i-col span="6" class="sy-title-text">起始时间：</i-col>
      <i-col span="8" class="datePicker">
        <DatePicker  type="date" :value="starttimeValue"  confirm  placeholder="选择日期"></DatePicker>
      </i-col>
    </Row>

    <!--终止时间-->
    <Row class="climate_title">
      <i-col span="6" class="sy-title-text">终止时间：</i-col>
      <i-col span="8" class="datePicker">
        <DatePicker  type="date" :value="endtimeValue"  confirm  placeholder="选择日期"></DatePicker>
      </i-col>
    </Row>

    <Row class="editModal">
      <i-col span="4" v-for="(item,index) in editModalSelect" class="makedatastyle"><div @click="ismodalActive(index)"  :class="{modalActive: index == currentIndex}">{{item.label}}</div></i-col>
    </Row>

    <ul>
      <!--综合制图-->
      <li v-show="mapingAll">
        <Row class="makemapdata">
          <i-col span="14" v-for="(item,index) in makemapdata" :key="item" class="makemapdata_icol">
            <Checkbox-group v-model="makemapdatashow" :value="item">
              <Checkbox :label="item" ></Checkbox>
            </Checkbox-group>
          </i-col>
        </Row>
      </li>
      <!--自定义-->
      <li v-show="customAll">
        <!--颜色设定-->
        <div>
          <!--地面填充色-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">地面填充色：</i-col>
            <i-col span="8" class="customcolor">
              <ColorPicker v-model="fillcolor1" />
            </i-col>
          </Row>

          <!--中国区域颜色-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">中国区域颜色：</i-col>
            <i-col span="8" class="customcolor">
              <ColorPicker v-model="fillcolor1" />
            </i-col>
          </Row>

          <!--国界颜色-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">国界颜色：</i-col>
            <i-col span="8" class="customcolor">
              <ColorPicker v-model="fillcolor1" />
            </i-col>
          </Row>

          <!--中国国界颜色-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">中国国界颜色：</i-col>
            <i-col span="8" class="customcolor">
              <ColorPicker v-model="fillcolor1" />
            </i-col>
          </Row>

          <!--省界颜色-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">省界颜色：</i-col>
            <i-col span="8" class="customcolor">
              <ColorPicker v-model="fillcolor1" />
            </i-col>
          </Row>

          <!--海岸线颜色-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">海岸线颜色：</i-col>
            <i-col span="8" class="customcolor">
              <ColorPicker v-model="fillcolor1" />
            </i-col>
          </Row>

          <!--经纬线颜色-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">经纬线颜色：</i-col>
            <i-col span="8" class="customcolor">
              <ColorPicker v-model="fillcolor1" />
            </i-col>
          </Row>

          <!--海洋填充色-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">海洋填充色：</i-col>
            <i-col span="8" class="customcolor">
              <ColorPicker v-model="fillcolor1" />
            </i-col>
          </Row>
        </div>
        <!--线宽设定-->
        <div>
          <!--国界线宽-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">国界线宽：</i-col>
            <i-col span="8">
              <i-select size="small">
                <i-option v-for="(item,index) in lineWidth" :value="item.value" :key="item.value">{{item.label}}</i-option>
              </i-select>
            </i-col>
          </Row>

          <!--中国国界线宽-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">中国国界线宽：</i-col>
            <i-col span="8">
              <i-select size="small">
                <i-option v-for="(item,index) in lineWidth" :value="item.value" :key="item.value">{{item.label}}</i-option>
              </i-select>
            </i-col>
          </Row>

          <!--省界线宽-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">省界线宽：</i-col>
            <i-col span="8">
              <i-select size="small">
                <i-option v-for="(item,index) in lineWidth" :value="item.value" :key="item.value">{{item.label}}</i-option>
              </i-select>
            </i-col>
          </Row>

          <!--海岸线线宽-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">海岸线线宽：</i-col>
            <i-col span="8">
              <i-select size="small">
                <i-option v-for="(item,index) in lineWidth" :value="item.value" :key="item.value">{{item.label}}</i-option>
              </i-select>
            </i-col>
          </Row>

          <!--经纬线线宽-->
          <Row class="climate_title">
            <i-col span="7" class="sy-title-text">经纬线线宽：</i-col>
            <i-col span="8">
              <i-select size="small">
                <i-option v-for="(item,index) in lineWidth" :value="item.value" :key="item.value">{{item.label}}</i-option>
              </i-select>
            </i-col>
          </Row>
        </div>

        <!--操作按钮-->
        <div class="climate_title">
          <Row class="option">
            <i-col span="6">
              <i-button>默认</i-button>
            </i-col>
            <i-col span="6">
              <i-button>确认</i-button>
            </i-col>
            <i-col span="6">
              <i-button>取消</i-button>
            </i-col>
          </Row>
        </div>
      </li>
      <!--模板编辑-->
      <li v-show="editorAll">
        <div>
          <!--标题-->
          <Row class="climate_title">
            <i-col span="6" class="sy-title-text">标题：</i-col>
            <i-col span="8">
              <Input v-model="titlevalue" placeholder="请输入标题" size="small" />
            </i-col>
          </Row>

          <!--分析日期-->
          <Row class="climate_title">
            <i-col span="6" class="sy-title-text">分析日期：</i-col>
            <i-col span="8">
              <Input v-model="titlevalue" placeholder="请输入分析日期" size="small"/>
            </i-col>
          </Row>

          <!--制作单位-->
          <Row class="climate_title">
            <i-col span="6" class="sy-title-text">制作单位：</i-col>
            <i-col span="8">
              <Input v-model="titlevalue" placeholder="请输入单位" size="small"/>
            </i-col>
          </Row>

          <!--发布日期-->
          <Row class="climate_title">
            <i-col span="6" class="sy-title-text">发布日期：</i-col>
            <i-col span="8">
              <Input v-model="titlevalue" placeholder="请输入发布日期" size="small"/>
            </i-col>
          </Row>


          <!--发布人-->
          <Row class="climate_title">
            <i-col span="6" class="sy-title-text">发布人：</i-col>
            <i-col span="8">
              <Input v-model="titlevalue" placeholder="请输入发布人" size="small"/>
            </i-col>
          </Row>


          <!-- 标题栏位置-->
          <Row class="climate_title">
            <i-col span="6" class="sy-title-text">标题栏位置：</i-col>
            <i-col span="8">
              <i-select size="small">
                <i-option v-for="(item,index) in titleplace" :value="item.value" :key="item.value">{{item.label}}</i-option>
              </i-select>
            </i-col>
          </Row>


          <!--图例位置-->
          <Row class="climate_title">
            <i-col span="6" class="sy-title-text">图例位置：</i-col>
            <i-col span="8">
              <i-select size="small">
                <i-option v-for="(item,index) in legendplace" :value="item.value" :key="item.value">{{item.label}}</i-option>
              </i-select>
            </i-col>
          </Row>

          <Row class="option">
            <i-col span="8">
              <i-button>默认</i-button>
            </i-col>
            <i-col span="8">
              <i-button>确认</i-button>
            </i-col>
            <i-col span="8">
              <i-button>取消</i-button>
            </i-col>
          </Row>
        </div>

      </li>
    </ul>
  </div>
</template>
<script>
  import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
  export default {
    components: {ElIcon}, data() {
      return {
        dataType:[
          {label:'T511',value:'T511'},
          {label:'T639',value:'T639'},
        ],//数据类型选择
        areadataSelect:[
          {label:'日本',value:'日本'},
          {label:'欧洲',value:'欧洲'},
        ],//范围选择
        starttimeValue:'',//起始时间
        endtimeValue:'',//终止时间
        editModalSelect:[
          {label:'综合制图',value:'综合制图'},
          {label:'自定义',value:'自定义'},
          {label:'模板编辑',value:'模板编辑'},
        ],//模板类型选择
        index:0,//模板类型样式初始值
        currentIndex:0,//模板类型样式切换后的状态
        mapingAll:true,//综合制图
        customAll:false,//自定义
        editorAll:false,//地图编辑
        makemapdata:['850hpa综合图','750hpa综合图','500hpa综合图','700+850hpa综合图'],//综合制图内容
        makemapdatashow:['850hpa综合图'],//综合制图默认显示
        fillcolor1:'#00ff00',//地面填充色
        lineWidth:[
          {label:'1',value:'1'},
          {label:'2',value:'2'},
          {label:'3',value:'3'},
        ],//线宽设置
        titlevalue:'',//标题
        titleplace:[
          {label:'左上',value:'左上'},
          {label:'右上',value:'右上'},
          {label:'居中',value:'居中'},
        ],//标题栏位置
        legendplace:[
          {label:'左下',value:'左下'},
          {label:'右下',value:'右下'},
        ],//图例位置
      }
    },
    methods:{
      ismodalActive(index){
        this.currentIndex = index;
        switch(index){
          case 0:
              this.mapingAll = true;
              this.customAll = false;
              this.editorAll = false;
              break;
          case 1:
            this.mapingAll = false;
            this.customAll = true;
            this.editorAll = false;
            break;
          case 2:
            this.mapingAll = false;
            this.customAll = false;
            this.editorAll = true;
            break;
        }
      }
    }
  }
</script>
<style>
  .compositemapping .sy-title-text{
    font-size:14px;
    color:#fff;
    text-align: right;
    line-height:26px;
  }
  .compositemapping .climate_title{
    margin:3% 0;
  }
  /*下拉框样式更改*/
  .compositemapping .ivu-select-small.ivu-select-single .ivu-select-selection{
    border-radius:16px;
    background:none;
    color:#fff;
  }

  /*日期选择器样式*/
  .compositemapping .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:none;
    color:#fff;
    height:26px;
  }
  .compositemapping .ivu-input-icon{
    color:#fff;
    line-height:26px;
  }

  /*模板tab切换*/
  .compositemapping .editModal{
    font-size:14px;
    color:#fff;
    margin-left: 4%;
    cursor: pointer;
  }
  /*综合制图样式*/
  .compositemapping .makemapdata{
    color:#fff;
    text-align:left;
    margin-left:6%;
  }
  .compositemapping .makedatastyle{
    width: 20%;
    height: 30px;
    line-height: 30px;
  }
  .compositemapping .makemapdata_icol{
    margin: 3% 0 6% 0
  }

  /*自定义填充颜色*/
  .compositemapping .customcolor{
    text-align:left;
    margin-left:1%;
  }
  .compositemapping .ivu-color-picker-color{
    width:50px;
    height:12px;
  }

  /*模板编辑*/
  .compositemapping .ivu-input-small{
    background:none;
    color:#fff;
  }

  /*操作按钮编辑*/
  .compositemapping .ivu-btn{
    color: #fff;
    background: none;
    border-radius: 5px;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
  }
  .compositemapping .option{
    margin-top:3%
  }
</style>
