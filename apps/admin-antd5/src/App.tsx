import { StrictMode } from 'react'
// Router
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './stores/index'
// Andesign
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
dayjs.locale('zh-cn')

const App = () => {
  return (
    <StrictMode>
      <ConfigProvider locale={zhCN}>
        <ReduxProvider store={store}>
          <RouterProvider router={router} />
        </ReduxProvider>
      </ConfigProvider>
    </StrictMode>
  )
}

// DevTest
if (import.meta.env.DEV) {
  Object.assign(window, { store })
}

export default App
