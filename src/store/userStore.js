import {defineStore} from 'pinia'

export const userStore = defineStore('user', {
    state: () => {
        return {
            isLogin: false,
            account: {},
            profile: {
                nickname: '',
                avatarUrl: ''
            },
        }
    }
})