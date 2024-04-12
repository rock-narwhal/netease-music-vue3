<script setup>
import {ref, onMounted, onUnmounted, watch} from 'vue'
import SvgIcon from "@/components/svg/SvgIcon.vue";
import {captchaSent, captchaVerify, getQrKey, qrCheck, qrCreate} from "@/api/api_login.js";
import emitter from '@/utils/MittBus.js'
import {userStore} from "@/store/userStore.js";
import logo from '@/assets/img/cloudMusic.png'
import {ElMessage} from "element-plus";

const showLogin = ref(false)

//登录方式  QR:二维码 PW:手机号+密码  VC:手机号+验证码
const loginType = ref('QR')
watch(loginType, (val) => {
  if (val === 'QR') {
    qrLogin()
  } else {
    window.clearInterval(qrCheckTimer)
  }
})

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
    if (res.code === 800) {
      showRefreshQr.value = true
      window.clearInterval(qrCheckTimer)
      return
    }
    if (res.code === 803) {
      await user.doLogin(res.cookie)
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
  if (loginType.value === 'QR') {
    qrLogin()
  }
}
// 登录框关闭
const closeLoginWindow = () => {
  window.clearInterval(qrCheckTimer)
}

const switchLoginType = (type) => {
  loginType.value = type
}

const phone = ref('')

const verCode = ref('')

const sendVerCode = () => {
  if(!phone.value) return
  const res = captchaSent(phone.value)
  if(res.code !== 200){
    ElMessage('验证码发送失败，请稍后再试!')
  }
}

const vcLogin = async () =>{
  const res = await captchaVerify(phone.value, verCode.value)
  if(res.code !== 200) return
  ElMessage('登录成功')
  await user.doLogin(document.cookie)
}
</script>

<template>
  <el-dialog v-model="showLogin" width="350"
             @opened="openLoginWindow"
             @close="closeLoginWindow">
    <div class="login-dialog" v-show="loginType === 'QR'">
      <h1 class="middle title">扫码登录</h1>
      <div class="middle" style="width: 180px;height: 180px; background-color: #666666">
        <img v-lazy="qrUrl" style="width: 180px; height: 180px">
        <div class="refresh-btn-wrapper" v-show="showRefreshQr">
          <el-button type="primary" @click="refreshQrCode">刷新二维码</el-button>
        </div>
      </div>
      <p class="middle tips">使用<span style="color: #0086b3" class="pointer">网易云音乐APP</span>扫码登录</p>

      <p class="middle switch-tip pointer" @click="switchLoginType('VC')">选择其他登录方式
        <svg-icon name="arrow-right" class-name="font-12"></svg-icon>
      </p>
    </div>
    <div class="login-dialog" v-show="loginType === 'VC'">
      <div class="middle logo" style="width: 80px;height: 80px;">
        <img :src="logo" width="80px" height="80px" alt="">
      </div>
      <div class="middle input-wrapper">
        <el-input v-model="phone"
                  style="width: 250px"
                  type="text"
                  placeholder="请输入手机号" class="phone-input"></el-input>
        <el-input v-model="verCode"
                  style="width: 250px"
                  type="text">
          <template #append>
            <el-button @click="sendVerCode">获取验证码</el-button>
          </template>
        </el-input>
      </div>
      <div class="middle login-button">
        <button class="btn-red" @click="vcLogin">登 录</button>
      </div>
      <p class="middle tips">使用<span style="color: #0086b3" class="pointer">手机验证码</span>登录</p>

      <p class="middle switch-tip2 pointer" @click="switchLoginType('QR')">选择其他登录方式
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

  .input-wrapper{
    margin-top: 50px;

    .phone-input{
      margin-bottom: 10px;
    }
  }
  .login-button{
    margin-top: 80px;

    .btn-red{
      width: 250px;
      height: 40px;
      font-size: 16px;
    }
  }
  .switch-tip2{
    color: @grey67;
    font-size: 12px;
    vertical-align: center;
    margin-top: 71px;
    margin-bottom: 40px;
  }
}

</style>