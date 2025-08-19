import { createBoard, listBoard } from '@/apis/board'
let emptyState = {}
const board = {
  namespaced: true,
  state: () => ({
    boards: [],
    currentBoard: null,
  }),
  mutations: {
    setBoards(state, boards) {
      state.boards = boards
    },
    setCurrentBoard(state, currentBoard) {
      state.currentBoard = currentBoard
    },
  },
  getters: {},
  actions: {
    async fetchBoard({ commit }) {
      try {
        const res = await listBoard()
        commit('setBoards', res.data.boards)
      } catch (error) {
        throw error
      }
    },
    async createBoard({ dispatch, commit }, board) {
      try {
        const res = await createBoard(board)
        await dispatch('fetchBoard')
        commit('setCurrentBoard', res.data)
      } catch (error) {
        throw error
      }
    },
  },
}
export default board
