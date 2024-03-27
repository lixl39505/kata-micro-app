import { defineStore, type Pinia } from 'pinia'
import type { Route } from 'vue-router'
import type VueRouter from 'vue-router'

export interface MenuConfig {
  path: string
  meta: Record<string | number | symbol, any>
  children: MenuConfig[]
  name?: string
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // 用户id
      id: 'admin',
      // 昵称
      nickname: '一夫当关',
      // 头像
      avatar: '',
      // 角色
      role: 'admin',
      // 语言设置
      lang: 'zh',
      // 最近访问
      visited: [] as Route[],
    }
  },
  getters: {},
  actions: {
    // 登出
    logout() {
      this.id = this.nickname = this.avatar = this.role = ''
      this.visited = []
    },
  },
})

export function applyUserEffect({ pinia, router }: { pinia: Pinia; router: VueRouter }) {
  // visited 访问记录维护
  router.beforeEach((to, from, next) => {
    const user = useUserStore(pinia)

    if (to.matched.length > 1 && to.matched[0].name === 'main') {
      if (user.visited.findIndex((v) => v.fullPath === to.fullPath) < 0) {
        user.visited.push({ ...to })
      }
    }

    next()
  })
  // 登录验证 TODO
}
