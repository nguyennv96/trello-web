import { serviceCommon } from '@/services/service-common'

export const invite = (data) => {
  return serviceCommon({
    method: 'post',
    data: data,
    url: 'invitations/board',
  })
}
export const invitations = () => {
  return serviceCommon({
    method: 'get',
    url: 'invitations',
  })
}
export const updateInvitations = (inviteId, data) => {
  return serviceCommon({
    method: 'put',
    data: data,
    url: `invitations/board/${inviteId}`,
  })
}
