<script setup>
import {computed} from 'vue'
import ImgCover from "@/components/commons/ImgCover.vue";
import SongTag from "@/components/commons/SongTag.vue";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import emitter from '@/utils/MittBus.js'

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  width: {
    type: String,
    default: '360px'
  },
  height: {
    type: String,
    default: '50px'
  }
})
//mvid
const qualityTag = computed(() => {
  if (props.song.song.hrMusic) {
    return 'Hi-Res'
  }
  if (props.song.song.sqMusic) {
    return 'SQ'
  }
  return null
})
const playMusic = () => {
  emitter.emit('playMusic', props.song.id)
}
</script>

<template>
  <div class="card-wrapper" :style="{height,width}">
    <img-cover :src="song.picUrl + '?param=100y100'"
               size="50px"
               btn-size="small"
               btn-pos="center"
               show-type="always"
               @click-btn="playMusic"></img-cover>
    <div class="card-info">
      <p class="text-over default-cursor">
        {{ song.name }}
        <span class="grey-color" v-if="song.song.alias && song.song.alias.length > 0"> ({{ song.song.alias[0] }})
        </span>
      </p>
      <p class="font-12 text-over pointer">
        <song-tag class="mar-ri-5" v-if="qualityTag" :tag="qualityTag"></song-tag>
        <song-tag class="mar-ri-5 pointer" v-if="song.song.mvid > 0" tag="MV">
          <svg-icon name="play-fill" class-name="font-10" vertical="-0.13"></svg-icon>
        </song-tag>
        <span class="grey-color artist-name">{{ song.song.artists[0].name }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.card-wrapper {
  display: flex;

  .card-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    p {
      height: 20px;
      line-height: 20px;

      .artist-name:hover {
        color: @listDark;
      }
    }
  }
}
</style>