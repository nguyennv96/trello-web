<script setup>
import BoardTile from '@/components/board-tile.vue'
</script>
<template>
  <h1 class="mb-5 font-semibold">Danh sách bảng của bạn</h1>
  <div class="grid grid-cols-5 gap-5">
    <BoardTile v-for="index in 10" v-bind:key="index" :background-img="null" title="Test board" />
  </div>
</template>
<style scoped></style>
