import {defineStore} from 'pinia'

export const playStore = defineStore('play', {
    state : () =>{
        return {
           playingInfo:{
               type : 1, // 0 表示在播放单曲，1表示在播放歌单
               playing: false, //正在播放
               duration: 0, //歌曲时长
               songId: '', //歌曲id
               name: '未知音乐',
               src: '' ,//声源
               coverUrl: '', //封面
               lyric: '歌词',
               album:{ //专辑

               },
               artists:[],

           },
            // 播放列表
            playlist:[]
        }
    }
})