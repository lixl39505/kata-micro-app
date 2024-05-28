import { StrictMode } from 'react'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

dayjs.locale('zh-cn')

const App = () => {
  return (
    <StrictMode>
      <ConfigProvider locale={zhCN}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </StrictMode>
  )
}

export default App
