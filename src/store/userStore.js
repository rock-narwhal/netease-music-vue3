import {defineStore} from 'pinia'
import {checkLoginStatus, getUserAccountInfo, getUserDetail} from "@/api/api_login.js";

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
        async doLogin(cookie) {
            document.cookie = cookie
            this.isLogin = true
            await this.queryUserAccount()
            await this.queryUserDetail()
        },
        async queryUserDetail() {
            console.log('getUserAccount')
            const res = await getUserDetail(this.account.id, new Date().getTime())
            if (res.code !== 200) return
            this.info = res
        },
        async queryUserAccount(){
            const res = await getUserAccountInfo(new Date().getTime())
            if(res.code !== 200) return
            this.account = res.data.account
            this.profile = res.data.profile || {}
        },
        async checkLogin() {
            console.log('checkLogin')
            const res = await checkLoginStatus(new Date().getTime())
            if (res.data.code !== 200) {
                this.loginOut()
                return
            }
            this.isLogin = true
            this.account = res.data.account
            this.profile = res.data.profile || {}
            await this.queryUserDetail()
        },
        loginOut() {
            console.log('loginOut')
            this.isLogin = false
            this.account = {}
            this.profile = {}
            this.createPlayList = []
            this.subscribePlaylist = []
            document.cookie = ''
        }
    }
})