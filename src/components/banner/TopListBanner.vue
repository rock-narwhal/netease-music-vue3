<script setup>
import {ref, defineProps, onMounted, watch, defineEmits} from "vue";
import {getPlayListDetail} from "@/api/api_playlist.js";
import ImgCover from "@/components/commons/ImgCover.vue";
import {useRouter} from "vue-router";
import SvgIcon from "@/components/svg/SvgIcon.vue";

const props = defineProps({
  list: {
    type: Array,
    required: true
  }
})
watch(() => props.list, (val) => {
  detailList.value = []
  props.list.forEach(item => {
    getDetailList(item.id)
  })
})

const detailList = ref([])
onMounted(() => {
  props.list.forEach(item => {
    getDetailList(item.id)
  })
})

const emit = defineEmits(['viewMore', 'clickPlay'])
const viewMore = (id) => {
  emit('viewMore', id)
}

const clickPlay = (id) => {
  emit('clickPlay', id)
}

const router = useRouter()
const toPlayListDetail = (id) => {
  router.push({
    name: 'PlaylistDetail',
    query: {id}
  })
}

const getDetailList = async (id) => {
  const res = await getPlayListDetail(id)
  if (res.code !== 200) return
  detailList.value.push(res.playlist.tracks.splice(0, 5))
}
</script>

<template>
  <div class="top-banner">
    <div class="banner-item" v-for="(topItem,index) in list" :key="topItem.id">
      <div class="cover pointer">
        <img-cover :src="topItem.coverImgUrl + '?param=400y400'"
                   size="160px"
                   btn-pos="center"
                   @click-img="toPlayListDetail(topItem.id)"
                   @click-btn="clickPlay(topItem.id)"></img-cover>
      </div>
      <ul class="right-list font-12">
        <li v-for="(subItem,subIndex) in detailList[index]" :key="subItem.id">
          <div :class="{hot : subIndex < 3}" class="grey-item">{{ subIndex + 1 }}</div>
          <div>{{ subItem.name }} <span v-if="subItem.alia.length > 0" class="grey-item">({{ subItem.alia[0] }})</span>
          </div>
          <div class="sub-right grey-item">{{ subItem.ar[0].name }}</div>
        </li>
        <div class="check-all grey-item" @click="viewMore(topItem.id)">
          查看全部
          <svg-icon name="arrow-right" vertical="-0.15"></svg-icon>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.top-banner {
  width: 100%;

  .banner-item {
    display: flex;
    margin-bottom: 30px;

    .cover {
      width: 160px;
      height: 160px;
    }

    .right-list {
      width: 100%;
      margin-left: 30px;
      display: flex;
      flex-direction: column;

      li {
        height: 32px;
        width: 100%;
        line-height: 32px;
        border-radius: 3px;

        .hot {
          color: @headRed;
        }

        &:nth-child(odd) {
          background-color: @listBg;
        }

        &:hover {
          background-color: @listHover;
        }

        div {
          margin-left: 10px;
          float: left;
        }

        div.sub-right {
          float: right;
          margin-right: 10px;
        }
      }

      .check-all {
        padding-left: 10px;
        height: 32px;
        line-height: 32px;

        &:hover {
          color: #000;
        }
      }
    }
  }

  .grey-item {
    color: @listGrey;
  }
}
</style>