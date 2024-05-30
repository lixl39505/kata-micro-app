import { useSelector } from 'react-redux'
import { useCookie } from 'react-use'
import { useAppDispatch } from '~/store'
import { selectUserInfo, setUserInfo } from './userSlice'

// 用户登录检查
export function useUserAuth() {
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

// 登录
export function useUserLogin() {
  let dispatch = useAppDispatch(),
    [, setPassport] = useCookie('passport')

  async function login(username: string, password: string) {
    return await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          let userInfo = {
            id: '1',
            nickname: '',
            avatar: '',
            role: [],
          }
          dispatch(setUserInfo(userInfo))
          setPassport(JSON.stringify(userInfo))

          resolve()
        } catch (err) {
          reject(err)
        }
      }, 20)
    })
  }

  return login
}

// 登出
export function useUserLogout() {}
