import { createApp } from 'vue'
// 导入路由
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
