<script setup>
import {ref, reactive, onMounted} from 'vue'
import {useRoute} from "vue-router";
import {playlistSubscribers} from "@/api/api_playlist.js";
import UserCard from "@/components/card/UserCard.vue";

const queryInfo = reactive({
  id: '',
  offset: 0,
  limit: 30
})

const subscribers = ref([])

const route = useRoute()

onMounted(async () => {
  queryInfo.id = route.query.id
  const res = await playlistSubscribers(queryInfo)
  if(res.code !== 200) return
  subscribers.value = res.subscribers
})
</script>

<template>
<ul class="subscribers-wrap clearfix">
  <li class="pointer" v-for="sub in subscribers" :key="sub.userId">
    <UserCard :user="sub"></UserCard>
  </li>
</ul>
</template>

<style scoped lang="less">
.subscribers-wrap{
  margin-left: 30px;
  display: flex;
  flex-wrap: wrap;
  li{
    width: 400px;
    height: 100px;
    margin-bottom: 10px;
    margin-right: 10px;
  }
}
</style>