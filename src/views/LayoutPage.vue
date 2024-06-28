<script setup>
import {ref, onMounted, watch, onUnmounted, onBeforeMount} from 'vue'
import emitter from '@/utils/MittBus.js'
import {useRoute} from "vue-router";
import HeaderBar from "@/components/layout/HeaderBar.vue";
import LeftAside from "@/components/layout/LeftAside.vue";
import FooterBar from "@/components/layout/FooterBar.vue";
import LoginWindow from "@/components/commons/LoginWindow.vue";
import PlaylistDrawer from "@/components/drawer/PlaylistDrawer.vue";
import {userStore} from "@/store/userStore.js";
import PlayerDrawer from "@/views/player/PlayerDrawer.vue";

const contentRef = ref(null)
const user = userStore()

onBeforeMount(() => {
  user.checkLogin()
})
onMounted(() => {
  emitter.on('contentScrollTop', () => {
    if (contentRef.value.scrollTop > 0) {
      contentRef.value.scrollTop = 0
    }
  })
})

onUnmounted(() => {
  emitter.off('contentScrollTop')
})

//监听路由，通知leftAside
const route = useRoute()
watch(() => route.path, val => {
  if (contentRef.value.scrollTop > 0) {
    contentRef.value.scrollTop = 0
  }
  emitter.emit('activeManuChange', val)
})
</script>

<template>
  <div class="layout">
<!--    顶栏 + 内容区  播放器页面大小-->
    <div class="up-area">
      <!--  顶栏-->
      <div class="header">
        <HeaderBar></HeaderBar>
      </div>
      <!--  中间区-->
      <div class="main">
        <!--    左边菜单栏-->
        <div class="aside">
          <LeftAside></LeftAside>
        </div>
        <!--    中间内容区-->
        <div id="content" class="content" ref="contentRef">
          <router-view v-slot="{Component}">
            <transition name="el-fade-in">
              <component :is="Component"></component>
            </transition>
          </router-view>
        </div>

        <!--    右侧播放列表抽屉-->
        <div class="playlist-drawer">
          <playlist-drawer></playlist-drawer>
        </div>
      </div>

      <!--    播放器抽屉-->
      <player-drawer></player-drawer>
    </div>

    <!--  底部栏-->
    <div class="footer">
      <FooterBar></FooterBar>
    </div>
    <!--    登录弹窗-->
    <LoginWindow></LoginWindow>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine";
.up-area{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 81px;
}

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
  height: auto;
  bottom: 0;
  display: flex;

  .aside {
    width: 225px;
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
    scroll-behavior: smooth; //平滑滚动
  }
}

.footer {
  position: absolute;
  height: 81px;
  width: 100%;
  bottom: 0;
  border-top: 1px solid @border;
  z-index: 200;
}
</style>