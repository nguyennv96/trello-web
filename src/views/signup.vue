<script setup>
import '@/assets/main.css'
import { RouterLink, useRouter } from 'vue-router'
import notification from '@/utils/el-notification'
import { reactive } from 'vue'
import { signup } from '@/apis/auth'
import { getLoading } from '@/utils/el-loading'

const objRegister = reactive({
  email: null,
  password: null,
})
const router = useRouter()
const handleRegister = async () => {
  let loading
  try {
    if (!objRegister.email || !objRegister.password) {
      throw new Error('Vui lòng nhập email và mật khẩu')
    }
    if (objRegister.password.length < 8) {
      throw new Error('Vui lòng nhập mật khẩu có độ dài tối thiểu 8 kí tự')
    }
    loading = getLoading()
    const res = await signup(objRegister)
    if (res.status === 201) {
      objRegister.email = null
      objRegister.password = null
      notification.success('Đăng ký thành công')
      router.push('/login')
      return
    }
  } catch (error) {
    // console.log(error)
    notification.error(
      error?.response?.data?.message || error.message || 'Đăng ký không thành công',
    )
  } finally {
    loading.close()
  }
}
</script>

<template>
  <div class="h-screen w-screen flex">
    <div class="basis-0 grow flex items-end">
      <img width="80%" src="@/assets/images/trello-left.svg" alt="" />
    </div>
    <div
      class="basis-0 grow-[2] flex justify-center text-center items-start pt-[4%] [@media(min-width:1920px)]:pt-[7%]"
    >
      <div class="w-[40%] shadow-xl p-10">
        <svg width="150px" class="mx-auto mb-5" viewBox="0 0 113 32">
          <path
            fill="var(--text-color, #1e1f21)"
            d="M104.97 25.64c-4.6 0-7.3-3.4-7.3-8s2.7-7.94 7.3-7.94c4.57 0 7.24 3.34 7.24 7.94s-2.67 8-7.24 8m0-13.49c-3.28 0-4.72 2.58-4.72 5.49s1.44 5.55 4.72 5.55c3.25 0 4.66-2.64 4.66-5.55s-1.41-5.49-4.66-5.49M96.21 25.3c-.21.06-.67.12-1.35.12-2.51 0-4.11-1.19-4.11-4.02V3.59h2.64V21.1c0 1.38.92 1.87 2.06 1.87.28 0 .46 0 .77-.03zm-8 0c-.21.06-.67.12-1.35.12-2.51 0-4.11-1.19-4.11-4.02V3.59h2.64V21.1c0 1.38.92 1.87 2.06 1.87.28 0 .46 0 .77-.03zM72.86 12.09c-2.79 0-4.2 1.81-4.48 4.48h8.56c-.15-2.85-1.44-4.48-4.08-4.48m5.89 12.64c-1.26.67-3.19.92-4.75.92-5.73 0-8.25-3.31-8.25-8 0-4.63 2.58-7.94 7.24-7.94 4.72 0 6.62 3.28 6.62 7.94v1.2H68.42c.37 2.61 2.05 4.29 5.67 4.29 1.78 0 3.28-.34 4.66-.83zm-19.48-8.44v9.05h-2.58V10h2.58v2.7c.89-1.81 2.42-3.1 5.43-2.91v2.58c-3.37-.34-5.43.67-5.43 3.93M40.28 5.19h15.09v2.64H49.2v17.51h-2.76V7.82h-6.16z"
          ></path>
          <path
            fill="var(--tile-color,#1558bc)"
            d="M0 8a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z"
          ></path>
          <path
            fill="var(--icon-color, white)"
            d="M12.9 24c.62 0 1.13-.49 1.13-1.1V9.1c0-.61-.5-1.1-1.13-1.1H8.13C7.51 8 7 8.49 7 9.1v13.8c0 .61.5 1.1 1.13 1.1zm10.97-6.34c.62 0 1.13-.49 1.13-1.1V9.1c0-.61-.5-1.1-1.13-1.1H19.1c-.62 0-1.13.49-1.13 1.1v7.47c0 .61.5 1.1 1.13 1.1z"
          ></path>
        </svg>
        <h5 class="text-gray-700 font-bold">Đăng ký để tiếp tục</h5>
        <div class="text-left mb-1">
          <label class="text-gray-700 font-semibold text-xs" for=""
            >Email <span class="text-red-600">*</span></label
          ><br />
          <input
            v-model="objRegister.email"
            class="border border-gray-400 rounded-xs w-full p-1.5 py-2 mt-2 mb-3 text-xs"
            type="email"
            placeholder="Nhập email của bạn"
          /><br />
          <label class="text-gray-700 font-semibold text-xs" for=""
            >Mật khẩu <span class="text-red-600">*</span></label
          ><br />
          <input
            v-model="objRegister.password"
            class="border border-gray-400 rounded-xs w-full p-1.5 py-2 mt-2 mb-3 text-xs"
            type="password"
            placeholder="Nhập mật khẩu của bạn"
          />
          <p class="text-gray-400 text-xs">
            Bằng việc đăng ký, tôi chấp nhận
            <a class="decoration-1 underline text-blue-600 text-xs"
              >Điều khoản dịch vụ của Atlassian Cloud</a
            >
            và công nhận
            <a class="decoration-1 underline text-blue-600 text-xs"> Chính sách quyền riêng tư﻿</a>
          </p>
          <!-- <input class="mb-3" type="checkbox" name="" id="" />&nbsp;
          <label class="text-sm text-gray-700" for="">Nhớ thông tin đăng nhập của tôi</label> -->
        </div>
        <button
          @click="handleRegister"
          class="bg-blue-600 text-white w-full p-1.5 py-2 mb-4 rounded-xs font-medium text-sm"
        >
          Đăng ký
        </button>
        <p class="text-gray-500 font-semibold mb-4 text-sm">Hoặc tiếp tục với:</p>
        <button
          class="flex w-full justify-center border border-gray-300 p-1.5 rounded-xs mb-4 text-sm font-semibold items-center"
          disabled
        >
          <img width="25px" src="@/assets/images/google-logo.svg" />&nbsp; Google
        </button>
        <button
          class="flex w-full justify-center border border-gray-300 p-1.5 rounded-xs mb-4 text-sm font-semibold items-center"
          disabled
        >
          <img width="25px" src="@/assets/images/microsoft-logo.svg" /> &nbsp; Microsoft
        </button>
        <button
          class="flex w-full justify-center border border-gray-300 p-1.5 rounded-xs mb-4 text-sm font-semibold items-center"
          disabled
        >
          <img width="25px" src="@/assets/images/apple-logo.svg" /> &nbsp; Apple
        </button>
        <button
          class="flex w-full justify-center border border-gray-300 p-1.5 rounded-xs mb-4 text-sm font-semibold items-center"
          disabled
        >
          <img width="25px" src="@/assets/images/slack-logo.svg" />&nbsp; Slack
        </button>
        <RouterLink to="/login" class="decoration-1 underline text-blue-600 text-xs"
          >Bạn đã có tài khoản Atlassian? &nbsp;&nbsp;Đăng nhập</RouterLink
        >
        <hr class="text-gray-400 mt-3 mb-3" />
        <svg
          width="150px"
          class="mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 198 32"
          focusable="false"
          aria-hidden="true"
          height="32"
          fill="none"
        >
          <path
            fill="#6C6F77"
            d="M22.878 24.378 12.293 3.208c-.208-.458-.416-.541-.666-.541-.209 0-.459.083-.709.5-1.5 2.375-2.167 5.125-2.167 8 0 4.001 2.042 7.752 5.043 13.794.333.667.583.792 1.166.792h7.335c.542 0 .833-.208.833-.625 0-.208-.041-.333-.25-.75M7.501 14.377c-.833-1.25-1.083-1.334-1.292-1.334s-.333.083-.708.834L.208 24.46c-.166.334-.208.459-.208.625 0 .334.292.667.917.667h7.46c.5 0 .874-.416 1.083-1.208.25-1 .333-1.876.333-2.917 0-2.917-1.292-5.751-2.292-7.251z"
          ></path>
          <path
            fill="#6C6F77"
            d="M107.447 10.828c0 2.972 1.345 5.308 6.795 6.37 3.185.707 3.893 1.203 3.893 2.265 0 1.061-.708 1.698-2.973 1.698-2.619 0-5.733-.92-7.785-2.123v4.813c1.627.778 3.751 1.698 7.785 1.698 5.662 0 7.856-2.548 7.856-6.228m0 .07c0-3.538-1.84-5.166-7.148-6.298-2.902-.637-3.61-1.274-3.61-2.194 0-1.133 1.062-1.628 2.973-1.628 2.335 0 4.6.708 6.794 1.698v-4.6c-1.557-.779-3.892-1.345-6.653-1.345-5.237 0-7.927 2.265-7.927 5.945m72.475-5.803v20.17h4.318V9.979l1.769 4.035 6.087 11.324h5.379V5.166h-4.247v13.022l-1.628-3.821-4.883-9.201zm-27.319 0h-4.671v20.17h4.671zm-10.05 14.154c0-3.538-1.841-5.166-7.149-6.298-2.902-.637-3.609-1.274-3.609-2.194 0-1.133 1.061-1.628 2.972-1.628 2.336 0 4.601.708 6.795 1.699v-4.6c-1.557-.78-3.893-1.346-6.653-1.346-5.238 0-7.927 2.265-7.927 5.946 0 2.972 1.344 5.308 6.794 6.37 3.185.707 3.893 1.203 3.893 2.264 0 1.062-.708 1.699-2.973 1.699-2.618 0-5.733-.92-7.785-2.123v4.812c1.628.779 3.751 1.699 7.785 1.699 5.592 0 7.857-2.548 7.857-6.3M71.069 5.166v20.17h9.625l1.486-4.387h-6.44V5.166zm-19.039 0v4.317h5.167v15.854h4.741V9.483h5.592V5.166zm-6.866 0h-6.157L32 25.336h5.379l.99-3.396c1.204.353 2.478.566 3.752.566s2.548-.213 3.751-.567l.991 3.398h5.379c-.07 0-7.078-20.171-7.078-20.171M42.05 18.259c-.92 0-1.77-.141-2.548-.354L42.05 9.13l2.548 8.776a9.6 9.6 0 0 1-2.548.354zM97.326 5.166H91.17l-7.078 20.17h5.38l.99-3.396c1.203.353 2.477.566 3.751.566s2.548-.213 3.751-.567l.991 3.398h5.379zm-3.114 13.093c-.92 0-1.77-.141-2.548-.354l2.548-8.776 2.548 8.776a9.6 9.6 0 0 1-2.548.354m75.306-13.093h-6.157l-7.007 20.17h5.379l.991-3.396c1.203.353 2.477.566 3.751.566s2.548-.213 3.751-.567l.991 3.398h5.379zm-3.043 13.093c-.92 0-1.77-.141-2.548-.354l2.548-8.776 2.548 8.776a10 10 0 0 1-2.548.354"
          ></path>
        </svg>
        <p class="text-gray-400 text-xs mb-3">
          Một tài khoản cho Trello, Jira, Confluence và
          <a class="decoration-1 underline text-blue-500">sản phẩm khác </a>
        </p>
        <p class="text-gray-400 text-xs">
          Trang này được bảo vệ bởi reCAPTCHA tuân theo
          <a class="decoration-1 underline text-blue-500">Chính sách quyền riêng tư</a> và
          <a class="decoration-1 underline text-blue-500">Điều khoản dịch vụ</a>
          của Google
        </p>
      </div>
    </div>
    <div class="basis-0 grow flex items-end justify-end">
      <img width="80%" src="@/assets/images/trello-right.svg" alt="" />
    </div>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
}
</style>
