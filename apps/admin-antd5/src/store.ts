import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import userReducer from '~/features/user/userSlice'
import sitemapSlice from '~/features/sitemap/sitemapSlice'
import systemSlice from '~/features/system/systemSlice'

const rootReducer = combineReducers({ user: userReducer, sitemap: sitemapSlice, system: systemSlice })

export const store = configureStore({
  reducer: rootReducer,
})

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
//
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
