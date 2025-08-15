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
  <h1>Welcome</h1>
  <RouterLink to="/login">Login</RouterLink>
  <button @click="handleLogout" class="bg-blue-500">Logout</button>
</template>
