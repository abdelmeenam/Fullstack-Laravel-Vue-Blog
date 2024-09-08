<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="row" style="margin-top: 150px">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <RouterView />
    </div>
    <div class="col-md-4"></div>
  </div>
</template>
  
<style scoped>
.row {
  display: flex;
  justify-content: center;
}
</style>
 