<script setup>
import {ref, reactive, onMounted, watch} from 'vue'
import {artistAlbum} from "@/api/api_artist.js";
import {format} from "@/utils/DateUtil.js";
import {useRoute, useRouter} from "vue-router";
import ImgWidthList from "@/components/list/ImgWidthList.vue";

const albums = ref([])

const queryInfo = reactive({
  id: '',
  offset: 0,
  limit: 30
})

const hasMore = ref(false)

const isLoading = ref(false)

const route = useRoute()
onMounted(() => {
  queryInfo.id = route.query.id || ''
  if (queryInfo.id) {
    albums.value = []
    getArtistAlbum()
  }
})

watch(() => route.query, (val) => {
  queryInfo.id = val.id
  getArtistAlbum()
})

const getArtistAlbum = async () => {
  isLoading.value = true
  const res = await artistAlbum(queryInfo)
  if (res.code !== 200) {
    this.isLoading = false
    return
  }
  albums.value.push(...res.hotAlbums)
  hasMore.value = res.more
  isLoading.value = false
}

const loadMore = () => {
  if (!hasMore.value) return
  queryInfo.offset = albums.value.length
  getArtistAlbum()
}

const router = useRouter()
const toAlbumDetail = (id) => {
  router.push({
    name: 'AlbumDetail',
    query: {id}
  })
}
</script>

<template>
  <ImgWidthList :list="albums"
                mode="al"
                :has-more="hasMore"
                :infinite="true"
                :is-loading="isLoading"
                @loadMore="loadMore"
                @clickItem="toAlbumDetail">
    <template v-slot="{scope}">
      <div class="song-count grey-color font-12">{{ scope.size }}首</div>
      <div class="publish-date grey-color font-12">发行时间: {{ format(scope.publishTime) }}</div>
    </template>
  </ImgWidthList>
</template>

<style scoped lang="less">
.song-count {
  float: left;
  width: 60%;
}

.publish-date {
  float: left;
}
</style>