import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '~/store'

// import { client } from '../../api/client'
export interface UserState {
  // 用户信息
  userInfo?: {
    id: string
    nickname: string
    avatar: string
    role: string[]
  }
  // 最近访问的路由id
  visited: string[]
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    visited: [],
  } as UserState,
  reducers: {
    // 更新 userInfo
    setUserInfo(state, action: PayloadAction<UserState['userInfo']>) {
      let info = action.payload
      state.userInfo = info
    },
    addVisited(state, action: PayloadAction<string>) {
      let id = action.payload
      let i = state.visited.findIndex((v) => v === id)
      if (i < 0) state.visited.push(action.payload)
    },
    // 关闭标签页
    close(state, action: PayloadAction<string>) {
      let id = action.payload
      let i = state.visited.findIndex((v) => v === id)
      if (i >= 0) {
        // 特殊场景，只剩1个首页时，阻止关闭
        if (state.visited.length === 1 && state.visited[0] === 'home') return
        state.visited.splice(i, 1)
      }
    },
    // 关闭右侧标签
    closeRight(state, action: PayloadAction<string>) {
      let id = action.payload
      let i = state.visited.findIndex((v) => v === id)

      if (i >= 0) {
        state.visited.splice(i + 1, state.visited.length - i - 1)
      }
    },
    // 关闭其它标签
    closeOthers(state, action: PayloadAction<string>) {
      let id = action.payload
      let i = state.visited.findIndex((v) => v === id)

      if (i >= 0) {
        state.visited = [id]
      }
    },
    // 关闭左侧标签
    closeLeft(state, action: PayloadAction<string>) {
      let id = action.payload
      let i = state.visited.findIndex((v) => v === id)

      if (i >= 0) {
        state.visited.splice(0, i)
      }
    },
    // 关闭所有标签(首页除外)
    closeAll(state) {
      state.visited = ['home']
    },
  },
})

export default userSlice.reducer
export const { setUserInfo, addVisited, close, closeRight, closeOthers, closeLeft, closeAll } = userSlice.actions
export const selectUserInfo = (state: AppState) => state.user.userInfo || null
export const selectVisited = (state: AppState) => state.user.visited
