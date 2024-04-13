<script setup>
import {ref, onMounted, computed} from 'vue'
import {getLatestByType} from "@/api/api_toplist.js";
import {timeConvert} from "@/utils/DateUtil.js";
import emitter from '@/utils/MittBus.js'
import {playStore} from "@/store/playStore.js";
import SelectorMenu from "@/components/menu/SelectorMenu.vue";

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

const playAll = () => {

}

const collectAll = () => {

}

const playSong = (song) => {
  emitter.emit('playMusic', song)
}

const playingInfo = playStore().playingInfo
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
      <li class="clearfix" v-for="(item,index) in songList" :key="item.id" @dblclick="playSong(item)">
        <div class="play-icon float-left">
          <span v-if="playingInfo.id !== item.id">{{ String(index + 1).padStart(2, '0') }}</span>
          <i v-else-if="playingInfo.pause" class="iconfont icon-shengyinguanbi"></i>
          <i v-else class="iconfont icon-shengyin"></i>
        </div>
        <div class="cover float-left clearfix">
          <!--          <img v-lazy="item.album.picUrl + '?param=100y100'" alt="">-->
          <!--          <div class="play-btn pointer" @click="playSong(item)">-->
          <!--            <i class="iconfont font-16 icon-bofang"></i>-->
          <!--          </div>-->
          <img-cover :src="item.album.picUrl + '?param=100y100'"
                     btn-pos="center"
                     show-type="always"
                     btn-size="small"
                     size="60px"
          ></img-cover>
        </div>
        <div class="name float-left">
          <span>{{ item.name }}</span>
          <!--          <i class="iconfont icon-"></i>-->
        </div>
        <div class="artist float-left">{{ item.artists[0].name }}</div>
        <div class="album float-left">{{ item.album.name }}</div>
        <div class="time-minute float-left">{{ timeConvert(item.duration / 1000) }}</div>
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
    line-height: 24px;
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
      background-color: @greyF2;
    }

    &:hover {
      background-color: @greyD8;
    }

    .float-left {
      float: left;
      //border-left: 1px solid black;
    }

    .play-icon {
      width: 3%;
    }

    .cover {
      width: 8%;
      //position: relative;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    //  img {
    //    width: 60px;
    //    height: auto;
    //    border-radius: 5px;
    //  }
    //
    //  .play-btn {
    //    width: 20px;
    //    height: 20px;
    //    background-color: white;
    //    color: @headRed;
    //    font-size: 8px;
    //    border-radius: 50%;
    //    text-align: center;
    //    line-height: 20px;
    //    position: absolute;
    //    top: 30px;
    //    left: 20px;
    //  }
    //}

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