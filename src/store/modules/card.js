import { createCard, updateCard } from '@/apis/card'

let emptyState = {}
const card = {
  namespaced: true,
  state: () => ({
    currentCard: null,
  }),
  mutations: {
    setCurrentCard(state, currentCard) {
      state.currentCard = currentCard
    },
  },
  getters: {},
  actions: {
    async createCard({ dispatch, commit }, card) {
      try {
        const res = await createCard(card)
        await dispatch('board/getDetail', res.data.boardId, { root: true })
      } catch (error) {
        throw error
      }
    },
    async updateCard({ dispatch, commit }, payload) {
      try {
        const res = await updateCard(payload.id, payload.data)
        commit('setCurrentCard', res.data)
        await dispatch('board/getDetail', res.data.boardId, { root: true })
      } catch (error) {
        throw error
      }
    },
  },
}
export default card
