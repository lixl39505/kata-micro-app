import { createApp } from 'vue'
import WujieVue from 'wujie-vue3'
import { router } from './router'
import { pinia, injectRouter } from './stores'
import App from './App.vue'
import { applyUserEffect } from './stores/user'

import '~/styles/index.scss'
import 'uno.css'
// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'

const app = createApp(App)

injectRouter(router)
applyUserEffect({ pinia, router })

app.use(router)
app.use(pinia)
app.use(WujieVue)
app.mount('#app')

// 微服务通信
let name = 'v3'
window.$wujie?.bus.$on(`${name}:routeChange`, (path: string) => router.replace({ path }))

// DevTest
if (import.meta.env.DEV) {
  Object.assign(window, { router, pinia })
}
