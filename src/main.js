import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/main.css'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



const app = createApp(App)
app.use(router);
app.use(ElementPlus)
app.mount('#app')
