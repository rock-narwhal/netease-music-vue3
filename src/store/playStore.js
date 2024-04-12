import {defineStore} from 'pinia'
import defaultCover from '@/assets/img/music.jpg'

export const playStore = defineStore('play', {
    state : () =>({
           playingInfo:{
               type : 1, // 0 表示在播放单曲，1表示在播放歌单
               playing: false, //正在播放
               duration: 0, //歌曲时长
               current: 0, //当前播放时间
               id: '', //歌曲id
               name: '未知音乐',
               src: '' ,//声源
               coverUrl: defaultCover, //封面
               lyric: '歌词',
               album:{ //专辑

               },
               artists:[{
                   name:'未知歌手'
               }],

           },
            // 播放列表
            playlist:[]
    }),
    actions:{
        updatePlayingInfo(song){
            this.playingInfo.id = song.id
            this.playingInfo.name = song.name
            this.playingInfo.coverUrl = song.coverUrl
            this.playingInfo.current = song.current
            this.playingInfo.duration = song.duration
            this.playingInfo.src = song.src
            this.playingInfo.current = song.current
            this.playingInfo.album = song.album
            this.playingInfo.artists = song.artists
        },
        updatePlayList(song){
            if(this.playlist.find(item => item.id = song.id)){
                return
            }
            this.playlist.unshift(song)
        },
        // 播放歌单或专辑时，替换全部播放列表
        updatePlaylistAll(list) {
            this.playList = list
        }
    }
})