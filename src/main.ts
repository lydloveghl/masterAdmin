import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/reset.scss'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './permission'
import '@/assets/icon/iconfont.css'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
