import { Outlet, useNavigate } from 'react-router-dom'
// Andesign
import { ConfigProvider, App as AntdApp } from 'antd'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import light from './themes/light'
import { useEffect } from 'react'
// 默认中文
dayjs.locale('zh-cn')

// Root Layout
const App = () => {
  const navigate = useNavigate()

  // 微服务通信，保活模式下切换路由
  useEffect(() => {
    let name = 'rc18',
      cb = (path: string) => navigate(path)

    window.$wujie?.bus.$on(`${name}:routeChange`, cb)
    return () => window.$wujie?.bus.$off(`${name}:routeChange`, cb)
  })

  return (
    <ConfigProvider locale={zhCN} theme={light}>
      <AntdApp>
        <Outlet />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
