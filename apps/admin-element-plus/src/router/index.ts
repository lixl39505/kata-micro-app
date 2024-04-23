import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

declare module 'vue-router' {
  interface RouteMeta {
    // 标题
    title?: string
    // 图标
    icon?: string
    // 是否保活
    keepAlive?: boolean
    // 需要登录验证
    auth?: boolean
  }
}

export { router }
