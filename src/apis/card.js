import { serviceCommon } from '@/services/service-common'

export const createCard = (data) => {
  return serviceCommon({
    method: 'post',
    data: data,
    url: 'cards',
  })
}
