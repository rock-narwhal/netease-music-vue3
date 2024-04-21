import {defineStore} from 'pinia'
import {checkLoginStatus, getUserAccountInfo, getUserDetail, logout} from "@/api/api_login.js";

export const userStore = defineStore('user', {
    state: () => {
        return {
            isLogin: false,
            account: {
                id: 0,
                userName: ''
            },
            profile: {
                nickname: '',
                avatarUrl: ''
            },
            info: {},
            createPlayList: [], //创建的歌单
            subscribePlaylist: [], //收藏的歌单
        }
    },
    getters: {
        nickname() {
            if (this.isLogin) {
                return this.profile.nickname ? this.profile.nickname : this.account.userName
            }
            return '未登录'
        }
    },
    actions: {
        async doLogout(){
            const res = await logout()
            if(res.code !== 200) return
            this.clearLogInfo()
        },
        async doLogin(cookie) {
            localStorage.setItem('loginCookie', cookie)
            this.isLogin = true
            await this.queryUserAccount()
            await this.queryUserDetail()
        },
        async queryUserDetail() {
            const res = await getUserDetail(this.account.id)
            if (res.code !== 200) return
            this.info = res
        },
        async queryUserAccount(){
            const res = await getUserAccountInfo()
            if(res.code !== 200) return
            this.account = res.account
            this.profile = res.profile || {}
        },
        async checkLogin() {
            const res = await checkLoginStatus()
            if (!res.data || res.data.code !== 200 || !res.data.profile) {
                this.clearLogInfo()
                return
            }
            console.log("checkLoginStatus success :")
            this.isLogin = true
            this.account = res.data.account
            this.profile = res.data.profile
            await this.queryUserDetail()
        },
        clearLogInfo() {
            this.isLogin = false
            this.account = {}
            this.profile = {}
            this.createPlayList = []
            this.subscribePlaylist = []
            document.cookie = ''
            localStorage.removeItem('loginCookie')
        }
    }
})