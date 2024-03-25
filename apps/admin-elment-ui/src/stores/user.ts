import { defineStore } from 'pinia'

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
      visited: [],
    }
  },
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      // this.count++
    },
  },
})
