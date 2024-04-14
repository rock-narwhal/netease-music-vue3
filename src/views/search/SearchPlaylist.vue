<script setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {cloudSearch} from "@/api/api_music.js";
import {toCNNum} from "@/utils/FormatUtil.js";
import ImgWidthList from "@/components/list/ImgWidthList.vue";
import SvgIcon from "@/components/svg/SvgIcon.vue";

const isLoading = ref(false)

const pageInfo = ref({
  current: 1,
  total: 0,
})

const queryInfo = ref({
  offset: 0,
  limit: 50,
  type: 1000,//专辑
  keywords: '',
})

const list = ref([])

const route = useRoute()
onMounted(async () => {
  let keywords = decodeURI(route.query.keywords)
  queryInfo.value.keywords = keywords.replaceAll(/\s+/g, '+')

  isLoading.value = true
  const res = await cloudSearch(queryInfo.value)
  if (res.code !== 200) return
  list.value = res.result.playlists
  pageInfo.total = res.result.playlistCount
  isLoading.value = false
})

const router = useRouter()
const toPlaylistDetail = (id) => {
  router.push({
    name: "PlaylistDetail",
    query: {id}
  })
}
</script>

<template>
  <div class="">
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <ImgWidthList :list="list" mode="pl" @clickItem="toPlaylistDetail">
      <template v-slot="{scope}">
        <div class="float-item track-count">{{ scope.trackCount }} 首</div>
        <div class="float-item ar-name">by {{ scope.creator.nickname }}</div>
        <div class="float-item play-count clearfix">
          <div class="play-icon">
            <svg-icon name="play-fill"></svg-icon>
          </div>
          <span style="line-height: 16px; margin-left: 5px">{{ toCNNum(scope.playCount) }}</span>
        </div>
      </template>
    </ImgWidthList>
  </div>
</template>

<style scoped lang="less">
.float-item {
  float: left;
  line-height: 100%;
}

.track-count {
  width: 20%;
}

.ar-name {
  width: 60%;
}

.play-count {
  width: 20%;

  .play-icon {
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    float: left;
    border-radius: 50%
  }
}
</style>