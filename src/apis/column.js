import { serviceCommon } from '@/services/service-common'

export const createColumn = (data) => {
  return serviceCommon({
    method: 'post',
    data: data,
    url: 'columns',
  })
}
export const updateColumn = (id, data) => {
  return serviceCommon({
    method: 'put',
    data: data,
    url: `columns/${id}`,
  })
}
