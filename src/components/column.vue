<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import Card from './card.vue'
import { useDroppable } from '@vue-dnd-kit/core'
import notification from '@/utils/el-notification'
import { getLoading } from '@/utils/el-loading'
import { useStore } from 'vuex'
const props = defineProps(['column'])
const localTitle = ref(props.column.title)
const isCreating = ref(false)
const addCardRef = ref(null)
const column = computed(() => props.column)
const objCard = reactive({ boardId: null, columnId: null, title: null })
const { elementRef, isOver } = useDroppable({
  id: 'my-dropzone',
})
const store = useStore()
onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
const handleClickOutside = (e) => {
  if (addCardRef.value && !addCardRef.value.contains(e.target)) {
    handleCloseFormAddCard()
  }
}
const handleOpenFormAddCard = () => (isCreating.value = true)
const handleCloseFormAddCard = () => (isCreating.value = false)
const clearCache = () => {
  objCard.boardId = null
  objCard.columnId = null
  objCard.title = null
}
const handleAddCard = async () => {
  let loading
  try {
    if (!objCard.title) {
      notification.warning('Cần nhập tiêu đề thẻ')
      return
    }
    loading = getLoading()
    objCard.boardId = column.value.boardId
    objCard.columnId = column.value._id
    await store.dispatch('card/createCard', objCard)
    notification.success(`Thêm thẻ thành công`)
  } catch (error) {
    notification.error(error?.response?.data?.message || error?.message || 'Không thêm được thẻ')
  } finally {
    clearCache()
    handleCloseFormAddCard()
    if (loading) loading.close()
  }
}
const handleUpdateTitle = async () => {
  let loading
  try {
    if (!column.value.title) {
      notification.warning('Cần nhập tiêu đề danh sách')
      return
    }

    if (localTitle.value === props.column.title) return
    loading = getLoading()

    await store.dispatch('column/updateColumn', {
      title: column.value.title,
      columnId: column.value._id,
    })
    localTitle.value = column.value.title
    notification.success(`Cập nhật danh sách thành công`)
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Không cập nhật được danh sách',
    )
  } finally {
    if (loading) loading.close()
  }
}
</script>
<template>
  <div
    ref="elementRef"
    :class="{ over: isOver }"
    @pointerdown="handleDragStart"
    class="bg-[#f1f2f4] shadow-sm rounded-lg w-64 pl-2 pr-1 py-3 flex flex-col basis-0 flex-1 h-fit max-h-[calc(100vh-49px-56px-48px)] max-w-64 column"
  >
    <header class="flex w-60 justify-between mb-2">
      <input
        @focusout="handleUpdateTitle"
        v-if="column"
        type="text"
        v-model="column.title"
        class="font-semibold text-sm px-0.5 py-1 focus:border-2 focus:border-blue-500 focus:outline-0"
      />
      <button>
        <img src="@/assets/images/more.svg" />
      </button>
    </header>
    <div v-if="column.cards.length > 0" class="overflow-y-auto flex-1 pr-1">
      <div v-for="(card, index) in column.cards">
        <Card :card="card" />
      </div>
    </div>
    <footer ref="addCardRef">
      <div class="flex justify-center" :style="{ display: isCreating ? 'none' : 'flex' }">
        <button
          @click="handleOpenFormAddCard"
          class="text-[#44546f] text-sm hover:bg-[#091e4224] p-1 rounded-md font-medium flex flex-auto"
        >
          + Thêm thẻ
        </button>
        <button class="p-1 rounded-md cursor-no-drop">
          <img src="@/assets/images/template.svg" alt="" />
        </button>
      </div>
      <div :style="{ display: isCreating ? 'block' : 'none' }">
        <textarea
          class="block mb-1 shadow-sm resize-none bg-white rounded-sm border-blue-500 border-[1px] hover:border-gray-200 text-sm text-[#44546f] focus:outline-none p-2 py-4 w-full max-h-40"
          placeholder="Nhập tiêu đề hoặc dán liên kết"
          v-model="objCard.title"
        >
        </textarea>
        <div class="flex items-center">
          <button
            @click="handleAddCard"
            class="p-2 bg-blue-600 text-white font-medium text-sm rounded-sm"
          >
            Thêm thẻ</button
          >&nbsp;
          <button
            @click="handleCloseFormAddCard"
            class="w-8 h-8 font-medium hover:bg-[#091e4224] rounded-sm"
          >
            <svg
              class="m-auto"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Menu / Close_SM">
                  <path
                    id="Vector"
                    d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                    stroke="#44546f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>
<style scoped>
.column {
  cursor: grab;
  user-select: none;
}
.over {
  background-color: #e0f7fa;
  border-color: #00bcd4;
}
button {
  cursor: pointer;
}
</style>
