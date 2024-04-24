import Vue from 'vue'
import WujieVue from 'wujie-vue2'
import router from './router'
import pinia from './stores'
import App from './App.vue'
import { applyUserEffect } from './stores/user'
import type VueRouter from 'vue-router'
import 'virtual:svg-icons-register'

// global styles
import '~/styles/base.scss'
import 'element-ui/packages/theme-chalk/src/tooltip.scss'
import 'element-ui/packages/theme-chalk/src/popover.scss'

// element组件全局设置
Vue.prototype.$ELEMENT = { size: 'small' }

// Pinia 扩展
declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: VueRouter
  }
}
pinia.use(() => {
  return {
    router: markRaw(router),
  }
})

// 安装用户模块相关功能
applyUserEffect({ pinia, router })

// 微服务通信
Vue.use(WujieVue)
let name = 'v2'
window.$wujie?.bus.$on(`${name}:routeChange`, (path: string) => router.replace({ path }))

// App
new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount('#app')

// DevTest
if (import.meta.env.DEV) {
  Object.assign(window, { router, pinia })
}
