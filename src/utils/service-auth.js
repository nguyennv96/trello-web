import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_VUE_API_URL,
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log('Error in request interceptor:', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    console.log('Response intercepted:', response)
    return response
  },
  (error) => {
    console.log('Error in response interceptor:', error)
    return Promise.reject(error)
  },
)
