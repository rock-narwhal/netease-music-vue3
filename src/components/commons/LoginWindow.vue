<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import SvgIcon from "@/components/svg/SvgIcon.vue";
import {getQrKey, qrCheck, qrCreate} from "@/api/api_login.js";
import emitter from '@/utils/MittBus.js'
import {userStore} from "@/store/userStore.js";

const showLogin = ref(false)

//登录方式  QR:二维码 PW:手机号+密码  VC:手机号+验证码
const loginType = ref('QR')

const qrUrl = ref('') //二维码url
const qrKey = ref('')
const qrLogin = async () => {
  if (loginType.value !== 'QR') return
  let res = await getQrKey(new Date().getTime())
  if (res.code !== 200) return
  qrKey.value = res.data.unikey

  res = await qrCreate(qrKey.value, true, new Date().getTime())
  if (res.code !== 200) return
  qrUrl.value = res.data.qrimg
  console.log('二维码url:' + res)
  await checkQrLogin()
}

let qrCheckTimer = 0
// 刷新二维码按钮
const showRefreshQr = ref(false)

const user = userStore()
const checkQrLogin = async () => {
  window.clearInterval(qrCheckTimer)
  if (loginType.value !== 'QR' || !qrKey.value) {
    return
  }

  qrCheckTimer = window.setInterval(async () => {
    if (loginType.value !== 'QR') { //切换其他登录方式，停止校验
      window.clearInterval(qrCheckTimer)
      return
    }
    const res = await qrCheck(qrKey.value, new Date().getTime())
    console.log('二维码登录结果:', JSON.stringify(res))
    if (res.code === 800) {
      console.log('二维码过期')
      showRefreshQr.value = true
      window.clearInterval(qrCheckTimer)
      return
    }
    if (res.code === 803) {
      console.log('登录成功')
      user.doLogin(res.cookie)
      window.clearInterval(qrCheckTimer)
    }
  }, 3000)
}
//刷新二维码
const refreshQrCode = () => {
  showRefreshQr.value = false
  window.clearInterval(qrCheckTimer)
  qrLogin()
}

onMounted(() => {
  emitter.on('openLogin', () => {
    showLogin.value = true
  })
})

onUnmounted(() => {
  window.clearInterval(qrCheckTimer)
  emitter.off('openLogin')
})
//登录框开启
const openLoginWindow = () => {
  console.log('登录框打开')
  if (loginType.value === 'QR') {
    qrLogin()
  }
}
// 登录框关闭
const closeLoginWindow = () => {
  console.log('登录框关闭')
  window.clearInterval(qrCheckTimer)
}
</script>

<template>
  <el-dialog v-model="showLogin" width="350"
             @opened="openLoginWindow"
             @close="closeLoginWindow">
    <div class="login-dialog">
      <h1 class="middle title">扫码登录</h1>
      <div class="middle" style="width: 180px;height: 180px; background-color: #666666">
        <img v-lazy="qrUrl" style="width: 180px; height: 180px">
        <div class="refresh-btn-wrapper" v-show="showRefreshQr">
          <el-button type="primary" @click="refreshQrCode">刷新二维码</el-button>
        </div>
      </div>
      <p class="middle tips">使用<span style="color: #0086b3" class="pointer">网易云音乐APP</span>扫码登录</p>

      <p class="middle switch-tip pointer">选择其他登录方式
        <svg-icon name="arrow-right" class-name="font-12"></svg-icon>
      </p>
    </div>
  </el-dialog>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.login-dialog {
  width: 100%;
  height: 482px;
  border: 1px solid white;

  .middle {
    margin: 0 auto;
    text-align: center;
    position: relative;

    .refresh-btn-wrapper {
      height: 180px;
      width: 180px;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .title {
    font-size: 30px;
    color: black;
    margin-top: 60px;
    margin-bottom: 25px;
  }

  .tips {
    margin-top: 10px;
  }

  .switch-tip {
    color: @grey67;
    font-size: 12px;
    vertical-align: center;
    margin-top: 90px;
    margin-bottom: 40px;
  }
}

</style>