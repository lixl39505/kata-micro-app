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
  getters: {
    // 根据 url 缓存 router-view
    aliveUrls: (state) => {
      return state.visited.filter((v) => v.meta?.keepAlive).map((v) => v.fullPath)
    },
  },
  actions: {
    // 登出
    logout() {
      this.id = this.nickname = this.avatar = this.role = ''
      this.visited = []
    },
  },
})

export function applyUserEffect({ pinia, router }: { pinia: Pinia; router: VueRouter }) {
  let cid = 1
  // visited 访问记录维护
  router.beforeEach((to, from, next) => {
    const user = useUserStore(pinia)

    if (to.matched[0].name === 'main') {
      // 是否缓存
      if (to.meta?.keepAlive) {
        // 附加缓存id，区分页面实例
        if (!to.query._c) {
          return next({
            path: to.path,
            query: {
              ...to.query,
              _c: 'p' + cid++,
            },
            params: to.params,
          })
        }
      }
      // 新增访问记录
      if (user.visited.findIndex((v) => v.fullPath === to.fullPath) < 0) {
        user.visited.push({ ...to })
      }
    }

    next()
  })
  // 登录验证 TODO
}
