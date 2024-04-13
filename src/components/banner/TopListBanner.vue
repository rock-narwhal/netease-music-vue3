<script setup>
import {ref, defineProps, onMounted, watch, defineEmits} from "vue";
import {getPlayListDetail} from "@/api/api_playlist.js";
import ImgCover from "@/components/commons/ImgCover.vue";
import {useRouter} from "vue-router";

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
const toPlayListDetail = (id) =>{
  router.push({
    name:'PlaylistDetail',
    query:{id}
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
        btn-pos="center"
        @click-img="toPlayListDetail(topItem.id)"
        @click-btn="clickPlay(topItem.id)"></img-cover>
      </div>
      <ul class="right-list">
        <li v-for="(subItem,subIndex) in detailList[index]" :key="subItem.id">
          <div :class="{hot : subIndex < 3}">{{ subIndex + 1 }}</div>
          <div>{{ subItem.name }}</div>
          <div class="sub-right">{{ subItem.ar[0].name }}</div>
        </li>
        <li class="no-btn" @click="viewMore(topItem.id)">
          查看全部 <i class="el-icon-arrow-right"></i>
        </li>
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
      width: 190px;
      height: 190px;
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
          //background-color: #eeeeee;
          background-color: @greyF2;
        }

        &:hover {
          //background-color: #dadada;
          background-color: @greyD8;
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
    }
  }
}
</style>