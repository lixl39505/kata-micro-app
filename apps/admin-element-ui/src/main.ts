import Vue from 'vue'
import router from './router'
import pinia from './stores'
import App from './App.vue'
import { applyUserEffect } from './stores/user'
import type VueRouter from 'vue-router'
import 'virtual:svg-icons-register'
// 全局组件样式
import 'element-ui/packages/theme-chalk/src/tooltip.scss'
import 'element-ui/packages/theme-chalk/src/popover.scss'

// element组件全局设置
Vue.prototype.$ELEMENT = { size: 'small' }

// 安装用户模块相关功能
applyUserEffect({ pinia, router })
// Pinia 扩展
pinia.use(() => {
  return {
    router: markRaw(router),
  }
})
declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: VueRouter
  }
}

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount('#app')

if (import.meta.env.DEV) {
  Object.assign(window, { router, pinia })
}
