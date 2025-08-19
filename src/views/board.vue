<script setup>
import BoardTile from '@/components/board-tile.vue'
import { getLoading } from '@/utils/el-loading'
import notification from '@/utils/el-notification'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const boards = computed(() => store.state.board.boards)
onMounted(async () => {
  let loading
  try {
    loading = getLoading()
    await store.dispatch('board/fetchBoard')
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Không lấy được danh sách bảng',
    )
  } finally {
    loading.close()
  }
})
</script>
<template>
  <h1 class="mb-5 font-semibold text-[#44546f]">Danh sách bảng của bạn</h1>
  <div v-if="boards.length > 0" class="grid grid-cols-5 gap-5">
    <BoardTile
      v-for="(board, index) in boards"
      v-bind:key="board._id"
      :background-img="null"
      :title="board.title"
    />
  </div>
  <div v-else>
    <p class="italic text-[#44546f]">Không có dữ liệu bảng</p>
  </div>
</template>
<style scoped></style>
