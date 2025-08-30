import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/store/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from '@/routers/index'
import VueDnDKitPlugin from '@vue-dnd-kit/core'
import { io } from 'socket.io-client'

const socket = io('http://localhost:8017')
const app = createApp(App).use(store).use(router).use(ElementPlus).use(VueDnDKitPlugin)
app.config.globalProperties.$socket = socket
app.mount('#app')
