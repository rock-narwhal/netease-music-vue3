<script setup>
import {ref} from 'vue'
import {ArrowDownBold, ArrowUpBold, Download, FolderAdd} from "@element-plus/icons-vue";
import SvgIcon from "@/components/svg/SvgIcon.vue";

defineProps({
  playingInfo: {
    required: true,
    type: Object
  }
})

const hiddenCover = ref(false)

const emit = defineEmits(['clickCover'])
const targetPlayPage = (val) => {
  hiddenCover.value = val
  emit('clickCover', val)
}
</script>

<template>
  <div class="cover-wrap" :class="{'hide-cover': hiddenCover}">
    <!--      按钮区域-->
    <div class="left-btn">
      <button class="pointer font-18 no-btn down-btn"
              @click="targetPlayPage(false)">
        <el-icon>
          <ArrowDownBold/>
        </el-icon>
      </button>
      <button class="font-20 circle">
        <i class="iconfont icon-aixin"></i>
      </button>
      <button class="circle font-14">
        <el-icon>
          <FolderAdd/>
        </el-icon>
      </button>
      <button class="circle font-14">
        <el-icon>
          <Download/>
        </el-icon>
      </button>
      <button class="circle">
        <i class="iconfont icon-fenxiang"></i>
      </button>
    </div>
    <!--      封面区域-->
    <div class="cover-area">
      <div class="cover">
        <img v-lazy="playingInfo.coverUrl + '?param=100y100'" alt="">
        <button class="no-btn font-18" @click="targetPlayPage(true)">
          <!--          <i class="el-icon-arrow-up"></i>-->
          <el-icon>
            <ArrowUpBold/>
          </el-icon>
        </button>
      </div>
      <div class="song-info pointer">
        <div class="song-name">
          <div class="font-16 text-over">
            {{ playingInfo.name }}
          </div>
          <span style="margin-left: 5px;" class="grey-color">
            <svg-icon name="like" class-name="font-20"></svg-icon>
          </span>
        </div>
        <div class="text-over font-12 dark-color">
          {{ playingInfo.artists[0].name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.cover-wrap {

  height: 160px;
  position: absolute;
  top: -80px;
  width: 100%;
  transition: 0.5s;

  .left-btn {
    height: 50%;
    width: 100%;
    display: flex;
    align-items: center;

    button {
      width: 40px;
      height: 40px;
      background-color: white;

      &.down-btn {
        height: 50px;
        width: 50px;
        margin-right: 5px;
      }
    }

    .circle {
      border: 1px solid #cccccc;
      margin-left: 10px;
    }
  }

  .cover-area {
    height: 80px;
    width: 280px;
    display: flex;
    align-items: center;

    .cover {
      height: 50px;
      width: 50px;
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 15px;

      button {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        color: white;
        background-color: black;
        opacity: 0.5;
        display: none;
      }

      &:hover button {
        display: block;
      }
    }

    .song-name {
      margin-bottom: 3px;
      width: 200px;
      display: flex;
    }

    .text-over {
      overflow: hidden;
      white-space: nowrap;
      max-width: 160px;
    }
  }

  &.hide-cover {
    top: 0;
  }
}
</style>