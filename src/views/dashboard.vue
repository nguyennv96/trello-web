<script setup>
import { logout } from '@/apis/auth'
import { StatusCodes } from '@/constants/status-code'
import { getLoading } from '@/utils/el-loading'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const handleLogout = async () => {
  let loading
  try {
    loading = getLoading()
    const res = await logout()
    if (res.status === StatusCodes.OK) {
      store.commit('user/remove')
      router.replace('/login')
    }
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Đăng xuất không thành công',
    )
  } finally {
    if (loading) loading.close()
  }
}
</script>
<template>
  <div>
    <div class="w-1/4 text-center border-gray-200 shadow-sm ml-[20%]">
      <img class="mx-auto w-full" src="@/assets/images/home-message.svg" alt="" />
      <h5 class="font-semibold text-center mt-2 mb-2 text-sm">Theo dõi và cập nhật</h5>
      <p class="text-center px-5 pb-2 text-xs">
        Mời mọi người vào bảng và thẻ, để lại nhận xét, thêm ngày hết hạn và chúng tôi sẽ hiển thị
        hoạt động quan trọng nhất ở đây.
      </p>
    </div>
  </div>
</template>
<style scoped>
.active-link {
  background-color: #e9f2ff;
  color: #0c66e4;
}
</style>
