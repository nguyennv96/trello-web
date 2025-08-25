<script setup>
import { logout } from '@/apis/auth'
import { StatusCodes } from '@/constants/status-code'
import { getLoading } from '@/utils/el-loading'
import notification from '@/utils/el-notification'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const isOpen = ref(false)
const menuRef = ref(null)
const menuBoard = ref(null)
const store = useStore()
const router = useRouter()

const isOpenSelectBoardType = ref(false)
const isOpenMenuCreateBoard = ref(false)
const objCreateBoard = reactive({ title: '', description: '', type: 'private' })

const handleLogout = async () => {
  let loading
  try {
    loading = getLoading()
    const res = await logout()
    if (res.status === StatusCodes.OK) {
      store.commit('user/remove')
      router.replace('/login')
      notification.success('Đăng xuất thành công')
    }
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Đăng xuất không thành công',
    )
  } finally {
    if (loading) loading.close()
  }
}
onMounted(() => {
  window.addEventListener('click', handleClickOutsidev2)
})
onUnmounted(() => {
  window.removeEventListener('click', handleClickOutsidev2)
})
const handleToggleMenu = () => {
  isOpen.value = !isOpen.value
}
const handleClickOutside = (event) => {
  if (!event.target.closest('#avatar')) {
    isOpen.value = false
  }
}
const handleClickOutsidev2 = (e) => {
  if (
    menuRef.value &&
    !menuRef.value.contains(e.target) &&
    menuBoard.value &&
    !menuBoard.value.contains(e.target)
  ) {
    isOpen.value = false
    isOpenMenuCreateBoard.value = false
    isOpenSelectBoardType.value = false
  }
}
const handleToggleMenuSelectBoardType = () => {
  isOpenSelectBoardType.value = !isOpenSelectBoardType.value
}
const handleCloseMenuSelectBoardType = () => {
  isOpenSelectBoardType.value = false
}
const handleOpenMenuSelectBoardType = () => {
  isOpenMenuCreateBoard.value = false
  isOpenSelectBoardType.value = true
}
const handleCloseMenuCreateBoard = () => {
  isOpenMenuCreateBoard.value = false
}
const handleOpenMenuCreateBoard = () => {
  handleCloseMenuSelectBoardType()
  isOpenMenuCreateBoard.value = true
}
const resetState = () => {
  isOpenMenuCreateBoard.value = false
  isOpenSelectBoardType.value = false
  objCreateBoard.description = ''
  objCreateBoard.title = ''
  objCreateBoard.type = 'private'
}
const handleCreateBoard = () => {
  let loading
  try {
    if (!objCreateBoard.title || !objCreateBoard.description || !objCreateBoard.type) {
      notification.error(`Vui lòng nhập đầy đủ thông tin`)
      return
    }
    loading = getLoading()
    store.dispatch(`board/createBoard`, objCreateBoard)
    notification.success(`Tạo bảng thành công`)
    resetState()
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Tạo bảng không thành công',
    )
  } finally {
    if (loading) loading.close()
  }
}
</script>
<template>
  <header class="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
    <!-- Left: Logo + App Name -->
    <div class="flex items-center gap-2 w-1/5">
      <svg width="120px" height="25px">
        <symbol id="logo-glyph">
          <g>
            <path
              d="M0 5C0 2.23858 2.23858 0 5 0H19C21.7614 0 24 2.23858 24 5V19C24 21.7614 21.7614 24 19 24H5C2.23858 24 0 21.7614 0 19V5Z"
              fill="#0055CC"
            ></path>
            <rect
              x="4.43101"
              y="4.43101"
              width="5.90729"
              height="13.803"
              rx="0.947869"
              ry="0.947869"
              fill="#FFFFFF"
            ></rect>
            <rect
              x="13.6617"
              y="4.43101"
              width="5.90729"
              height="8.3366"
              rx="0.947869"
              ry="0.947869"
              fill="#FFFFFF"
            ></rect>
          </g>
        </symbol>
        <symbol id="logo-text">
          <path
            d="M33.623 17V8.74219H30.6289V7.13574H38.5518V8.74219H35.5576V17H33.623ZM39.3857 17V9.50098H41.252V10.6562H41.375C41.498 10.2507 41.7236 9.9362 42.0518 9.71289C42.3844 9.48958 42.7946 9.37793 43.2822 9.37793C43.4144 9.37793 43.5443 9.38704 43.6719 9.40527C43.7995 9.41895 43.9089 9.43945 44 9.4668V11.1143C43.8587 11.0778 43.7129 11.0505 43.5625 11.0322C43.4167 11.014 43.2686 11.0049 43.1182 11.0049C42.7399 11.0049 42.4095 11.0755 42.127 11.2168C41.849 11.3581 41.6325 11.5586 41.4775 11.8184C41.3271 12.0736 41.252 12.3789 41.252 12.7344V17H39.3857ZM48.4434 17.1572C47.6868 17.1572 47.0374 17 46.4951 16.6855C45.9528 16.3665 45.5358 15.9176 45.2441 15.3389C44.9525 14.7555 44.8066 14.0651 44.8066 13.2676V13.2607C44.8066 12.4632 44.9525 11.7728 45.2441 11.1895C45.5358 10.6016 45.9482 10.1481 46.4814 9.8291C47.0146 9.50553 47.6413 9.34375 48.3613 9.34375C49.0814 9.34375 49.7035 9.50098 50.2275 9.81543C50.7562 10.1253 51.1618 10.5628 51.4443 11.1279C51.7269 11.693 51.8682 12.3538 51.8682 13.1104V13.7051H45.7432V12.502H50.9658L50.0771 13.6299V12.8848C50.0771 12.4154 50.0065 12.0257 49.8652 11.7158C49.724 11.4014 49.5257 11.1644 49.2705 11.0049C49.0153 10.8454 48.7214 10.7656 48.3887 10.7656C48.056 10.7656 47.7598 10.8477 47.5 11.0117C47.2402 11.1758 47.0352 11.415 46.8848 11.7295C46.7389 12.0439 46.666 12.429 46.666 12.8848V13.6367C46.666 14.0788 46.7389 14.457 46.8848 14.7715C47.0306 15.0814 47.238 15.3184 47.5068 15.4824C47.7803 15.6465 48.1038 15.7285 48.4775 15.7285C48.7783 15.7285 49.0335 15.6852 49.2432 15.5986C49.4574 15.512 49.6283 15.4095 49.7559 15.291C49.888 15.168 49.9792 15.0563 50.0293 14.9561L50.0498 14.9082H51.7998L51.7861 14.9766C51.7269 15.2135 51.6175 15.4596 51.458 15.7148C51.3031 15.9701 51.0911 16.207 50.8223 16.4258C50.5534 16.64 50.2207 16.8154 49.8242 16.9521C49.4323 17.0889 48.972 17.1572 48.4434 17.1572ZM53.6045 17V6.61621H55.4707V17H53.6045ZM57.6514 17V6.61621H59.5176V17H57.6514ZM64.918 17.1572C64.1569 17.1572 63.5029 17.0023 62.9561 16.6924C62.4092 16.3779 61.9876 15.929 61.6914 15.3457C61.3997 14.7624 61.2539 14.0651 61.2539 13.2539V13.2402C61.2539 12.4336 61.402 11.7409 61.6982 11.1621C61.9945 10.5788 62.416 10.1299 62.9629 9.81543C63.5143 9.50098 64.166 9.34375 64.918 9.34375C65.6745 9.34375 66.3262 9.50098 66.873 9.81543C67.4199 10.1253 67.8415 10.5719 68.1377 11.1553C68.4339 11.7386 68.582 12.4336 68.582 13.2402V13.2539C68.582 14.0651 68.4339 14.7624 68.1377 15.3457C67.846 15.929 67.4268 16.3779 66.8799 16.6924C66.333 17.0023 65.679 17.1572 64.918 17.1572ZM64.918 15.6738C65.2917 15.6738 65.6061 15.5781 65.8613 15.3867C66.1211 15.1908 66.3193 14.9128 66.4561 14.5527C66.5973 14.1927 66.668 13.7598 66.668 13.2539V13.2402C66.668 12.7344 66.5973 12.3037 66.4561 11.9482C66.3193 11.5882 66.1211 11.3125 65.8613 11.1211C65.6016 10.9251 65.2871 10.8271 64.918 10.8271C64.5488 10.8271 64.2344 10.9251 63.9746 11.1211C63.7148 11.3125 63.5143 11.5882 63.373 11.9482C63.2363 12.3037 63.168 12.7344 63.168 13.2402V13.2539C63.168 13.7643 63.2363 14.1995 63.373 14.5596C63.5098 14.9196 63.708 15.1953 63.9678 15.3867C64.2321 15.5781 64.5488 15.6738 64.918 15.6738Z"
            fill="#172B4D"
          ></path>
        </symbol>
        <symbol id="logo-glyph-only" viewBox="0 0 24 24" width="24" height="24">
          <use href="#logo-glyph"></use>
        </symbol>
        <symbol id="logo-glyph-and-text" viewBox="0 0 70 24" width="70" height="24">
          <use href="#logo-glyph"></use>
          <use href="#logo-text"></use>
        </symbol>
        <use
          href="#logo-glyph-only"
          class="dW1ZzMRfhGzk3G"
          data-testid="team25-header-logo-glyph"
        ></use>
        <use
          href="#logo-glyph-and-text"
          class="cgeOlHBq0PVTSl"
          data-testid="team25-header-logo-glyph-and-text"
        ></use>
      </svg>
    </div>

    <!-- Middle: Search -->
    <div class="hidden md:flex flex-1 justify-center px-4 w-3/5">
      <div class="w-3/5 relative">
        <svg
          class="absolute top-1 left-1"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          stroke-width="0.00024000000000000003"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
              fill="#c2c2c2"
            ></path>
          </g>
        </svg>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          class="w-full rounded-xs max-w-md mr-1 px-3 py-1.5 pl-7 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div ref="menuBoard" class="inline-block relative">
          <button
            @click="handleToggleMenuSelectBoardType"
            class="text-xs bg-blue-500 text-white p-1.5 rounded-xs relative"
          >
            Tạo mới
          </button>
          <!-- menu lựa chọn tạo bảng -->
          <div
            :style="{ visibility: isOpenSelectBoardType ? 'visible' : 'hidden' }"
            class="w-[300px] absolute bg-white py-3 rounded-sm shadow-2xl right-0 top-10 border-gray-200"
          >
            <ul class="text-[#44546f]">
              <li class="mb-1 px-2 py-2 hover:bg-gray-100">
                <button @click="handleOpenMenuCreateBoard">
                  <span class="font-medium text-sm text-left flex mb-1">
                    <svg
                      class="mr-1"
                      fill="#44546f"
                      height="16px"
                      width="16px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 439.117 439.117"
                      xml:space="preserve"
                      stroke="#44546f"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path
                            d="M352.221,27.923c-0.199-2.606-2.371-4.62-4.985-4.62H137.546c-1.392,0-2.721,0.581-3.667,1.602 c-0.946,1.021-1.424,2.391-1.318,3.779l18.719,245.201c0.199,2.606,2.372,4.62,4.985,4.62h9.78l1.316,16.146 c0.211,2.595,2.379,4.594,4.983,4.594h185.867c5.368,0,10.534-2.264,14.173-6.211s5.476-9.28,5.039-14.63l-0.432-5.305 c-0.211-2.596-2.379-4.595-4.983-4.595h-1.421L352.221,27.923z M142.942,33.303h199.661l17.955,235.201h-199.66L142.942,33.303z M176.953,289.245l-0.875-10.74h16.237l0.058,0.711c0.213,2.613-0.648,5.113-2.425,7.041c-1.777,1.927-4.199,2.989-6.82,2.989 H176.953z M365.031,286.256c-1.776,1.927-4.199,2.989-6.82,2.989H199.995c1.786-3.255,2.633-6.987,2.347-10.74h163.612h1.444 l0.058,0.711C367.669,281.828,366.808,284.328,365.031,286.256z"
                          ></path>
                          <path
                            d="M347.712,261.556c1.393,0,2.722-0.581,3.668-1.602c0.946-1.021,1.424-2.391,1.317-3.779L336.566,44.871 c-0.199-2.606-2.371-4.62-4.985-4.62H155.788c-1.392,0-2.721,0.581-3.667,1.602c-0.946,1.021-1.424,2.391-1.318,3.779 l16.131,211.305c0.199,2.606,2.372,4.62,4.985,4.62H347.712z M161.184,50.251h165.765l15.367,201.305H176.551L161.184,50.251z"
                          ></path>
                          <path
                            d="M373.745,4.62C373.546,2.013,371.374,0,368.76,0L70.356,0.002c-2.614,0-4.787,2.013-4.985,4.62L32.613,433.736 c-0.106,1.388,0.372,2.757,1.318,3.779c0.946,1.021,2.275,1.602,3.667,1.602h39.683c2.614,0,4.787-2.013,4.985-4.62l7.825-102.501 h25.941l7.825,102.499c0.199,2.606,2.372,4.62,4.985,4.62h39.683c1.392,0,2.721-0.581,3.667-1.602 c0.946-1.021,1.424-2.391,1.318-3.779l-7.767-101.74h107.632l-7.767,101.741c-0.106,1.388,0.371,2.757,1.317,3.779 c0.946,1.021,2.275,1.602,3.668,1.602l39.677,0.001c2.614,0,4.786-2.013,4.985-4.62l7.825-102.503h25.943l7.824,102.503 c0.199,2.606,2.371,4.62,4.985,4.62l39.684-0.002c1.393,0,2.722-0.581,3.668-1.602c0.946-1.021,1.424-2.391,1.317-3.779 L373.745,4.62z M74.989,10.002h6.355L49.345,429.117h-6.35L74.989,10.002z M85.458,321.996c-2.614,0-4.787,2.013-4.985,4.62 l-7.825,102.501H59.374l32-419.12h0.078l23.818,311.999H85.458z M101.48,10h6.35l31.995,419.114h-6.351L101.48,10z M282.335,429.115h-6.344l7.414-97.12h6.344L282.335,429.115z M305.639,429.117h-13.274l7.414-97.123h13.275L305.639,429.117z M359.054,331.994h6.35l7.415,97.123h-6.351L359.054,331.994z M382.848,429.114l-7.825-102.5c-0.199-2.606-2.372-4.62-4.985-4.62 H160.348c-1.392,0-2.721,0.581-3.667,1.602c-0.946,1.021-1.424,2.391-1.318,3.779l7.766,101.74h-13.274L117.86,10h246.267 l31.995,419.114H382.848z"
                          ></path>
                          <path
                            d="M90.755,192.899c-2.748-0.221-5.155,1.852-5.366,4.605l-8.177,107.121c-0.21,2.753,1.852,5.156,4.605,5.366 c0.129,0.01,0.258,0.015,0.386,0.015c2.588,0,4.78-1.996,4.98-4.62l8.177-107.121C95.571,195.511,93.509,193.109,90.755,192.899z"
                          ></path>
                          <path
                            d="M99.911,309.991c0.129,0.01,0.258,0.015,0.386,0.015c2.588,0,4.78-1.996,4.98-4.62l2.282-29.895 c0.21-2.753-1.852-5.156-4.605-5.366c-2.744-0.219-5.156,1.852-5.366,4.605l-2.282,29.895 C95.096,307.378,97.158,309.781,99.911,309.991z"
                          ></path>
                          <path
                            d="M240.56,68.785h76.262c2.762,0,5-2.239,5-5s-2.238-5-5-5H240.56c-2.762,0-5,2.239-5,5S237.798,68.785,240.56,68.785z"
                          ></path>
                          <path
                            d="M186.541,245.14h50.841c2.762,0,5-2.239,5-5s-2.238-5-5-5h-50.841c-2.761,0-5,2.239-5,5S183.78,245.14,186.541,245.14z"
                          ></path>
                          <path
                            d="M262.803,235.14h-11.121c-2.762,0-5,2.239-5,5s2.238,5,5,5h11.121c2.762,0,5-2.239,5-5S265.564,235.14,262.803,235.14z"
                          ></path>
                          <path
                            d="M316.821,76.261h-27.009c-2.762,0-5,2.239-5,5s2.238,5,5,5h27.009c2.762,0,5-2.239,5-5S319.583,76.261,316.821,76.261z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    &nbsp; Tạo bảng
                  </span>
                  <p class="text-xs text-left">
                    Một bảng được tạo thành từ các thẻ được sắp xếp trong danh sách. Sử dụng bảng để
                    quản lý các dự án, theo dõi thông tin, hoặc tổ chức bất cứ việc gì.
                  </p>
                </button>
              </li>
              <li class="mb-1 px-2 py-2 hover:bg-gray-100 cursor-not-allowed">
                <button class="cursor-not-allowed">
                  <span class="font-medium text-sm text-left flex mb-1">
                    <svg
                      class="mr-1"
                      width="16px"
                      height="16px"
                      viewBox="0 0 21 21"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#44546f"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g
                          fill="none"
                          fill-rule="evenodd"
                          stroke="#44546f"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          transform="translate(3 3)"
                        >
                          <path
                            d="m14.4978951 12.4978973-.0105089-9.99999996c-.0011648-1.10374784-.8962548-1.99789734-2-1.99789734h-9.99999995c-1.0543629 0-1.91816623.81587779-1.99451537 1.85073766l-.00548463.151365.0105133 10.00000004c.0011604 1.1037478.89625045 1.9978973 1.99999889 1.9978973h9.99999776c1.0543618 0 1.9181652-.8158778 1.9945143-1.8507377z"
                          ></path>
                          <path d="m4.5 4.5v9.817"></path>
                          <path d="m7-2v14" transform="matrix(0 1 -1 0 12.5 -2.5)"></path>
                        </g>
                      </g>
                    </svg>
                    &nbsp;Bắt đầu với mẫu
                  </span>
                  <p class="text-xs text-left">Bắt đầu nhanh hơn với mẫu bảng.</p>
                </button>
              </li>
            </ul>
          </div>
          <!-- form tạo bảng -->
          <div
            :style="{ visibility: isOpenMenuCreateBoard ? 'visible' : 'hidden' }"
            class="w-[300px] absolute bg-white py-3 rounded-sm shadow-2xl right-0 top-10 border-gray-200 px-3 z-10"
          >
            <header class="flex justify-between">
              <button @click="handleOpenMenuSelectBoardType">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  fill="#44546f"
                  class="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </button>

              <h5 class="text-[#44546f] font-semibold text-sm">Tạo bảng</h5>
              <button @click="handleCloseMenuCreateBoard">
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
                <label class="font-semibold text-xs" for=""
                  >Tiêu đề bảng <span class="text-red-500">*</span></label
                ><br />
                <input
                  v-model="objCreateBoard.title"
                  placeholder="Nhập tiêu đề bảng ở đây"
                  class="border-gray-200 border py-2 px-2 text-xs w-full rounded-sm focus:border-blue-600 outline-none"
                  type="text"
                /><br />
                <span class="text-xs">👋 Tiêu đề bảng là bắt buộc</span>
              </div>
              <div>
                <label class="font-semibold text-xs" for=""
                  >Mô tả <span class="text-red-500">*</span></label
                ><br />
                <input
                  v-model="objCreateBoard.description"
                  placeholder="Nhập mô tả bảng ở đây"
                  type="text"
                  class="border-gray-200 border py-2 px-2 text-xs w-full rounded-sm focus:border-blue-600 outline-none"
                /><br />
                <span class="text-xs">👋 Mô tả là bắt buộc</span>
              </div>
              <div>
                <label class="font-semibold text-xs" for=""
                  >Quyền xem <span class="text-red-500">*</span></label
                ><br />
                <select
                  v-model="objCreateBoard.type"
                  class="border-gray-200 border py-2 px-2 text-xs w-full rounded-sm focus:border-blue-600 outline-none"
                  name=""
                  id=""
                >
                  <option value="public">Công khai</option>
                  <option value="private">Riêng tư</option>
                </select>
                <br />
                <span class="text-xs">👋 Quyền xem là bắt buộc</span>
              </div>
              <div class="mt-1">
                <button
                  @click="handleCreateBoard"
                  class="bg-blue-600 text-white w-full py-1 text-sm rounded-sm"
                >
                  Tạo mới
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: User Menu -->
    <div class="flex items-center gap-4 w-1/5 justify-end">
      <!-- Notification Icon -->
      <button class="relative p-1 hover:bg-gray-100 rounded-full">
        <svg
          class="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 17h5l-1.405-1.405C18.79 14.79 18 13.42 18 12V8a6 6 0 10-12 0v4c0 1.42-.79 2.79-1.595 3.595L3 17h5m4 0v1a3 3 0 006 0v-1m-6 0h6"
          />
        </svg>
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <!-- Avatar -->
      <div ref="menuRef" class="relative w-8 h-8" id="avatar">
        <button
          @click="handleToggleMenu"
          v-if="!store.state.user.user.avatar"
          class="avatar w-8 h-8 bg-amber-400 font-semibold flex justify-center items-center rounded-[50%]"
        >
          {{ String(store.state.user.user.displayName).charAt(0).toUpperCase() }}
        </button>
        <button
          @click="handleToggleMenu"
          v-else
          class="avatar w-8 h-8 flex justify-center items-center rounded-[50%] bg-center bg-cover"
          :style="{ backgroundImage: `url(${store.state.user.user.avatar})` }"
        ></button>
        <div
          class="shadow-xl absolute right-0 top-[56px] bg-white z-50 rounded-sm pt-4 w-[200px] text-[#44546f]"
          v-if="isOpen"
        >
          <div>
            <h5 class="text-sm font-semibold px-2 mb-1">TÀI KHOẢN</h5>
            <div class="flex justify-between px-2 mb-1 gap-2">
              <div
                v-if="!store.state.user.user.avatar"
                class="avatar w-8 h-8 bg-amber-400 font-semibold flex justify-center items-center rounded-[50%]"
              >
                {{ String(store.state.user.user.displayName).charAt(0).toUpperCase() }}
              </div>
              <div
                v-else
                class="avatar w-8 h-8 flex justify-center items-center rounded-[50%] bg-center bg-cover"
                :style="{ backgroundImage: `url(${store.state.user.user.avatar})` }"
              ></div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm overflow-hidden text-ellipsis">
                  {{ store.state.user.user.displayName }}
                </p>
                <span class="text-xs overflow-hidden text-ellipsis block">{{
                  store.state.user.user.displayName
                }}</span>
              </div>
            </div>
            <ul class="mb-2">
              <li class="hover:bg-gray-100 px-2 mb-1">
                <a href="/profile" target="_blank" class="flex justify-between py-2">
                  <p class="text-sm">Quản lý tài khoản</p>
                  <svg
                    width="16px"
                    height="16px"
                    viewBox="0 -0.5 25 25"
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
                      <path
                        d="M12.5 6.25C12.9142 6.25 13.25 5.91421 13.25 5.5C13.25 5.08579 12.9142 4.75 12.5 4.75V6.25ZM20.25 12.5C20.25 12.0858 19.9142 11.75 19.5 11.75C19.0858 11.75 18.75 12.0858 18.75 12.5H20.25ZM19.5 6.25C19.9142 6.25 20.25 5.91421 20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75V6.25ZM15.412 4.75C14.9978 4.75 14.662 5.08579 14.662 5.5C14.662 5.91421 14.9978 6.25 15.412 6.25V4.75ZM20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75C19.0858 4.75 18.75 5.08579 18.75 5.5H20.25ZM18.75 9.641C18.75 10.0552 19.0858 10.391 19.5 10.391C19.9142 10.391 20.25 10.0552 20.25 9.641H18.75ZM20.0303 6.03033C20.3232 5.73744 20.3232 5.26256 20.0303 4.96967C19.7374 4.67678 19.2626 4.67678 18.9697 4.96967L20.0303 6.03033ZM11.9697 11.9697C11.6768 12.2626 11.6768 12.7374 11.9697 13.0303C12.2626 13.3232 12.7374 13.3232 13.0303 13.0303L11.9697 11.9697ZM12.5 4.75H9.5V6.25H12.5V4.75ZM9.5 4.75C6.87665 4.75 4.75 6.87665 4.75 9.5H6.25C6.25 7.70507 7.70507 6.25 9.5 6.25V4.75ZM4.75 9.5V15.5H6.25V9.5H4.75ZM4.75 15.5C4.75 18.1234 6.87665 20.25 9.5 20.25V18.75C7.70507 18.75 6.25 17.2949 6.25 15.5H4.75ZM9.5 20.25H15.5V18.75H9.5V20.25ZM15.5 20.25C18.1234 20.25 20.25 18.1234 20.25 15.5H18.75C18.75 17.2949 17.2949 18.75 15.5 18.75V20.25ZM20.25 15.5V12.5H18.75V15.5H20.25ZM19.5 4.75H15.412V6.25H19.5V4.75ZM18.75 5.5V9.641H20.25V5.5H18.75ZM18.9697 4.96967L11.9697 11.9697L13.0303 13.0303L20.0303 6.03033L18.9697 4.96967Z"
                        fill="#706b6b"
                      ></path>
                    </g>
                  </svg>
                </a>
              </li>
              <hr class="text-gray-300 mb-1" />
              <li @click="handleLogout" class="hover:bg-gray-100 px-2">
                <div class="flex justify-between py-2">
                  <p class="text-sm">Đăng xuất</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- Dropdown menu nếu cần -->
      </div>
    </div>
  </header>
</template>
<style scoped></style>
