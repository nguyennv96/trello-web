<script setup>
import { update } from '@/apis/user'
import InputProfile from '@/components/input-profile.vue'
import { StatusCodes } from '@/constants/status-code'
import { getLoading } from '@/utils/el-loading'
import notification from '@/utils/el-notification'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.state.user.user)
const refFile = ref(null)

const handleSelectAvatar = () => {
  refFile.value.click()
}
const handleFileChange = async (event) => {
  console.log(event)
  let loading
  // lấy file, gán vào form, gọi api
  try {
    loading = getLoading()
    let file = event.target.files[0]
    let form = new FormData()
    form.append('avatar', file)
    const res = await update(form)
    if (res.status === StatusCodes.OK) {
      let userInfo = { ...res.data }
      notification.success(`Cập nhật ảnh đại diện thành công`)
      store.commit('user/set', userInfo)
    }
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error.message || 'Cập nhật ảnh đại diện không thành công',
    )
  } finally {
    if (loading) loading.close()
  }
}
</script>
<template>
  <div class="w-[40%] mx-auto">
    <h1 class="font-semibold text-xl text-[#172b4d] mb-2">Hồ sơ và chế độ hiển thị</h1>
    <p class="font-light text-sm mb-1">
      Quản lý thông tin cá nhân của bạn, đồng thời kiểm soát thông tin nào người khác xem được và
      ứng dụng nào có thể truy cập.
    </p>
    <a href="#" class="text-blue-500 text-sm underline font-light"
      >Tìm hiểu thêm về hồ sơ và chế độ hiển thị của bạn</a
    >
    <span class="text-sm font-light"> hoặc </span>
    <a href="#" class="text-blue-500 text-sm underline font-light"
      >xem chính sách quyền riêng tư của chúng tôi.</a
    >
    <h2 class="font-semibold text-md text-[#172b4d] mt-5">Ảnh hồ sơ</h2>
    <div>
      <div
        v-if="store.state.user.user.avatar"
        class="w-30 h-30 relative mx-auto rounded-full bg-center bg-cover hover:bg-black"
        :style="{ backgroundImage: `url(${store.state.user.user.avatar})` }"
        alt=""
      >
        <div
          @click="handleSelectAvatar"
          class="absolute inset-0 bg-black/50 rounded-full flex items-center cursor-pointer text-amber-400 justify-center opacity-0 hover:opacity-100 transition"
        >
          <span class="text-sm">Đổi ảnh</span>
        </div>
      </div>
      <div
        v-else
        class="w-30 h-30 relative mx-auto rounded-full flex justify-center items-center bg-amber-400 font-semibold text-5xl"
        alt=""
      >
        {{ String(store.state.user.user.displayName).charAt(0).toUpperCase() }}
        <div
          class="absolute inset-0 bg-black/50 rounded-full flex items-center cursor-pointer text-amber-400 justify-center opacity-0 hover:opacity-100 transition"
        >
          <span class="text-sm">Đổi ảnh</span>
        </div>
      </div>
    </div>
    <input @change="handleFileChange" type="file" ref="refFile" hidden />
    <h2 class="font-semibold text-md text-[#172b4d] mb-5">Giới thiệu về bạn</h2>
    <div class="border-gray-200 rounded-sm border p-5 text-[#172b4d]">
      <InputProfile label="Tên công khai" :value="user.displayName" field="displayName" />
      <InputProfile label="Tên định danh" :value="user.username" :readonly="true" />
      <InputProfile label="Email" :value="user.email" :readonly="true" />
    </div>
  </div>
</template>
<style scoped></style>
