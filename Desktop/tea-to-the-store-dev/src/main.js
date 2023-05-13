import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import globalComponent from "@/components/index"
import '@/assets/vant'
import persistedState from 'pinia-plugin-persistedstate'
const pinia =createPinia()
pinia.use(persistedState)


const app = createApp(App)
globalComponent(app)

app.use(pinia)
app.use(router)

app.mount('#app')
