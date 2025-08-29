<script setup>
import Headerr from '@/components/headerr.vue'

import { RouterView } from 'vue-router'
</script>
<template>
  <div class="w-screen h-screen">
    <Headerr></Headerr>
    <!-- main content -->
    <div class="w-full h-[calc(100vh-52px)]">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<style scoped>
.active-link {
  background-color: #e9f2ff;
  color: #0c66e4;
  border-radius: 6px;
  fill: #0c66e4;
  stroke: #0c66e4;
}
.active-link svg {
  fill: #0c66e4;
  stroke: #0c66e4;
}
</style>
