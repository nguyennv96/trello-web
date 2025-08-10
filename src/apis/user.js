import { serviceCommon } from '@/utils/service-common'

export const update = (data) => {
  return serviceCommon({
    method: 'put',
    data: data,
    url: 'users/update',
  })
}
