import {defineStore} from 'pinia'
import defaultCover from '@/assets/img/music.jpg'

export const playStore = defineStore('play', {
    state: () => ({
        playingInfo: {
            type: 1, // 0 表示在播放单曲，1表示在播放歌单
            playing: false, //正在播放
            duration: 0, //歌曲时长
            current: 0, //当前播放时间
            id: 0, //歌曲id
            name: '未知音乐',
            src: '',//声源
            coverUrl: defaultCover, //封面
            lyric: '歌词',
            album: { //专辑

            },
            artists: [{
                name: '未知歌手'
            }],
            data: [], //音源信息，多种音质的音源,
            volume: 50, //音量
            mute: false, //静音
            fee: 0, //收费/免费
        },
        // 播放列表
        playlist: []
    }),
    getters: {
        getNext() {
            if (this.playlist.length === 0) {
                return null
            }
            if (this.playingInfo.id === 0) {
                return this.playlist[0]
            }
            let index = this.playlist.findIndex(item => item.id === this.playingInfo.id)
            return this.playlist[(index + 1) % this.playlist.length]
        },
        getPre() {
            if (this.playlist.length === 0) {
                return null
            }
            if (this.playingInfo.id === 0) {
                return this.playlist[0]
            }
            let index = this.playlist.findIndex(item => item.id === this.playingInfo.id)
            return this.playlist[(index - 1 + this.playlist.length) % this.playlist.length]
        },
        getRandom() {
            if (this.playlist.length === 0) {
                return null
            }
            if (this.playlist.length === 1) { //playList只有一首歌
                if (this.playlist[0].id === this.playingInfo.id) {
                    return null
                } else {
                    return this.playlist[0]
                }
            } else {
                let index = this.playlist.findIndex(item => item.id === this.playingInfo.id)
                while (true) {
                    let next = Math.floor(Math.random() * this.playlist.length)
                    if (next !== index) {
                        return this.playlist[next]
                    }
                }
            }
        },
        getNextInList() {
            if (this.playlist.length === 0) {
                return null
            }
            let index = this.playlist.findIndex(item => item.id === this.playingInfo.id)
            if (index === this.playlist.length - 1) return null
            return this.playlist[index + 1]
        }
    },
    actions: {
        updatePlayingInfo({id, duration, current, name, coverUrl, album, artists, src, data, playing,fee}) {
            console.log('updatePlayingInfo', id)

            this.playingInfo.id = id
            this.playingInfo.src = src
            this.playingInfo.duration = duration
            this.playingInfo.current = current
            this.playingInfo.name = name
            this.playingInfo.coverUrl = coverUrl
            this.playingInfo.album = album
            this.playingInfo.artists = artists
            this.playingInfo.data = data
            this.playingInfo.playing = playing
            this.playingInfo.fee = fee
            this.updatePlayList({id, duration, current:0, name, coverUrl, album, artists, src, data, playing: false, fee})
        },
        updatePlayList(song) {
            if(!song.id) return
            if (this.playlist.find(item => item.id === song.id)) {
                return
            }
            this.playlist.unshift(song)
        },
        // 播放歌单或专辑时，替换全部播放列表
        updatePlaylistAll(list) {
            this.$patch(state =>{
                state.playlist.length = 0 //清空数组直接将length = 0就行
                state.playlist.push(...list)
            })
            // this.playList = list
        },
        updatePlaying(val) {
            this.playingInfo.playing = val
        },
        updateCurrent(val) {
            this.playingInfo.current = val
        },
        getSongById(id) {
            return this.playlist.filter(item => item.id === id)
        },
        updateVolume(val){
            this.playingInfo.volume = val
            if(val > 0){
                this.playingInfo.mute = false
            }
        },
        triggerMute(){
            this.playingInfo.mute = !this.playingInfo.mute
        },
        updatePlayingData(data){
            this.playingInfo.src = data[0].url
            this.playingInfo.data = data
        },
        clearPlaylist(){ //清空播放列表
            this.updatePlayingInfo({
                id: 0,
                src: '',
                duration: 0,
                name: '未知音乐',
                coverUrl: defaultCover,
                album: {},
                artists: [{
                    name: '未知歌手'
                }],
                data: [],
                fee: 0,
                playing: false
            })
            this.playlist.length = 0
        }
    },
    persist: { //持久化到localStorage
        enabled: true,
        strategies: [
            {
                key: 'playStore',
                storage: localStorage
            },

        ]
    }
})