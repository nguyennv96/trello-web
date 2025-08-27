import { createColumn, updateColumn } from '@/apis/column'

let emptyState = {}
const column = {
  namespaced: true,
  state: () => ({
    currentColumn: null,
  }),
  mutations: {},
  getters: {},
  actions: {
    async createColumn({ dispatch, commit }, column) {
      try {
        const res = await createColumn(column)
        await dispatch('board/getDetail', res.data.boardId, { root: true })
      } catch (error) {
        throw error
      }
    },
    async updateColumn({ dispatch, commit }, payload) {
      try {
        const res = await updateColumn(payload.columnId, { title: payload.title })
        await dispatch('board/getDetail', res.data.boardId, { root: true })
      } catch (error) {
        throw error
      }
    },
  },
}
export default column
