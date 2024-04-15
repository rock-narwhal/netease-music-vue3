<script setup>
import {timeConvert} from "@/utils/DateUtil.js";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import SongTag from "@/components/commons/SongTag.vue";

defineProps({
  titles: {
    type: Array,
    default: ['', '操作', '标题', '歌手', '专辑', '时长']
  },
  /**
   * {val: '', width: '5%'},
   *   {val: '音乐标题', width: '45%'},
   *   {val: '歌手', width: '20%'},
   *   {val: '专辑', width: '20%'},
   *   {val: '时长', width: '10%'}
   */
  styleCfg: {
    type: Array,
    default: [
      {width: '30px', flexShrink: 0}, //33px
      {width: '55px', flexShrink: 0}, //50px
      {width: '680px', flexShrink: 1},//577px
      {width: '320px', flexShrink: 1},//314px
      {width: '440px', flexShrink: 1},//446px
      {width: '132px', flexShrink: 1},//132px
    ]
  },
  dataList: {
    type: Array,
    require: true
  }
})

const emit = defineEmits(['clickItem'])
// 音质标签
const qualityTag = (item) =>{
  if(item.hr){
    return 'Hi-Res'
  }
  if(item.sq){
    return 'SQ'
  }
  return null
}
</script>

<template>
  <div class="music-list-wrapper">
    <ul class="title-bar flex-box default-cursor">
      <li v-for="(val,index) in titles" :key="val" :style="styleCfg[index]">
        {{ val }}
      </li>
    </ul>
    <ul class="music-list flex-box hover-list default-cursor" v-for="(item,index) in dataList" :key="item.id" @dblclick.stop="emit('clickItem', item.id)">
      <li :style="styleCfg[0]" class="grey-color">
        <span>
          {{ index < 9 ? '0' + (index + 1) : (index + 1) }}
        </span>
      </li>
      <li :style="styleCfg[1]"  class="grey-color">
        <svg-icon name="like" class-name="pointer font-16" style="margin-right: 10px"></svg-icon>
        <svg-icon name="download-one" class-name="pointer font-16"></svg-icon>
      </li>
      <li :style="styleCfg[2]" class="text-over">{{ item.name }}
        <song-tag tag="VIP" v-if="item.fee === 1" style="margin-right: 5px" color="#FE672E"></song-tag>
        <song-tag :tag="qualityTag(item)" v-if="qualityTag(item)" style="margin-right: 5px"></song-tag>
        <song-tag tag="MV" style="margin-right: 5px">
          <svg-icon name="play-fill" class-name="font-10" vertical="-0.05"></svg-icon>
        </song-tag>
        <song-tag v-if="item.originCoverType === 1 || item.originCoverType === 2" :tag="item.originCoverType === 1 ? '原唱' : '翻唱'"></song-tag>
      </li>
      <li :style="styleCfg[3]" class="text-over dark-color">{{ item.ar[0].name }}</li>
      <li :style="styleCfg[4]" class="text-over dark-color">{{ item.al.name }}</li>
      <li :style="styleCfg[5]" class="text-over grey-color">{{ timeConvert(item.dt / 1000) }}</li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.flex-box {
  display: flex;
}

ul {
  width: 100%;
  height: 36px;

  li {
    line-height: 36px;

    button {
      background-color: transparent;
      border: none;
      font-size: 16px;
    }
  }

  .text-over {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

.title-bar{
  padding-left: 30px;
}
.music-list{
  padding-left: 30px;
  //.grey-item{
  //  color: @listGrey;
  //}
  //.dark-item{
  //  color: @listDark;
  //}
}

.music-list:nth-child(even) {
  background: @listBg;
}

.hover-list{
  &:hover{
    background-color: @listHover;
  }
}
</style>