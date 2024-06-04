import { Outlet } from 'react-router-dom'
// Andesign
import { ConfigProvider, App as AntdApp } from 'antd'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import light from './themes/light'
// 默认中文
dayjs.locale('zh-cn')
// Root Layout
const App = () => {
  return (
    <ConfigProvider locale={zhCN} theme={light}>
      <AntdApp>
        <Outlet />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
