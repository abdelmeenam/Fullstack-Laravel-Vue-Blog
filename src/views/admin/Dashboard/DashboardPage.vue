<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import CountPost from './components/CountPost.vue'
import { onMounted, ref } from 'vue'
import { countPostHttp } from './actions/countPost'

const numberOfPosts = ref<number>(0)

onMounted(async () => {
  const data = await countPostHttp()
  numberOfPosts.value = data.count
})
</script>

<template>
  <div class="col-md-2"></div>

  <div class="col-md-8">
    <CountPost :countPost="numberOfPosts" />
  </div>
  <div class="col-md-2"></div>
</template>