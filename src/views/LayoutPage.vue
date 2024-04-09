<script setup>

</script>

<template>
  <div class="layout">
    <!--  顶栏-->
    <div class="header"></div>
    <!--  中间区-->
    <div class="main">
      <!--    左边菜单栏-->
      <div class="aside">

      </div>
      <!--    中间内容区-->
      <div class="content" ref="contentRef"></div>

      <!--    播放器抽屉-->
      <div class="player-drawer"></div>

      <!--    右侧播放列表抽屉-->
      <div class="playlist-drawer"></div>
    </div>

    <!--  底部栏-->
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine";

.header {
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0;
}

.main {
  width: 100%;
  position: absolute;
  top: 60px;
  bottom: 80px;
  height: auto;
  border-bottom: 1px solid @border;
  display: flex;

  .aside{
    width: 235px;
    height: auto;
    overflow-y: auto;
    box-sizing: border-box;
    border-right: 1px solid @border;
  }

  .content {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: auto;
  }
}

.footer {
  position: absolute;
  height: 80px;
  width: 100%;
  bottom: 0;
}
</style>