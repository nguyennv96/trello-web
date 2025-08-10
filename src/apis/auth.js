import { instance } from '@/utils/service-auth'

export const login = (data) => {
  return instance.post('/users/login', data)
}
