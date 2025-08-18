import { createStore } from 'vuex'
import userModule from './modules/user'
import boardModule from './modules/board'

export const store = createStore({
  modules: {
    user: userModule,
    board: boardModule,
  },
})
