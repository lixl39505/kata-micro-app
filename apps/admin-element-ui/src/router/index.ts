import Vue from 'vue'
import VueRouter, { type RawLocation, type RouterOptions } from 'vue-router'
import routes from './routes'

// 创建路由实例
export function createRouter(options: RouterOptions = {}) {
  var router = new VueRouter(options)

  return router
}
// 重建 routes (vue-router3 未提供动态删除 route 的方法)
export function resetRoutes(options: RouterOptions) {
  const newRouter = createRouter(options)

  ;(router as any).matcher = (newRouter as any).matcher
}

function proxyMethod<T extends (...args: any) => any>(method: string, fn: T) {
  return function (this: VueRouter, location: Parameters<T>[0]) {
    var result = fn.call(this, location)

    if (result && result.then) {
      // 自vue-router3.1之后navigation failure也会抛出Error
      // 实际开发不需要这个，在此吞掉异常
      // vue-router4.0 会修复这个问题
      result = result.catch((err: any) => {
        if (err && err._isRouter) {
          return
        }

        return Promise.reject(err)
      })
    }

    return result
  }
}

// mutate
VueRouter.prototype.push = proxyMethod('push', VueRouter.prototype.push)
VueRouter.prototype.replace = proxyMethod('replace', VueRouter.prototype.replace)
VueRouter.prototype.go = proxyMethod('go', VueRouter.prototype.go)

const router = createRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

Vue.use(VueRouter)

export default router
