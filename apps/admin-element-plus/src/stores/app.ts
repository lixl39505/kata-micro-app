import { defineStore } from 'pinia'

export type Cmd<T extends Array<{ id: string }>> = {
  id: T[number]['id']
  text: string
  divided?: boolean
}

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      langs: [
        { id: 'zh' as const, text: '中文' },
        { id: 'en' as const, text: 'English' },
      ],
      userActions: [
        { id: 'profile' as const, text: '修改资料' },
        { id: 'pwd' as const, text: '修改密码' },
        { id: 'exit' as const, text: '退出', divided: true },
      ],
    }
  },
})
