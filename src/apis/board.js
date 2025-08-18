import { serviceCommon } from '@/services/service-common'

export const createBoard = (data) => {
  return serviceCommon({
    method: 'post',
    data: data,
    url: 'boards',
  })
}
export const listBoard = () => {
  return serviceCommon({
    method: 'get',
    url: 'boards',
  })
}
export const detailBoard = (id) => {
  return serviceCommon({
    method: 'get',
    url: `boards/${id}`,
  })
}
export const updateBoard = (id, data) => {
  return serviceCommon({
    method: 'put',
    url: `boards/${id}`,
    data: data,
  })
}
