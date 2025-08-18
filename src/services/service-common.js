import { getLoading } from '@/utils/el-loading'
import axios from 'axios'
import { store } from '@/store/store'
import { router } from '@/routers/index'
import notification from '@/utils/el-notification'
import { logout } from '@/apis/auth'
import { StatusCodes } from '@/constants/status-code'

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

export const serviceCommon = axios.create({
  baseURL: import.meta.env.VITE_VUE_API_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 60000,
})
serviceCommon.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)
serviceCommon.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log(error)
    if (error.response.status === 401 || error.response.status === 403) {
      handleLogout()
      return Promise.reject(error)
    }
    if (error.response.status === 410) {
      // gọi refresh token
      const res = await serviceCommon.get('/users/refresh_token')
      // thực hiện lại request vừa rồi
      if (res.status === 200) {
        return serviceCommon(error.config)
      }
    }
    return Promise.reject(error)
  },
)
