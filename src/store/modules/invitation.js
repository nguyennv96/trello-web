import { invite, invitations } from '@/apis/invitation'

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
  },
  getters: {},
  actions: {
    async inviteBoard({ dispatch, commit }, payload) {
      try {
        const res = await invite(payload)
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
  },
}
export default invitation
