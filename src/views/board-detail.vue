<script setup>
import Card from '@/components/card.vue'
import Column from '@/components/column.vue'
import Dragablee from '@/components/dragablee.vue'
import board from '@/store/modules/board'
import { getLoading } from '@/utils/el-loading'
import notification from '@/utils/el-notification'
import { computed, onMounted, onUnmounted, reactive, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const { appContext } = getCurrentInstance()
const socket = appContext.config.globalProperties.$socket
const router = useRouter()
const addColumnRef = ref(null)
const formInviRef = ref(null)
const store = useStore()
const isInviting = ref(false)

const isCreating = ref(false)
const objColumn = reactive({ boardId: null, title: null })
const objInvite = reactive({ inviteeEmail: null, boardId: null })

const currentBoard = computed(() => {
  return store.state.board.currentBoard
})
const localBoardTitle = ref(null)
const getCurrentBoard = async () => {
  let loading
  try {
    console.log('current board', currentBoard.value)

    // if (currentBoard) return
    loading = getLoading()
    await store.dispatch('board/getDetail', router.currentRoute.value.params.id)
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Không lấy được chi tiết bảng',
    )
  } finally {
    if (loading) loading.close()
  }
}
const handleClickOutside = (event) => {
  if (addColumnRef.value && !addColumnRef.value.contains(event.target)) {
    handleCloseFormAddColumn()
  }
  if (formInviRef.value && !formInviRef.value.contains(event.target)) {
    handleCloseFormInvite()
  }
}
const handleOpenFormAddColumn = () => (isCreating.value = true)
const handleCloseFormAddColumn = () => (isCreating.value = false)
const clearCache = () => {
  objColumn.boardId = null
  objColumn.title = null
}
const handleAddColumn = async () => {
  let loading
  try {
    if (!objColumn.title) {
      notification.warning('Cần nhập tiêu đề danh sách')
      return
    }
    loading = getLoading()
    objColumn.boardId = router.currentRoute.value.params.id
    await store.dispatch('column/createColumn', objColumn)
    notification.success(`Thêm danh sách thành công`)
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Không thêm được danh sách',
    )
  } finally {
    clearCache()
    handleCloseFormAddColumn()
    if (loading) loading.close()
  }
}
const handleUpdateTitle = async () => {
  let loading

  try {
    if (!currentBoard.value.title) {
      notification.warning('Cần nhập tiêu đề bảng')
      currentBoard.value.title = localBoardTitle.value
      return
    }
    if (localBoardTitle.value === currentBoard.value.title) return
    loading = getLoading()
    await store.dispatch('board/updateBoard', {
      title: currentBoard.value.title,
      id: currentBoard.value._id,
    })
    localBoardTitle.value = currentBoard.value.title
    notification.success('Cập nhật thành công')
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Cập nhật tiêu đề bảng không thành công',
    )
  } finally {
    if (loading) loading.close()
  }
}

const handleOpenFormInvite = () => {
  isInviting.value = true
}
const handleCloseFormInvite = () => {
  isInviting.value = false
}
const handleInvite = async () => {
  let loading
  try {
    if (!objInvite.inviteeEmail) {
      notification.warning('Thiếu thông tin email')
      return
    }
    loading = getLoading()
    objInvite.boardId = currentBoard.value._id
    console.log(objInvite)

    const invitation = await store.dispatch('invitation/inviteBoard', objInvite)
    notification.success('Gửi yêu cầu thành công')
    socket.emit('FE_USER_INVITED_TO_BOARD', invitation)
    objInvite.inviteeEmail = null
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Gửi yêu cầu không thành công',
    )
  } finally {
    if (loading) loading.close()
    handleCloseFormInvite()
  }
}
onMounted(async () => {
  await getCurrentBoard()
  localBoardTitle.value = currentBoard.value.title
  window.addEventListener('click', handleClickOutside)
})
onUnmounted(() => window.addEventListener('click', handleClickOutside))

console.log(router.currentRoute.value.params)
</script>
<template>
  <div
    class="h-full bg-[url(@/assets/images/bg-board-default.jpg)] bg-cover bg-no-repeat flex flex-col"
  >
    <header class="bg-[#ffffff3d] h-14 py-3 px-2 flex justify-between items-center">
      <!-- left -->
      <div class="flex gap-1">
        <input
          @focusout="handleUpdateTitle"
          v-if="currentBoard"
          type="text"
          v-model="currentBoard.title"
          class="bg-[#857b7b52] text-sm font-semibold text-[#172b4d] px-0.5 rounded-sm focus:border-blue-500 focus:border focus:outline-0"
        />
        <button class="p-2 hover:bg-[#00000029] cursor-pointer rounded-sm">
          <div class="flex">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm6 0H4v14h4V5zm2 0v14h4V5h-4zm6 0v14h4V5h-4z"
                  fill="#172b4d"
                ></path>
              </g>
            </svg>
            &nbsp;
            <svg
              fill="#172b4d"
              width="20px"
              height="20px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <title>down</title>
                <path
                  d="M11.125 16.313l7.688-7.688 3.594 3.719-11.094 11.063-11.313-11.313 3.5-3.531z"
                ></path>
              </g>
            </svg>
          </div>
        </button>
      </div>
      <!-- right -->
      <div class="flex gap-2">
        <button></button>

        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/rocket.svg" alt="" />
        </button>

        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/automation.svg" alt="" />
        </button>
        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/filter.svg" alt="" />
        </button>
        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/star.svg" alt="" />
        </button>
        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/people.svg" alt="" />
        </button>
        <div ref="formInviRef" class="relative">
          <button
            @click="handleOpenFormInvite"
            class="p-2 px-3 hover:bg-[rgba(0,0,0,0.6)] hover:text-[rgba(32,85,96,1)] bg-[rgba(32,85,96,1)] cursor-pointer flex justify-between rounded-sm"
          >
            <img src="@/assets/images/add-user.svg" class="mr-2 color-white" alt="" />
            <span class="text-white text-sm">Chia sẻ</span>
          </button>
          <!-- Form invitation -->
          <div
            :style="{ visibility: isInviting ? 'visible' : 'hidden' }"
            class="w-[300px] absolute bg-white py-3 rounded-sm shadow-2xl right-0 top-10 border-gray-200 px-3 z-10"
          >
            <header class="flex justify-between">
              <button></button>

              <h5 class="text-[#44546f] font-semibold text-sm">Chia sẻ bảng</h5>
              <button @click="handleCloseFormInvite">
                <svg
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
            </header>
            <article class="text-[#44546f]">
              <div>
                <input
                  placeholder="Nhập địa chỉ email ở đây"
                  class="border-gray-200 border py-2 px-2 text-xs w-full rounded-sm focus:border-blue-600 outline-none"
                  type="text"
                  v-model="objInvite.inviteeEmail"
                /><br />
                <span class="text-xs">👋 Email là bắt buộc</span>
              </div>

              <div class="mt-1">
                <button
                  @click="handleInvite"
                  class="bg-blue-600 text-white w-full py-1 text-sm rounded-sm"
                >
                  Chia sẻ
                </button>
              </div>
            </article>
          </div>
        </div>
        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/more.svg" alt="" />
        </button>
      </div>
    </header>
    <div>
      <TransitionGroup name="list">
        <div class="flex flex-1 gap-8 overflow-x-auto whitespace-nowrap py-3 px-3" key="board">
          <Column
            v-if="currentBoard"
            v-for="column in currentBoard.columns"
            :column="column"
            :key="column._id"
          />
          <div
            class="h-fit p-1.5 rounded-md"
            ref="addColumnRef"
            :class="{ 'bg-[#f1f2f4]': isCreating }"
          >
            <button
              @click="handleOpenFormAddColumn"
              :style="{ display: isCreating ? 'none' : 'block' }"
              class="bg-[#ffffff3d] hover:bg-[#00000029] text-sm text-[#44546f] h-10 rounded-md px-3 py-2 text-left font-medium w-56"
            >
              + Thêm danh sách khác
            </button>
            <div :style="{ display: isCreating ? 'block' : 'none' }">
              <textarea
                class="block mb-1 shadow-sm resize-none bg-white rounded-sm border-blue-500 border-[1px] hover:border-gray-200 text-sm text-[#44546f] focus:outline-none p-2 py-4 w-full max-h-40"
                placeholder="Nhập tiêu đề hoặc dán liên kết"
                v-model="objColumn.title"
              >
              </textarea>
              <div class="flex items-center">
                <button
                  @click="handleAddColumn"
                  class="p-2 bg-blue-600 text-white font-medium text-sm rounded-sm"
                >
                  Thêm cột</button
                >&nbsp;
                <button
                  @click="handleCloseFormAddColumn"
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
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
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
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
<style scoped></style>
