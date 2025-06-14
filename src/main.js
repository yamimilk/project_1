import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
// import { testVDOM } from './VNode_diff/test-vdom'

const app = createApp(App)
app.use(createPinia())
app.use(router);
app.use(ElementPlus)
app.mount('#app')

// testVDOM()
