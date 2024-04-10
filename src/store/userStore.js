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
            createPlayList:[], //创建的歌单
            subscribePlaylist:[], //收藏的歌单
        }
    }
})