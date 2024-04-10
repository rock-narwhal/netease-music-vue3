<script setup>
import TabMenu from "@/components/menu/TabMenu.vue";
import {ref} from 'vue'

const routeList = ref([
  {name: 'PersonalRecom', path: '/homePage/personalrecom', title: '个性推荐'},
  {name: 'PlayList', path: '/homePage/playlist', title: '歌单'},
  {name: 'TopList', path: '/homePage/toplist', title: '排行榜'},
  {name: 'ArtistList', path: '/homePage/artistlist', title: '歌手'},
  {name: 'LatestPage', path: '/homePage/latest', title: '最新音乐'}
])
</script>

<template>
  <div>
    <div>
      <tab-menu :menuList="routeList" mode="route" style="margin: 0 30px"></tab-menu>
    </div>
    <div class="content-wrap">
      <div class="space-wrap"></div>
      <div class="content-area">
        <router-view v-slot="{Component}">
          <transition name="el-fade-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
      <div class="space-wrap"></div>
    </div>
  </div>
</template>

<style scoped>
.content-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  flex-wrap: nowrap;
}

.content-area {
  width: 1100px;
  box-sizing: border-box;
}

.space-wrap {
  flex-shrink: 1;
  min-width: 30px;
}
</style>