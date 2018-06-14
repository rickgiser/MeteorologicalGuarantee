<template>
  <div class="timepicker">
    <div class="box">
      <div id="progressTime_control" onclick="progressTimeControl(this)" title="开始"></div>
      <div class="progressTime" id="progressTime">
        <div>
          <p id="startTime" class="startTime"></p>
          <p  id="endTime" class="endTime"></p>
        </div>
        <div class="time_slot">
          <p>06</p>
          <p>07</p>
          <p>08</p>
          <p>09</p>
          <p>10</p>
        </div>
        <div id="progressTime_concent">
          <div id="scrollBarBox">
            <div id="scrollBar">
              <div id="scroll_Track"></div>
              <div id="scroll_Thumb"></div>
            </div>
          </div>
          <div class="timecode"></div>
          <div class="line_style1">
            <div class="line_style2">
              <p id="TimeSpeed" class="line_style3">×1</p>
              <p class="line_style4" id="scrollBarTxt"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imagePlay:''
      }
    },
    methods:{

    },
    mounted(){
      SetProgressTime(null, "2017/07/29 0:00:00", "2017/08/10 0:00:00");
    }
  }
</script>
<style>
  .timepicker{
    width:100%;
  }
  .progressTime{
    z-index:140;
  }
  .startTime{
    float:left;margin-left:33px;opacity: 0;display: none;
  }
  .endTime{
    float:right;margin-right:33px;opacity: 0;display: none;
  }
  .line_style1{
    width:90%; margin-left: auto;margin-right: auto;
  }
  .line_style2{
    width:300px;float:right;margin-right:-110px;margin-top:-8px
  }
  .line_style3{
    float:left;margin-right:40px;display:none
  }
  .line_style3{
    float:right
  }
</style>

