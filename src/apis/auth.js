import { instance } from '@/services/service-auth'

export const login = (data) => {
  return instance.post('/users/login', data)
}
export const signup = (data) => {
  return instance.post('/users/register', data)
}
export const verify = (data) => {
  return instance.put('/users/verify', data)
}
export const logout = () => {
  return instance.delete('/users/logout')
}
