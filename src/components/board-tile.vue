<script setup>
import bgBoardDefault from '@/assets/images/bg-board-default.jpg'
const props = defineProps(['backgroundImg', 'title'])
</script>
<template>
  <div class="h-[150px] border-gray-700 shadow-sm rounded-bl-lg rounded-br-lg">
    <div
      class="p-4 shadow bg-cover bg-center h-[70%] rounded-tl-lg rounded-tr-lg"
      :style="{ backgroundImage: `url(${props.backgroundImg || bgBoardDefault})` }"
    ></div>
    <h3 class="text-blue-900 font-medium text-sm p-2">
      {{ props.title }}
    </h3>
  </div>
</template>
<style scoped></style>
