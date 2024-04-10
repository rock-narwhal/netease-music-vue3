<script setup>
import {computed, ref, reactive, onMounted, onUnmounted} from "vue";
import {userStore} from "@/store/userStore.js";
import {useRouter} from "vue-router";
import emitter from '@/utils/MittBus.js'

const user = userStore()

const menu = reactive([
  {path: '/homePage/personalrecom', title: '发现音乐', login: false, type: 0},
  {path: '/homePage/recomsongs', title: '每日推荐', login: true, type: 1},
  {path: '/homePage/video', title: '视频', login: true, type: 0},
  {path: '/homePage/personalfm', title: '私人FM', login: true, type: 0},
  {path: '/homePage/historyplay', title: '最近播放', login: false, type: 1},
  {path: '/homePage/subscribe', title: '我的收藏', login: true, type: 1}
])
const activeMenu = ref('/personalrecom')

const commonList = computed(() => {
  return menu.filter(item => item.type === 0)
})
const myList = computed(() => {
  return menu.filter(item => item.type === 1)
})

const router = useRouter()
const handleSelect = (index) => {
  router.push(index)
}

const subPath = (id) => {
  if (typeof id === 'number') return `/playlistdetail/${id}`
  return '/404'
}

const activeMenuChange = (val) => {
  activeMenu.value = val
}

onMounted(() => {
  emitter.on('activeMenuChange', activeMenuChange)
})

onUnmounted(() => {
  emitter.off('activeMenuChange')
})
</script>

<template>
  <div class="menu-container">
    <el-menu router :default-active="activeMenu" @select="handleSelect">
      <el-menu-item
          v-for="item in commonList"
          :index="item.path"
          :key="item.path"
          :disabled="item.login && !user.isLogin"
      >
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-menu-item-group>
        <template v-slot:title>我的音乐</template>
        <el-menu-item
            v-for="item in myList"
            :index="item.path"
            :key="item.path"
            :disabled="item.login && !user.isLogin">
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group v-if="user.isLogin">
        <template v-slot:title>创建的歌单</template>
        <el-menu-item
            v-for="(item,index) in user.createPlayList"
            :index="subPath(item.id)"
            :key="item.id">
          <div slot="title" class="text-hidden">
            <i v-if="index === 0" class="iconfont icon-aixin"></i>
            <i v-else class="iconfont icon-gedan"></i>
            {{ item.name }}
          </div>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group v-if="user.isLogin">
        <template v-slot:title>收藏的歌单</template>
        <el-menu-item
            v-for="item in user.subscribePlaylist"
            :index="subPath(item.id)"
            :key="item.id"
        >
          <div slot="title" class="text=hidden">
            <i class="iconfont icon-gedan"></i>
            {{ item.name }}
          </div>
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<style scoped>
.el-menu {
  width: 100%;
  border-right: none;
}
</style>