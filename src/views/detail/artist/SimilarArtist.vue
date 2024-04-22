<script setup>
import {ref, onMounted} from 'vue';
import {similarArtist} from "@/api/api_artist.js";
import {useRoute, useRouter} from "vue-router";
import ImgGrid from "@/components/grid/ImgGrid.vue";

const artists = ref([])
const route = useRoute()

onMounted(async () =>{
  let id = route.query.id
  if(id > 0){
    const res = await similarArtist(id)
    if(res.code !== 200) return
    artists.value = res.artists
  }
})

const router = useRouter()
const toArtistDetail = (id)=>{
  router.push({
    name: 'ArtistDetail',
    query:{id}
  })
}
</script>

<template>
<div class="mar-side-30">
  <img-grid type="artist" :list="artists" @click-img="toArtistDetail">
    <template v-slot="{item}">
      <div class="mar-top-10 dark-color">
        {{ item.name }}
      </div>
    </template>
  </img-grid>
</div>
</template>

<style scoped lang="less">
</style>