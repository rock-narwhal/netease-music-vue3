<script setup>
import {ref, onMounted} from 'vue'
import SelectBanner from "@/components/banner/SelectBanner.vue";
import ImgList from "@/components/list/ImgList.vue";
import emitter from '@/utils/MittBus.js'
import {queryArtist} from "@/api/api_artist.js";
import {useRouter} from "vue-router";

const artistList = ref([])
onMounted(() => {
  queryArtists(queryParam.value)
})

const hasMore = ref(false)

const isLoading = ref(false)

const queryParam = ref({
  limit: 50,
  offset: 0,
  type: -1,
  area: -1,
  initial: -1,
})

const queryArtists = async (option) => {
  isLoading.value = true
  emitter.emit('contentScrollTop') // 先滚动到顶部
  queryParam.value = {...queryParam.value, ...option}
  const res = await queryArtist(queryParam.value)
  if (res.code !== 200) return
  artistList.value = res.artists
  hasMore.value = res.more
  isLoading.value = false
}

const loadArtist = async () => {
  if(!hasMore.value) return
  isLoading.value = true
  queryParam.value.offset += artistList.value.length
  const res = await queryArtist(queryParam.value)
  if (res.code !== 200) return
  artistList.value.push(...res.artists)
  hasMore.value = res.more
  isLoading.value = false
}

const router = useRouter()
const toArtistDetail = (id) =>{
  router.push({
    name:'ArtistDetail',
    query:{id}
  })
}

</script>

<template>
  <div class="container">
    <SelectBanner style="margin-bottom: 10px" @clickOption="queryArtists"></SelectBanner>

    <ImgList type="artist"
             :list="artistList"
             :infinite="true"
             :has-more="hasMore"
             :is-loading="isLoading"
             @loadMore="loadArtist"
             @clickImg="toArtistDetail">
      <template v-slot="{item}">
        {{ item.name }}
      </template>
    </ImgList>
  </div>
</template>

<style scoped>

</style>