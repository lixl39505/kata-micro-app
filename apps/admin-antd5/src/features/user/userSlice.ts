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
    removeVisited(state, action: PayloadAction<string>) {
      let id = action.payload
      let i = state.visited.findIndex((v) => v === id)
      if (i >= 0) state.visited.splice(i, 1)
    },
    clearVisited(state) {
      state.visited = []
    },
  },
})

export default userSlice.reducer
export const { setUserInfo, addVisited, removeVisited, clearVisited } = userSlice.actions
export const selectUserInfo = (state: AppState) => state.user.userInfo || null
export const selectVisited = (state: AppState) => state.user.visited
