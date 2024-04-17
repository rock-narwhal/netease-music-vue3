<script setup>
import {ref, onMounted, computed} from 'vue'
import {getLatestByType} from "@/api/api_toplist.js";
import {timeConvert} from "@/utils/DateUtil.js";
import emitter from '@/utils/MittBus.js'
import {playStore} from "@/store/playStore.js";
import SelectorMenu from "@/components/menu/SelectorMenu.vue";
import ImgCover from "@/components/commons/ImgCover.vue";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import SongTag from "@/components/commons/SongTag.vue";

const menus = ref([{name: '全部', type: 0, active: false}, {name: '华语', type: 7, active: false},
  {name: '欧美', type: 96, active: false}, {name: '日本', type: 8, active: false},
  {name: '韩国', type: 16, active: false}])

const songList = ref([])
onMounted(() => {
  getLatest(0)
})

const activeType = computed(() => {
  return menus.value.find(item => item.active)
})

const getLatest = async (type) => {
  if (activeType === type && songList.value.length > 0) return
  menus.value.forEach(item => item.active = item.type === type)
  const res = await getLatestByType(type)
  if (res.code !== 200) return
  songList.value = res.data
}
// 播放所有
const playAll = () => {

}
// 收藏所有
const collectAll = () => {

}

const playMusic = (id) => {
  emitter.emit('playMusic', id)
}

const playingInfo = playStore().playingInfo

const qualityTag = (item) => {
  if (item.hr) {
    return 'Hi-Res'
  }
  if (item.sq) {
    return 'SQ'
  }
  return null
}
</script>

<template>
  <div>
    <div class="menu-bar">
      <SelectorMenu :option="menus" @clickTab="getLatest">
        <template v-slot:rightBtn>
          <button @click="playAll" class="no-btn menu-btn play-btn">播放全部</button>
          <button @click="collectAll" class="no-btn menu-btn">收藏全部</button>
        </template>
      </SelectorMenu>
    </div>
    <ul>
      <li class="clearfix" v-for="(item,index) in songList" :key="item.id" @dblclick.stop="playMusic(item.id)">
        <div class="play-icon float-left grey-color">
          <span v-if="playingInfo.id !== item.id">{{ String(index + 1).padStart(2, '0') }}</span>
          <i v-else-if="playingInfo.pause" class="iconfont icon-shengyinguanbi"></i>
          <i v-else class="iconfont icon-shengyin"></i>
        </div>
        <div class="cover float-left clearfix">
          <div style="width: 60px;height: 60px">
            <img-cover :src="item.album.picUrl + '?param=100y100'"
                       btn-pos="center"
                       show-type="always"
                       btn-size="small"
                       @click-btn="playMusic(item.id)">
            </img-cover>
          </div>

        </div>
        <div class="name float-left clearfix">
          <div class="float-left">
            <span :class="{'red-color' : playingInfo.id === item.id}">{{ item.name }}</span><span class="grey-color"
                                                                                                  v-if="item.alias.length"> ({{ item.alias[0] }})</span>
          </div>
          <div class="float-left" style="margin-left: 5px">
            <song-tag tag="VIP" v-if="item.fee === 1" style="margin-right: 5px" color="#FE672E"></song-tag>
            <song-tag :tag="qualityTag(item)" v-if="qualityTag(item)" style="margin-right: 5px"></song-tag>
            <song-tag tag="MV" style="margin-right: 5px">
              <svg-icon name="play-fill" class-name="font-10" vertical="-0.05"></svg-icon>
            </song-tag>
            <song-tag style="margin-right: 5px" v-if="item.originCoverType === 1 || item.originCoverType === 2"
                      :tag="item.originCoverType === 1 ? '原唱' : '翻唱'"></song-tag>
          </div>
        </div>
        <div class="artist float-left dark-color">{{ item.artists[0].name }}</div>
        <div class="album float-left dark-color">{{ item.album.name }}</div>
        <div class="time-minute float-left grey-color">{{ timeConvert(item.duration / 1000) }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.menu-bar {
  margin-top: 40px;
  margin-bottom: 20px;

  .menu-btn {
    margin-left: 10px;
    height: 24px;
    width: 90px;
    line-height: 22px;
    border-radius: 12px;
    border: 1px solid #c2c2c2;
  }

  .play-btn {
    background-color: #ff3333;
    border: none;
    color: white;
  }
}

ul {
  width: 100%;

  li {
    height: 80px;
    line-height: 80px;
    vertical-align: center;
    width: 100%;
    padding: 0 40px;
    border-radius: 3px;

    &:nth-child(odd) {
      background-color: @listBg;
    }

    &:hover {
      background-color: @listHover;
    }

    .float-left {
      float: left;
    }

    .play-icon {
      width: 3%;
    }

    .cover {
      width: 8%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .name {
      width: 49%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .artist {
      width: 16%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .album {
      width: 20%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .time-minute {
      width: 4%;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>