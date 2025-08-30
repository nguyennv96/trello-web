import { invite, invitations, updateInvitations } from '@/apis/invitation'

let emptyState = {}
const invitation = {
  namespaced: true,
  state: () => ({
    invitations: [],
  }),
  mutations: {
    SET_INVITATIONS: (state, data) => {
      state.invitations = data
    },
    UPDATE_INVITATION: (state, data) => {
      let indexInvitation = Array.from(state.invitations).findIndex(
        (value) => value._id === data._id,
      )
      state.invitations[indexInvitation].boardInvitation.status = data.boardInvitation.status
    },
  },
  getters: {},
  actions: {
    async inviteBoard({ dispatch, commit }, payload) {
      try {
        const res = await invite(payload)
        return res.data
      } catch (error) {
        throw error
      }
    },
    async fetchInvitations({ dispatch, commit }) {
      try {
        const res = await invitations()
        commit('SET_INVITATIONS', res.data)
      } catch (error) {
        throw error
      }
    },
    async responseInvitation({ dispatch, commit }, payload) {
      try {
        let inviteId = payload.inviteId
        let data = { status: payload.status }
        const res = await updateInvitations(inviteId, data)
        commit('UPDATE_INVITATION', res.data)
      } catch (error) {
        throw error
      }
    },
  },
}
export default invitation
