<script setup>
import bgBoardDefault from '@/assets/images/bg-board-default.jpg'
import board from '@/store/modules/board'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const props = defineProps(['backgroundImg', 'title', 'id', 'board'])
const router = useRouter()
const store = useStore()
const handleClick = () => {
  store.commit('board/setCurrentBoard', props.board)
  router.push({
    name: 'BoardDetail',
    params: { id: props.id },
  })
}
</script>
<template>
  <div @click="handleClick" class="h-[150px] border-gray-700 shadow-sm rounded-bl-lg rounded-br-lg">
    <div
      class="p-4 shadow bg-cover bg-center h-[70%] rounded-tl-lg rounded-tr-lg"
      :style="{ backgroundImage: `url(${props.backgroundImg || bgBoardDefault})` }"
    ></div>
    <h3 class="text-[#44546f] font-medium text-sm p-2">
      {{ props.title }}
    </h3>
  </div>
</template>
<style scoped></style>
