import { instance } from '@/services/service-auth'

export const login = (data) => {
  return instance.post('/users/login', data)
}
