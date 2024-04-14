<script setup>
import {ref, onMounted, watch, onUnmounted} from 'vue'
import emitter from '@/utils/MittBus.js'
import {useRoute} from "vue-router";
import HeaderBar from "@/components/layout/HeaderBar.vue";
import LeftAside from "@/components/layout/LeftAside.vue";
import FooterBar from "@/components/layout/FooterBar.vue";
import LoginWindow from "@/components/commons/LoginWindow.vue";
import {userStore} from "@/store/userStore.js";

const contentRef = ref(null)
const user = userStore()
onMounted(() => {
  emitter.on('contentScrollTop', () => {
    contentRef.value.scrollTop || (contentRef.value.scrollTop = 0)
  })
  user.checkLogin()
})

onUnmounted(() => {
  emitter.off('contentScrollTop')
})

//监听路由，通知leftAside
const route = useRoute()
watch(() => route.path, val => {
  contentRef.value.scrollTop || (contentRef.value.scrollTop = 0)
  emitter.emit('activeManuChange', val)
})
</script>

<template>
  <div class="layout">
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
      <div class="content" ref="contentRef">
        <router-view v-slot="{Component}">
          <transition name="el-fade-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>

      <!--    播放器抽屉-->
      <div class="player-drawer"></div>

      <!--    右侧播放列表抽屉-->
      <div class="playlist-drawer"></div>
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
  }
}

.footer {
  position: absolute;
  height: 80px;
  width: 100%;
  bottom: 0;
}
</style>