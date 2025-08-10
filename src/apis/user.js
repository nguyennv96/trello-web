import { serviceCommon } from '@/services/service-common'

export const update = (data) => {
  return serviceCommon({
    method: 'put',
    data: data,
    url: 'users/update',
  })
}
