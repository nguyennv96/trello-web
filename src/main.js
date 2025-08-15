import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/store/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from '@/routers/index'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
