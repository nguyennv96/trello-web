<script setup>
import bgBoardDefault from '@/assets/images/bg-board-default.jpg'
import board from '@/store/modules/board'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const props = defineProps(['width', 'height', 'avatar', 'name'])
const router = useRouter()
const store = useStore()
console.log(props.avatar)
</script>
<template>
  <div class="relative" :style="{ width: props.width, height: props.height }" id="avatar">
    <div
      v-if="!props.avatar"
      class="avatar w-8 h-8 bg-amber-400 font-semibold flex justify-center items-center rounded-[50%]"
    >
      {{ String(props.name).charAt(0).toUpperCase() }}
    </div>
    <div
      v-else
      class="avatar flex justify-center items-center rounded-[50%] bg-center bg-cover"
      :style="{ backgroundImage: `url(${props.avatar})`, width: props.width, height: props.height }"
    ></div>
  </div>
</template>
<style scoped></style>
