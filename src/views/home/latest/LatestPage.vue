<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";
// 子页面 0 新歌页 1新碟页
const activePage = ref(0)

const routes = ref(['LatestSongs', 'LatestAlbums'])

const router = useRouter()
const toSubPage = (active) => {
  if (activePage.value === active) {
    return
  }
  activePage.value = active
  router.push({name: routes.value[active]})
}
</script>

<template>
  <div class="container">
    <div class="top-btn-wrap">
      <div class="btn-outer">
        <button class="no-btn" :class="{'active-btn': activePage === 0}" @click="toSubPage(0)">新歌速递</button>
        <button class="no-btn" :class="{'active-btn': activePage === 1}" @click="toSubPage(1)">新碟上架</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.container {
  .top-btn-wrap {
    width: 100%;

    .btn-outer {
      height: 32px;
      width: 202px;
      margin: auto;
      border: 1px solid #d0d0d0;
      box-sizing: border-box;
      border-radius: 16px;

      button {
        height: 30px;
        width: 100px;
        border-radius: 16px;
        box-sizing: border-box;

        &:hover {
          background-color: #e7e7e7;
        }
      }

      button.active-btn {
        background-color: #d0d0d0;
        color: white;
      }
    }
  }
}
</style>