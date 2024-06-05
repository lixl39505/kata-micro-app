import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '~/store'

const initialState = {
  langs: [
    { id: 'zh', text: '中文' },
    { id: 'en', text: 'English' },
  ],
  userActions: [
    { id: 'profile', text: '修改资料' },
    { id: 'pwd', text: '修改密码' },
    { id: 'exit', text: '退出', divided: true },
  ] as Array<{ id: string; text: string; divided?: boolean }>,
}

export type SystemState = typeof initialState

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    //
  },
})

export default systemSlice.reducer
export const {} = systemSlice.actions
export const selectLangs = (state: AppState) => state.system.langs
export const selectUserActions = (state: AppState) => state.system.userActions
