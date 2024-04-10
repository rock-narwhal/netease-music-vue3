<script setup>
import {ref,reactive, onMounted} from "vue"
import {useRoute} from "vue-router";
import {artistMV} from "@/api/api_artist.js";

const queryInfo = reactive({
  id: '',
  offset: 0,
  limit: 30,
})

const hasMore = ref(false)

const isLoading = ref(false)

const mvList = ref([])

const route = useRoute()
onMounted(()=>{
  queryInfo.id = route.query.id || ''
  if(queryInfo.id){
    mvList.value = []
    getMVList()
  }
})


const getMVList = async () =>{
  isLoading.value = true
  const res = await artistMV(queryInfo)
  if (res.code !== 200) {
    this.isLoading = false
    return
  }
  mvList.value.push(...res.mvs)
  hasMore.value = res.hasMore
  isLoading.value = false
}

const loadMore = () =>{
  if(!hasMore.value) return
  queryInfo.offset = mvList.value.length
  getMVList()
}
</script>

<template>
  <div class="mv-content">
    <MVList :list="mvList"
            :infinite="true"
            :has-more="hasMore"
            :is-loading="isLoading"
            @loadMore="loadMore">
    </MVList>
  </div>
</template>

<style scoped lang="less">
.mv-content {
  padding: 0 30px
}
</style>