import axios from 'axios'

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
