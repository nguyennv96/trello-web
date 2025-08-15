import { getItem, removeItem, setItem } from '@/utils/local-storage'

let initState = getItem('user')
let emptyState = {
  _id: '',
  email: '',
  username: '',
  displayName: '',
  avatar: '',
  role: '',
  isActive: false,
  createdAt: null,
  updatedAt: null,
}
const user = {
  namespaced: true,
  state: () => ({
    user: {
      _id: initState ? initState._id : '',
      email: initState ? initState.email : '',
      username: initState ? initState.username : '',
      displayName: initState ? initState.displayName : '',
      avatar: initState ? initState.avatar : '',
      role: initState ? initState.role : '',
      isActive: initState ? initState.isActive : false,
      createdAt: initState ? initState.createdAt : null,
      updatedAt: initState ? initState.updatedAt : null,
    },
  }),
  mutations: {
    remove(state) {
      state.user = emptyState
      removeItem('user')
    },
    set(state, newUser) {
      state.user = newUser
      setItem('user', newUser)
    },
  },
  getters: {
    isAuth(state) {
      return !!state.user._id || !!state.user.email
    },
  },
}
export default user
// "_id": "688cfce1707c183216fd7f86",
// "email": "nguyen.haui.bb96@gmail.com",
// "username": "nguyen.haui.bb96",
// "displayName": "nguyen.haui.bb96",
// "avatar": "https://res.cloudinary.com/nguyennv96-trello/image/upload/v1754843588/users/haaisyfavkjxljjttwnq.jpg",
// "role": "client",
// "isActive": true,
// "createdAt": 1754070241993,
// "updatedAt": null
