<script setup>
import SearchBar from "@/components/layout/header/SearchBar.vue";
import {useRouter} from "vue-router";
import {computed} from 'vue'
import {userStore} from "@/store/userStore.js";
import emitter from '@/utils/MittBus.js'
import {ElMessage, ElMessageBox} from "element-plus";

const router = useRouter()

function goto(val) {
  router.go(val)
}

const user = userStore()
const avatarUrl = computed(() => {
  return user.isLogin ? user.profile.avatarUrl : ''
})

const clickAvatar = () => {
  if (user.isLogin) { // 已经登录，跳转到个人首页

  } else {
    emitter.emit('openLogin')
  }
}

const clickLogout = () => {
  ElMessageBox.confirm(
      '确认退出登录吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        user.doLogout()
        ElMessage({
          type: 'success',
          message: '成功退出',
        })
      }).catch(() => {
      })
}

const toHomePage = () =>{
  router.push({name:'HomePage'})
}
</script>

<template>
  <div class="header-bar">
    <!-- logo区 -->
    <div class="logo-wrap pointer">
      <i class="iconfont icon-logView" @click="toHomePage"></i>
    </div>
    <!-- 历史按钮 -->
    <div class="history-btn">
      <button @click="goto(-1)" class="btn-circle">
        <i class="iconfont icon-arrow-left-bold"></i>
      </button>
      <button @click="goto(1)" class="btn-circle">
        <i class="iconfont icon-arrow-right"></i>
      </button>
    </div>
    <div class="search-input">
      <SearchBar/>
    </div>
    <div class="logout-btn-wrap">
      <button class="cir-btn-white dark-color font-12" v-show="user.isLogin" @click="clickLogout">退出登录</button>
    </div>
    <div class="login-info font-12">{{ user.nickname }}</div>
    <div class="avatar-wrap pointer" @click="clickAvatar">
      <el-avatar :size="30" icon="el-icon-user-solid" :src="avatarUrl"></el-avatar>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.header-bar {
  align-items: center;
  color: @bgWhite;
  background-color: @headRed;
  height: 60px;
  line-height: 60px;
  width: 100%;
  top: 0;
  padding-right: 20px;
}

.icon-logView {
  font-size: 48px;
  float: left;
}

.history-btn {
  margin-left: 55px;
  display: flex;
  float: left;
  height: 100%;
  justify-content: center;
  align-items: center;

  .btn-circle {
    display: flex;
    height: 26px;
    width: 26px;
    outline: 0;
    border: 0;
    background-color: @headDeepRed;
    color: @bgWhite;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
  }
}

.search-input {
  margin-left: 10px;
  width: 220px;
  height: 100%;
  float: left;
}

.avatar-wrap {
  float: right;
  height: 100%;
  display: flex;
  align-items: center;

}

.login-info {
  float: right;
  margin-left: 10px;
}
.logout-btn-wrap{
  height: 100%;
  float: right;
  margin-left: 10px;
  display: flex;
  align-items: center;
}
</style>