<template>
  <div class="lighting">
    <ul class="sy-lists">
      <!--显示设置-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="4" class="ground_text">显示设置</i-col>
          <Row class="sy-context">
            <i-col span="11">
              <i-input size="small" placeholder="输入"></i-input>
            </i-col>
            <i-col span="4">
              <i-button class="lighting_button">Auto</i-button>
            </i-col>
            <i-col span="4">
              <i-button class="lighting_button">Info</i-button>
            </i-col>
          </Row>
        </Row>
      </li>

      <!--时间范围-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="4" class="ground_text">时间范围</i-col>
          <Row class="sy-context">
            <i-col span="11">
              <i-input size="small" placeholder="输入"></i-input>
            </i-col>
            <i-col span="4">
              <i-button class="lighting_button">S+</i-button>
            </i-col>
            <i-col span="4">
              <i-button class="lighting_button">S-</i-button>
            </i-col>
          </Row>
        </Row>
      </li>

      <!--正负选择-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="4" class="ground_text">正负选择</i-col>
          <Row class="sy-context">
            <i-col span="19">
              <i-select size="small">
                <i-option v-for="(item,index) in plusSelect" :value="item.value" :key="item.value">{{item.label}}</i-option>
              </i-select>
            </i-col>
          </Row>
        </Row>
      </li>

      <!--颜色设置-->
      <li>
        <Row class="forecasetime singlecolor">
          <i-col span="4" class="ground_text">颜色设置</i-col>
          <Row class="sy-context">
            <i-col span="19">
              <ColorPicker size="small" class="colorlighting" v-model="colorlighting" />
            </i-col>
          </Row>
        </Row>
      </li>

      <!--图层设置-->
      <li>
        <Row class="col_forecasetime pressurecolor" id="lightingsetting">
          <i-col span="6" class="ground_text">图层设置</i-col>
          <i-col span="4" class="switch">
            <i-switch v-model="lightingsettingswitch" @on-change="lightingsettingChange"></i-switch>
          </i-col>
        </Row>
        <Row align="middle" class="switch_collapse pressurecolor" type="flex" v-show="lightingsettingCollapse">
          <i-col span="6" class="sy_context">
            <i class="fa fa-eye"></i><p>监视阈值</p>
          </i-col>
          <i-col span="6" class="sy_context">
            <i class="fa fa-flickr"></i><p>闪烁显示</p>
          </i-col>
          <i-col span="6" class="sy_context">
            <i class="fa fa-refresh"></i><p>自动更新</p>
          </i-col>
          <i-col span="6" class="sy_context">
            <i class="fa fa-microphone"></i><p>监视声音</p>
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
        plusSelect:[
          {label:'正',value:'+'},
          {label:'负',value:'-'}
        ],//正负选择
        colorlighting:'#00ffff',//颜色设置
        lightingsettingswitch:true,
        lightingsettingCollapse:true,
      }
    },
    methods:{
      lightingsettingChange(status){
        var col_title = $("#lightingsetting");
        if(status == true){
          this.lightingsettingCollapse = true;
          col_title.css("border-bottom-left-radius","0px")
          col_title.css("border-bottom-right-radius","0px")
        }else{
          this.lightingsettingCollapse = false;
          col_title.css("border-bottom-left-radius","6px")
          col_title.css("border-bottom-right-radius","6px")
        }
      }
    },
    mounted(){
      this.$store.state.imagescolorIndex = 2;
    }
  }
</script>
<style>
  .lighting{
    color:#fff;
    font-size:12px;
    padding:0 8px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .lighting .sy-lists li{
    margin-top:5%;
  }

  /*边栏颜色*/
  .lighting .singlecolor{
    border-left:4px solid #00FFFF;
  }
  .lighting .elementcolor{
    border-left:4px solid #04A5F7;
  }
  .lighting .analyzecolor{
    border-left:4px solid #00D062;
  }
  .lighting .pressurecolor{
    border-left:4px solid #FFD200;
  }
  .lighting .managecolor{
    border-left:4px solid #6E63FF;
  }

  /*预报时间样式*/
  .lighting .forecasetime{
    height:42px;
    border-radius:6px;
    /*background-color: #171D24;*/
    background-color: #060a0e;
    box-shadow:0px 6px 12px rgba(0,0,0,0.2);
    padding:0 20px 0 8px;
  }
  .lighting .ivu-input-small{
    height:22px;
    line-height:22px;
    border-radius:14px;
    background:none;
    color:#fff;
    border:none;
    background:#273037;
    margin-top:10px;
  }
  .lighting .ground_text{
    background: transparent;
    border:none;
    line-height:42px;
    text-align: left;
  }
  .lighting .colselect_top{
    margin-top:10px;
  }
  .lighting .ivu-input-icon-normal+.ivu-input{
    border-radius:18px;
    background:#273037;
    color:#fff;
    height:22px;
    border: none;
  }
  .lighting .ivu-input-icon{
    color:#fff;
    line-height:22px;
    margin-top:12px;
  }

  /*专题选择*/
  .lighting .ivu-select-small.ivu-select-single .ivu-select-selection{
    height:22px;
    border-radius:16px;
    background:#273037;
    margin-top:10px;
    color:#fff;
    border:none;
  }
  .lighting .ivu-select-arrow{
    color:#fff;
  }

  /*开关折叠样式*/
  .lighting .col_forecasetime{
    height:42px;
    border-top-left-radius:6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #060a0e;
    padding:0 20px 0 8px;
  }
  .lighting .switch{
    margin-top:10px;
    float:right;
  }
  .lighting .switch_collapse{
    background:#171D24;
    padding: 10px 0 0 10px;
    border-top-left-radius:0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .lighting .sy-context{
    color:#fff;
    text-align: left;
    margin-bottom:10px;
  }

  .lighting .ivu-color-picker{
    width:100%;
  }
  .lighting .ivu-color-picker-small .ivu-color-picker-color{
    width:100%;
  }
  .lighting .ivu-color-picker-color div{
    border-radius:10px;
  }
  .lighting .sy_context{
    margin-bottom:10px;
  }
  .lighting .lighting_button{
    color: #fff;
    background: none;
    height: 22px;
    line-height: 22px;
    padding:0;
    width:42px;
    margin: 10px;
  }
</style>
