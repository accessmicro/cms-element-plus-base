import '@/assets/styles/main.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { setupStore } from './stores'

const app = createApp(App)

setupStore(app)

app.use(ElementPlus, {})
app.use(router)
app.use(i18n)

app.mount('#app')
