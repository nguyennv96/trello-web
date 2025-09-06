<script setup>
import Card from '@/components/card.vue'
import Column from '@/components/column.vue'
import Dragablee from '@/components/dragablee.vue'
import board from '@/store/modules/board'
import { getLoading } from '@/utils/el-loading'
import notification from '@/utils/el-notification'
import { computed, onMounted, onUnmounted, reactive, ref, getCurrentInstance, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { QuillEditor, Delta, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Avatar from '@/components/avatar.vue'
import { convertTohhmmDDMMYYYY } from '@/utils/date'

const { appContext } = getCurrentInstance()
const socket = appContext.config.globalProperties.$socket
const router = useRouter()
const addColumnRef = ref(null)
const formInviRef = ref(null)
const store = useStore()
const isInviting = ref(false)
const isEditingDesc = ref(false)
const quillEditor = ref(null)
const commentToAdd = reactive({
  userAvatar: store.state.user.user.avatar,
  userDisplayName: store.state.user.user.displayName,
  content: null,
})

const isCreating = ref(false)
const objColumn = reactive({ boardId: null, title: null })
const objInvite = reactive({ inviteeEmail: null, boardId: null })

const currentBoard = computed(() => {
  return store.state.board.currentBoard
})
const localCardTitle = ref(null)
const description = ref('')
const currentCard = computed(() => {
  return store.state.card.currentCard
})

watch(currentCard, (newVal, oldVal) => {
  if (currentCard.value !== null) {
    localCardTitle.value = currentCard.value.title
  }
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
const handleUpdateTitleCard = async () => {
  let loading

  try {
    if (!currentCard.value.title) {
      notification.warning('Cần nhập tiêu đề thẻ')
      currentCard.value.title = localCardTitle.value
      return
    }
    console.log(localCardTitle.value, currentCard.value.title)

    if (localCardTitle.value === currentCard.value.title) return
    loading = getLoading()
    await store.dispatch('card/updateCard', {
      data: { title: currentCard.value.title },
      id: currentCard.value._id,
    })
    localCardTitle.value = currentCard.value.title
    notification.success('Cập nhật thành công')
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Cập nhật tiêu đề thẻ không thành công',
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
const handleUpdateDesc = async () => {
  console.log(currentCard.value)
  let loading
  console.log(quillEditor.value.getContents())
  try {
    loading = getLoading()
    await store.dispatch('card/updateCard', {
      data: { description: quillEditor.value.getContents() },
      id: currentCard.value._id,
    })
    notification.success('Cập nhật thành công')
    isEditingDesc.value = false
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Cập nhật mô tả không thành công',
    )
  } finally {
    if (loading) loading.close()
  }
}
const handleUpdateComment = async () => {
  let loading

  try {
    loading = getLoading()
    await store.dispatch('card/updateCard', {
      data: { commentToAdd: { ...commentToAdd } },
      id: currentCard.value._id,
    })
    commentToAdd.content = null
    notification.success('Cập nhật thành công')
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Cập nhật tiêu đề thẻ không thành công',
    )
  } finally {
    if (loading) loading.close()
    description.value = quillEditor.value.getContents()
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
      <div class="flex ga0.5">
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

  <!-- popup card detail -->
  <div
    v-if="currentCard"
    @click="() => store.commit('card/setCurrentCard', null)"
    class="w-screen h-screen bg-[#00000080] fixed left-0 top-0"
  >
    <div
      @click.stop
      class="w-7/12 min-h-1/5 max-h-4/5 bg-white opacity-100 m-auto mt-14 rounded-lg"
    >
      <header
        class="border-b-[1px] border-gray-200 h-16 flex justify-between items-center px-4 text-sm font-medium"
      >
        <p class="text-[#091E42] hover:bg-[#a5a8ad] bg-[#ced2d8] py-0.5 px-4 rounded-sm">
          {{ currentBoard.title }}
        </p>
        <button
          @click="() => store.commit('card/setCurrentCard', null)"
          class="w-7 h-7 rounded-full hover:bg-[#ced2d8]"
        >
          <svg
            width="28px"
            height="28px"
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
      <main class="flex py-4 px-4">
        <div class="left w-3/5 h-full border-r-[1px] border-gray-200 text-[#172b4d] mb-4 pr-4">
          <input
            @focusout="handleUpdateTitleCard"
            type="text"
            v-model="currentCard.title"
            class="w-full block font-semibold text-2xl px-0.5 py-1 mb-4 focus:border-2 focus:border-blue-500 focus:outline-0"
          />

          <div class="flex justify-start gap-4 mb-4">
            <button
              class="text-sm text-[#44546f] flex border-gray-200 border-[1px] items-center justify-center p-1 px-2 rounded-sm hover:bg-[#091E420F]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z"
                    fill="#44546f"
                  ></path>
                </g>
              </svg>
              &nbsp;Thêm
            </button>
            <button
              class="text-sm text-[#44546f] flex border-gray-200 border-[1px] items-center justify-center p-0.5 px-2 rounded-sm hover:bg-[#091E420F]"
            >
              <svg
                width="16"
                height="16"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.1213 2.80762C12.3403 2.02657 11.0739 2.02657 10.2929 2.80762L3.92891 9.17158C1.19524 11.9052 1.19524 16.3374 3.92891 19.0711C6.66258 21.8047 11.0947 21.8047 13.8284 19.0711L20.1924 12.7071C20.9734 11.9261 20.9734 10.6597 20.1924 9.87869L13.1213 2.80762ZM18.7782 11.2929L11.7071 4.22183L5.34313 10.5858C3.39051 12.5384 3.39051 15.7042 5.34313 17.6569C7.29575 19.6095 10.4616 19.6095 12.4142 17.6569L18.7782 11.2929ZM10 14C10 14.5523 9.55228 15 9 15C8.44772 15 8 14.5523 8 14C8 13.4477 8.44772 13 9 13C9.55228 13 10 13.4477 10 14ZM12 14C12 15.6569 10.6569 17 9 17C7.34315 17 6 15.6569 6 14C6 12.3431 7.34315 11 9 11C10.6569 11 12 12.3431 12 14Z"
                  fill="#44546f"
                ></path>
              </svg>
              &nbsp;Nhãn
            </button>
            <button
              class="text-sm text-[#44546f] flex border-gray-200 border-[1px] items-center justify-center p-0.5 px-2 rounded-sm hover:bg-[#091E420F]"
            >
              <svg
                width="16"
                height="16"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
                  fill="#44546f"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                  fill="#44546f"
                ></path>
              </svg>
              &nbsp;Ngày
            </button>
            <button
              class="text-sm text-[#44546f] flex border-gray-200 border-[1px] items-center justify-center p-0.5 px-2 rounded-sm hover:bg-[#091E420F]"
            >
              <svg
                width="16"
                height="16"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13V18H6V6L16 6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H6ZM8.73534 10.3223C8.36105 9.91618 7.72841 9.89038 7.3223 10.2647C6.91619 10.639 6.89039 11.2716 7.26467 11.6777L10.8768 15.597C11.4143 16.1231 12.2145 16.1231 12.7111 15.6264L13.0754 15.2683C13.3699 14.9785 13.6981 14.6556 14.0516 14.3075C15.0614 13.313 16.0713 12.3169 17.014 11.3848L17.0543 11.3449C18.7291 9.68869 20.0004 8.42365 20.712 7.70223C21.0998 7.30904 21.0954 6.67589 20.7022 6.28805C20.309 5.90022 19.6759 5.90457 19.2881 6.29777C18.5843 7.01131 17.3169 8.27244 15.648 9.92281L15.6077 9.96263C14.6662 10.8937 13.6572 11.8889 12.6483 12.8825L11.8329 13.6851L8.73534 10.3223Z"
                  fill="#44546f"
                ></path>
              </svg>
              &nbsp;Việc cần làm
            </button>
            <button
              class="text-sm text-[#44546f] flex border-gray-200 border-[1px] items-center justify-center p-0.5 px-2 rounded-sm hover:bg-[#091E420F]"
            >
              <svg
                width="16"
                height="16"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 9.44777 7.61532 10.7518 8.59871 11.6649C5.31433 13.0065 3 16.233 3 20C3 20.5523 3.44772 21 4 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5.07089C5.55612 15.6077 8.47353 13 12 13ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                  fill="#44546f"
                ></path>
                <path
                  d="M17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17V14Z"
                  fill="#44546f"
                ></path>
              </svg>
              &nbsp;Thành viên
            </button>
          </div>
          <div class="description">
            <h3 class="flex mb-3 font-medium items-center text-sm">
              <svg
                width="20"
                height="20"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H20C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9H4ZM3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14ZM4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H4Z"
                  fill="currentColor"
                ></path>
              </svg>
              &nbsp; Mô tả
            </h3>
            <div v-if="!isEditingDesc && !currentCard.description">
              <input
                @focusin="() => (isEditingDesc = true)"
                type="text"
                placeholder="Thêm mô tả chi tiết hơn..."
                class="border-[1px] border-gray-200 pl-2 text-sm h-16 w-full outline-0"
                :autofocus="false"
              />
            </div>
            <div
              @click="() => (isEditingDesc = true)"
              v-else-if="!isEditingDesc && currentCard.description"
            >
              <div class="p-3 max-h-96 overflow-y-auto">
                <div v-html="currentCard.description"></div>
              </div>
            </div>
            <div v-else>
              <QuillEditor
                v-model:content="currentCard.description"
                ref="quillEditor"
                content-type="html"
                class="mb-1 overflow-y-auto max-h-96"
                theme="snow"
              />
              <button
                @click="handleUpdateDesc"
                class="bg-blue-600 text-white text-sm py-1 px-2 mr-1 mt-1 rounded-sm font-medium"
              >
                Lưu
              </button>
              <button
                @click="() => (isEditingDesc = false)"
                class="text-sm hover:bg-[#091E4224] py-1 px-2 mr-1 mt-1 rounded-sm font-medium"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
        <div class="right border-0 w-2/5 h-full p-4 text-[#172b4d]">
          <h3 class="flex font-medium items-center text-sm mb-2">
            <svg
              height="18px"
              width="18px"
              fill="none"
              viewBox="0 0 16 16"
              role="presentation"
              class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
            >
              <path
                fill="#44546f "
                fill-rule="evenodd"
                d="M0 3.125A2.625 2.625 0 0 1 2.625.5h10.75A2.625 2.625 0 0 1 16 3.125v8.25A2.625 2.625 0 0 1 13.375 14H4.449l-3.327 1.901A.75.75 0 0 1 0 15.25zM2.625 2C2.004 2 1.5 2.504 1.5 3.125v10.833L4.05 12.5h9.325c.621 0 1.125-.504 1.125-1.125v-8.25C14.5 2.504 13.996 2 13.375 2zM12 6.5H4V5h8zm-3 3H4V8h5z"
                clip-rule="evenodd"
              ></path>
            </svg>
            &nbsp; Nhận xét
          </h3>
          <input
            type="text"
            placeholder="Viết bình luận..."
            class="border-[1px] border-gray-200 pl-2 text-sm h-10 w-full outline-0 rounded-xl"
            v-model="commentToAdd.content"
          />
          <button
            :disabled="!commentToAdd.content"
            @click="handleUpdateComment"
            class="bg-blue-600 text-white text-sm py-1 px-2 mr-1 mt-1 rounded-sm font-medium disabled:bg-gray-100 disabled:text-gray-400"
          >
            Lưu
          </button>
          <!-- show comment -->
          <div class="flex flex-col max-h-[400px] mt-4 overflow-y-auto">
            <div class="flex gap-3 mb-4" v-for="comment in currentCard.comments">
              <div>
                <Avatar
                  :name="comment.userDisplayName"
                  :avatar="comment.userAvatar"
                  width="32px"
                  height="32px"
                />
              </div>
              <div>
                <div class="flex">
                  <h5 class="font-semibold text-sm mb-0.5 mr-1">{{ comment.userDisplayName }}</h5>
                  <span class="text-xs text-gray-600 italic">{{
                    convertTohhmmDDMMYYYY(new Date(comment.commentedAt))
                  }}</span>
                </div>
                <p class="text-sm">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<style scoped></style>
