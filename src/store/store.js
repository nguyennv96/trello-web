import { createStore } from 'vuex'
import userModule from './modules/user'

export const store = createStore({
  modules: {
    user: userModule,
  },
})
