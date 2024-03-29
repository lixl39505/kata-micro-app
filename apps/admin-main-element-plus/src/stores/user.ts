import { defineStore, type Pinia } from 'pinia'
import type { RouteLocationNormalized, Router } from 'vue-router'
// @ts-ignore
import type { RemovableRef } from '@vueuse/core'
import { useStorage } from '@vueuse/core'

const LOGIN_PAGE_NAME = 'login'

export interface MenuConfig {
  path: string
  meta: Record<string | number | symbol, any>
  children: MenuConfig[]
  name?: string | symbol | null
}

export const useUserStore = defineStore('user', {
  state: () => {
    const userInfo = useStorage('userInfo', {
      id: '', // 用户id
      nickname: '', // 昵称
      avatar: '', // 头像
      role: '', // 角色
      lang: 'zh', // 语言设置
    })
    const visited = useStorage('visited', [] as RouteLocationNormalized[], sessionStorage)

    return {
      userInfo,
      // 最近访问的路由
      visited,
    }
  },
  getters: {},
  actions: {
    // 添加访问路由
    addVisitedRoute(to: RouteLocationNormalized) {
      if (this.visited.findIndex((v) => v.fullPath === to.fullPath) < 0) {
        // matched 不可序列化，清空
        this.visited.push({ ...to, matched: [] })
      }
    },
    // 关闭目标路由
    close(target: RouteLocationNormalized) {
      let i = this.visited.findIndex((v) => v.fullPath === target.fullPath)

      this.visited.splice(i, 1)
      if (target.fullPath === this.router.currentRoute.value.fullPath) {
        i = Math.max(0, i - 1)
        if (this.visited.length > 0) this.router.replace(this.visited[i].fullPath)
        else this.backHome()
      }
    },
    // 关闭右侧路由
    closeRight(target: RouteLocationNormalized) {
      const current = this.router.currentRoute.value
      let n1 = this.visited.findIndex((v) => v.fullPath === target.fullPath)
      let n2 = this.visited.findIndex((v) => v.fullPath === current.fullPath)

      if (n1 >= 0) {
        this.visited.splice(n1 + 1, this.visited.length - n1 - 1)

        if (n2 > n1) this.router.replace(target.fullPath)
      }
    },
    // 关闭其它路由
    closeOther(target: RouteLocationNormalized) {
      const current = this.router.currentRoute.value
      let i = this.visited.findIndex((v) => v.fullPath === target.fullPath)

      if (i >= 0) {
        this.visited = [target]

        if (target.fullPath !== current.fullPath) this.router.replace(target.fullPath)
      }
    },
    // 关闭左侧路由
    closeLeft(target: RouteLocationNormalized) {
      const current = this.router.currentRoute.value
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
        let current = this.router.currentRoute.value
        // 特殊场景: visited为空，主页 -> 主页
        if (isHomeRoute(current)) {
          return this.addVisitedRoute(current)
        }
      }
      this.router.replace('/')
    },
    // 登录
    async login({ username, pwd }: { username: string; pwd: string }) {
      const userInfo = await Promise.resolve({
        id: '233',
        nickname: '瓮中捉鳖',
        avatar: '',
        role: 'admin',
        lang: 'zh',
      })
      Object.assign(this.userInfo, userInfo)
    },
    // 登出
    logout() {
      sessionStorage.clear()
      localStorage.clear()
      this.router.push({ name: LOGIN_PAGE_NAME }).then(() => {
        this.visited = []
      })
    },
  },
})

export function applyUserEffect({ pinia, router }: { pinia: Pinia; router: Router }) {
  // 登录验证
  router.beforeEach((to, from, next) => {
    const user = useUserStore(pinia)
    const refer = useStorage('refer', '')
    // 无需登录
    if (to.meta?.auth === false) return next()
    // 拒绝登录
    const denied = () => {
      // 移除凭证
      // setPassport(null)
      // 记录还原信息
      if (to.name !== LOGIN_PAGE_NAME) {
        refer.value = to.fullPath
      }
      // 要求登录
      next({
        name: LOGIN_PAGE_NAME,
      })
    }
    let passport = user.userInfo.id // 是否登录
    // 未登录
    if (!passport) denied()
    // 已登录、进入登录页
    else if (passport && to.name === LOGIN_PAGE_NAME) next('/')
    // 已登录、进入非登录页
    else {
      // [Optional] 获取用户权限...
      next()
    }
  })

  // visited 访问记录维护
  router.beforeEach((to, from, next) => {
    const user = useUserStore(pinia)

    if (to.matched.length > 1 && to.matched[0].name === 'main') {
      user.addVisitedRoute(to)
    }

    next()
  })
}
