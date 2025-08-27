import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/store/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from '@/routers/index'
import VueDnDKitPlugin from '@vue-dnd-kit/core'

createApp(App).use(store).use(router).use(ElementPlus).use(VueDnDKitPlugin).mount('#app')
