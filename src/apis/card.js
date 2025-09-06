import { serviceCommon } from '@/services/service-common'

export const createCard = (data) => {
  return serviceCommon({
    method: 'post',
    data: data,
    url: 'cards',
  })
}
export const updateCard = (id, data) => {
  return serviceCommon({
    method: 'put',
    data: data,
    url: `cards/${id}`,
  })
}
