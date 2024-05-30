import { useSelector } from 'react-redux'
import { useCookie } from 'react-use'
import { useAppDispatch } from '~/store'
import { selectUserInfo, setUserInfo } from './userSlice'

// 用户登录检查
export function useAuth() {
  let [passport] = useCookie('passport')

  // 未登录
  if (!passport) {
    return false
  }

  let userInfo = useSelector(selectUserInfo)
  let dispatch = useAppDispatch()
  // 还原用户信息
  if (!userInfo) {
    dispatch(setUserInfo(JSON.parse(passport)))
  }
  return true
}
