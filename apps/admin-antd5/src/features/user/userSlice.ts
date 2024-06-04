import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Path } from 'react-router-dom'
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
  // 最近访问的路由
  visited: Path[]
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    visited: [],
  } as UserState,
  reducers: {
    // 添加访问路由
    addVisitedRoute(state, action: PayloadAction<Path>) {
      _u.visitedAdd(state, action.payload)
    },
    // 更新 userInfo
    setUserInfo(state, action: PayloadAction<UserState['userInfo']>) {
      let info = action.payload
      state.userInfo = info
    },
  },
})

const _u = {
  visitedAdd(state: UserState, to: Path) {
    if (state.visited.findIndex((v) => v.pathname === to.pathname) < 0) {
      // matched 不可序列化，清空
      state.visited.push({ ...to })
    }
  },
}
export default userSlice.reducer
export const { addVisitedRoute, setUserInfo } = userSlice.actions
export const selectUserInfo = (state: AppState) => state.user.userInfo || null
export const selectVisited = (state: AppState) => state.user.visited
