<template>
  <div class="projectdisplay">
    <!--预报时间-->
    <Row class="forecasetime singlecolor">
      <i-col span="4" class="ground_text">预报时间</i-col>
      <i-col span="8" class="datePicker">
        <DatePicker  type="date" :value="timeValue"  confirm  @on-change="getDate" placeholder="选择日期"></DatePicker>
      </i-col>
      <i-col span="8" class="selecttime">
        <TimePicker :value="Htime" class="getTime" format="HH"></TimePicker>
      </i-col>
    </Row>
    <ul class="sy-lists">
      <!-- 模式选择 start-->
      <li style="border-top:none">
        <Row class="sy-comm">
          <Row class="col_forecasetime pressurecolor" id="pro_modalSelect">
            <i-col span="6" class="ground_text">模式选择</i-col>
            <i-col span="4" class="switch">
              <i-switch v-model="promodalswitch" @on-change="promadalswitchChange"></i-switch>
            </i-col>
          </Row>
          <Row class="switch_collapse pressurecolor" v-show="promodalCollapes">
            <i-col span="12" v-for="(item,index) in pattern">
              <i-button  class="modal_button" @click="proModalclick(item,index)" :class="item.disable? 'isivu-btn':'ivu-btn'">{{item.msg}}</i-button>
            </i-col>
          </Row>
        </Row>
      </li>

      <!-- 显示类型 start-->
      <li>
        <Row class="col_forecasetime elementcolor" id="pro_showtypeSelect">
          <i-col span="6" class="ground_text">显示类型</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="proshowtypeswitch" @on-change="proshowtypeswitchChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse elementcolor" type="flex" v-show="proshowtypeCollapse">
          <i-col span="8" class="sy-context" v-for="(item,index) in showList" :key="index">
            <Radio-group v-model="showSty">
              <Radio :label="item.msg" ></Radio>
            </Radio-group>
          </i-col>
        </Row>
      </li>
      <!-- 预报时次 start-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">预报时次</i-col>
          <i-col span="18">
            <i-select size="small">
              <i-option v-for="(item,index) in time" :value="item.value" :key="index">{{ item.label }}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!-- 层次选择 start-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">层次选择</i-col>
          <i-col span="18">
            <i-select size="small">
              <i-option v-for="(item,index) in hetare" :value="item.value" :key="index">{{ item.label }}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!-- 区域选择 start-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">区域选择</i-col>
          <i-col span="18">
            <i-select size="small">
              <i-option v-for="(item,index) in hetare1" :value="item.value" :key="index">{{ item.label }}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!-- 要素选择 start-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="6" class="ground_text">要素选择</i-col>
          <i-col span="18">
            <i-select size="small">
              <i-option v-for="(item,index) in elemt" :value="item.msg" :key="index">{{ item.msg }}</i-option>
            </i-select>
          </i-col>
        </Row>
      </li>

      <!-- 图层管理面板 start-->
      <li>
        <Row class="sy-comm">
          <Row class="col_forecasetime managecolor" id="pro_manageSelect">
            <i-col span="6" class="ground_text">图层管理</i-col>
            <i-col span="4" class="switch">
              <i-switch v-model="promanageswitch" @on-change="promanageswitchChange"></i-switch>
            </i-col>
          </Row>
          <Row class="switch_collapse managecolor" v-show="promanageCollapes">

          </Row>
        </Row>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        elemt: [  //预报要素
          {msg: '风'},
          {msg: '地面气压'},
          {msg: '温度'},
          {msg: '相对气压'},
          {msg: '相对温度'},
          {msg: '降水量'},
          {msg: '总降水量'},
          {msg: '平均海平面气压'},
          {msg: '散度'},
          {msg: '位势高度'},
          {msg: '水汽通量散度'},
          {msg: '涡度'},
          {msg: '相当位温'},
          {msg: '温度露点差'},
          {msg: '地面温度'},
          {msg: '垂直速度'},
          {msg: '垂直速度'}
        ],
        pattern: [
          {msg: '欧洲集合预报-ENS_EQ_D',disable:false},
          {msg: '美国集合预报-GEFS',disable:false},
          {msg: 'GRAPES中尺度集合预报',disable:false},
          {msg: '国家T639全球集合预报',disable:false}
        ],//模式选择
        promodalswitch:true,//模式选择开关
        promodalCollapes:true,//模式选择折叠面板
        proshowtypeswitch:true,//显示类型开关
        proshowtypeCollapse:true,//显示类型折叠面板
        promanageswitch:true,//图层管理开关
        promanageCollapes:true,//图层管理折叠面板
        showList: [   //显示类型
          {msg: '面条图'},
          {msg: '集合平均离散度'},
          {msg: '概率预报'},
          {msg: '邮票图'},
          {msg: '分位数产品'},
          {msg: '极端预报指数'}
        ],
        time: [
          {value:'03',label:'03'},
          {value:'06',label:'06'},
          {value:'09',label:'09'},
          {value:'12',label:'12'},
          {value:'15',label:'15'},
          {value:'18',label:'18'},
          {value:'21',label:'21'}
          ], //预报时次
        time1: [
          {value:'03',label:'03'},
          {value:'06',label:'06'},
          {value:'09',label:'09'},
          {value:'12',label:'12'},
          {value:'15',label:'15'},
          {value:'18',label:'18'},
          {value:'21',label:'21'},
          {value:'24',label:'24'},
          {value:'27',label:'27'},
          {value:'30',label:'30'},
          {value:'33',label:'33'},
          {value:'36',label:'36'},
          {value:'39',label:'39'},
          {value:'42',label:'42'},
          {value:'45',label:'45'},
          {value:'48',label:'48'},
          {value:'51',label:'51'},
          {value:'54',label:'54'},
          {value:'57',label:'57'}
          ],//其他预报时次
        hetare: [
          {value:'200hpa',label:'200hpa'},
          {value:'500hpa',label:'500hpa'},
          {value:'700hpa',label:'700hpa'},
          {value:'850hpa',label:'850hpa'}
          ],//高度场
        hetare1: [
          {value:'10',label:'10'},
          {value:'20',label:'20'},
          {value:'50',label:'50'},
          {value:'70',label:'70'}
          ],//其他高度场
        t_value: '',//时间
        timeValue: '',//日期
        Htime: new Date(),//默认的日期显示
        showSty: '面条图',   //显示方式
        time_value: '',   //预报时次
        hetare_value: '',  //高度场
        Layermanagevalue:'1',
      }
    },
    methods: {
      getDate(value) { //获取日期
        this.timeValue = value ;
      },
      Pretime(){ //前一天
        this.timeValue = this.$store.state.PreTime(this.timeValue);
      },
      Nexttime(){ //后一天
        this.timeValue = this.$store.state.NextTime(this.timeValue);
      },
      Reset(){  //刷新
        this.timeValue = '';
      },
      proModalclick(item,index){
        item.disable = !item.disable;
      },
      promadalswitchChange(status){
        var col_title = $("#pro_modalSelect");
        if (status == true) {
          this.promodalCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.promodalCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//模式选择点击方法
      proshowtypeswitchChange(status){
        var col_title = $("#pro_showtypeSelect");
        if (status == true) {
          this.proshowtypeCollapse = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.proshowtypeCollapse = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//显示类型点击方法
      promanageswitchChange(status){
        var col_title = $("#pro_manageSelect");
        if (status == true) {
          this.promanageCollapes = true;
          col_title.css("border-bottom-left-radius", "0px")
          col_title.css("border-bottom-right-radius", "0px")
        } else {
          this.promanageCollapes = false;
          col_title.css("border-bottom-left-radius", "6px")
          col_title.css("border-bottom-right-radius", "6px")
        }
      },//图层管理点击方法
    },
    mounted() {
      this.timeValue = this.$store.state.formatDate(new Date());
      this.$store.state.colorIndex=  3;
    }
  }

</script>

<style>
  /*总体样式*/
  .projectdisplay{
    color:#fff;
    font-size:12px;
    padding:20px 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .projectdisplay .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .projectdisplay .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .projectdisplay .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .projectdisplay .analyzecolor{
    border-left:4px solid #00D062;
  }
  .projectdisplay .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .projectdisplay .managecolor{
    border-left:4px solid #6E63FF;
  }

  /*预报时间样式*/
  .projectdisplay .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .projectdisplay .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .projectdisplay .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .projectdisplay .ivu-input-icon{
    color:#fff;
    line-height:22px;
  }

  /*投影方式*/
  .projectdisplay .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    margin-top:10px;
    color:#fff;
    border:none;
  }
  .projectdisplay .ivu-select-arrow{
    color:#fff;
  }

  /*开关折叠样式*/
  .projectdisplay .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .projectdisplay .switch{
    margin-top:10px;
    float:right;
  }
  .projectdisplay .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .projectdisplay .ivu-switch-checked{
    border-color: #00D062;
    background-color: #00D062;
  }



/*模式选择*/
.projectdisplay .sy-title-text{
  color:#fff;
  font-size:14px;
  padding-left:5%;
  text-align: left;
}
  .projectdisplay .ivu-btn{
    border:none;
    background:#0D1014;
    color:#fff;
    border-radius:2px;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    height: 26px;
    padding: 0 10px;
    margin:0 5px 10px 0;
    line-height:26px;
    width: 165px;
  }
  .projectdisplay .isivu-btn{
    width: 165px;
    border:none;
    background:#04A5F7;
    color:#fff;
    border-radius:2px;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
    height: 26px;
    padding: 0 10px;
    margin:0 5px 10px 0;
    line-height:26px;
  }

  /*显示类型*/
.projectdisplay .sy-comm{
  margin-top:3%;
}
.projectdisplay .sy-context{
  text-align: left;
  margin-bottom:10px;
}


/*折叠菜单样式start*/
.projectdisplay .ivu-collapse{
  background:none;
  border:none;
}
.projectdisplay .ivu-collapse-content>.ivu-collapse-content-box{
  padding-top:0;
}
.projectdisplay .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
  color:#fff;
  padding-left:0;
}
.projectdisplay .ivu-collapse-content{
  background:none;
  padding:0;
}

/*图层管理样式start*/
.projectdisplay .managelabel{
  padding-left:5%;
}
.projectdisplay .tuceng{
  display: block;
  margin-bottom:5px;
  width:20%;
}
.projectdisplay .tucengelement{
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
.projectdisplay .elementdisclick{
  cursor:text;
}
.projectdisplay .elementdisclick:hover{
  border:1px solid #ddd;
}
.projectdisplay .elementclick:hover{
  color:#fff;
  border: 1px solid rgba(45,140,240,.9);
  border-radius: 14px;
}
</style>
