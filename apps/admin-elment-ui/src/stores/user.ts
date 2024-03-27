import { defineStore, type Pinia } from 'pinia'
import type { Route } from 'vue-router'
import type VueRouter from 'vue-router'
// @ts-ignore
import type { RemovableRef } from '@vueuse/core'
import { useStorage } from '@vueuse/core'

export interface MenuConfig {
  path: string
  meta: Record<string | number | symbol, any>
  children: MenuConfig[]
  name?: string
}

export const useUserStore = defineStore('user', {
  state: () => {
    const userInfo = useStorage('userInfo', {
      id: 'admin', // 用户id
      nickname: '一夫当关', // 昵称
      avatar: '', // 头像
      role: 'admin', // 角色
      lang: 'zh', // 语言设置
    })
    const visited = useStorage('visited', [] as Route[], sessionStorage)

    return {
      userInfo,
      // 最近访问的路由
      visited,
    }
  },
  getters: {},
  actions: {
    // 添加访问路由
    addVisitedRoute(to: Route) {
      if (this.visited.findIndex((v) => v.fullPath === to.fullPath) < 0) {
        // matched 不可序列化，清空
        this.visited.push({ ...to, matched: [] })
      }
    },
    // 关闭目标路由
    close(target: Route) {
      let i = this.visited.findIndex((v) => v.fullPath === target.fullPath)

      this.visited.splice(i, 1)
      if (target.fullPath === this.router.currentRoute.fullPath) {
        i = Math.max(0, i - 1)
        if (this.visited.length > 0) this.router.replace(this.visited[i].fullPath)
        else this.backHome()
      }
    },
    // 关闭右侧路由
    closeRight(target: Route) {
      const current = this.router.currentRoute
      let n1 = this.visited.findIndex((v) => v.fullPath === target.fullPath)
      let n2 = this.visited.findIndex((v) => v.fullPath === current.fullPath)

      if (n1 >= 0) {
        this.visited.splice(n1 + 1, this.visited.length - n1 - 1)

        if (n2 > n1 + 1) this.router.replace(target.fullPath)
      }
    },
    // 关闭其它路由
    closeOther(target: Route) {
      const current = this.router.currentRoute
      let i = this.visited.findIndex((v) => v.fullPath === target.fullPath)

      if (i >= 0) {
        this.visited = [target]

        if (target.fullPath !== current.fullPath) this.router.replace(target.fullPath)
      }
    },
    // 关闭左侧路由
    closeLeft(target: Route) {
      const current = this.router.currentRoute
      let n1 = this.visited.findIndex((v) => v.fullPath === target.fullPath)
      let n2 = this.visited.findIndex((v) => v.fullPath === current.fullPath)

      if (n1 >= 0) {
        this.visited.splice(0, n1)

        if (n2 < n1) this.router.replace(target.fullPath)
      }
    },
    // 关闭所有路由
    closeAll() {
      this.visited = []
      this.backHome()
    },
    // 回退到首页
    backHome() {
      if (this.visited.findIndex((v) => isHomeRoute(v)) < 0) {
        let current = this.router.currentRoute
        // 特殊场景: visited为空，主页 -> 主页
        if (isHomeRoute(current)) {
          return this.addVisitedRoute(current)
        }
      }
      this.router.replace('/')
    },
    // 登出
    logout() {
      sessionStorage.clear()
      localStorage.clear()
      this.visited = []
    },
  },
})

export function applyUserEffect({ pinia, router }: { pinia: Pinia; router: VueRouter }) {
  // visited 访问记录维护
  router.beforeEach((to, from, next) => {
    const user = useUserStore(pinia)

    if (to.matched.length > 1 && to.matched[0].name === 'main') {
      user.addVisitedRoute(to)
    }

    next()
  })
  // 登录验证 TODO
}
