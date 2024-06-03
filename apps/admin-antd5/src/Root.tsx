import { StrictMode } from 'react'
// Router
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
// Andesign
import { ConfigProvider, App } from 'antd'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import light from './themes/light'

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
dayjs.locale('zh-cn')

const Root = () => {
  return (
    <StrictMode>
      <ConfigProvider locale={zhCN} theme={light}>
        <ReduxProvider store={store}>
          <App>
            <RouterProvider router={router} />
          </App>
        </ReduxProvider>
      </ConfigProvider>
    </StrictMode>
  )
}

// DevTest
if (import.meta.env.DEV) {
  Object.assign(window, { store })
}

export default Root
