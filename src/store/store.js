import { createStore } from 'vuex'
import userModule from './modules/user'
import boardModule from './modules/board'
import cardModule from './modules/card'
import columnModule from './modules/column'

export const store = createStore({
  modules: {
    user: userModule,
    board: boardModule,
    card: cardModule,
    column: columnModule,
  },
})
