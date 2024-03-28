import { createApp } from 'vue'

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
app.mount('#app')
