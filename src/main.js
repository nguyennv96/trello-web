import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/store/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from '@/routers/index'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
