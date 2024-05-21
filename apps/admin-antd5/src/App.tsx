import { StrictMode, useState } from 'react'
import { ConfigProvider, DatePicker, message } from 'antd'
import dayjs from 'dayjs'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

dayjs.locale('zh-cn')

const App = () => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null)
  const [messageApi, contextHolder] = message.useMessage()

  const handleChange = (value: dayjs.Dayjs) => {
    messageApi.info(`您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`)
    setDate(value)
  }
  return (
    <StrictMode>
      <ConfigProvider locale={zhCN}>
        <RouterProvider router={router} />
        {/* <div style={{ width: 400, margin: '100px auto' }}>
          <DatePicker onChange={handleChange} />
          <div style={{ marginTop: 16 }}>当前日期：{date ? date.format('YYYY年MM月DD日') : '未选择'}</div>
        </div> */}
        {contextHolder}
      </ConfigProvider>
    </StrictMode>
  )
}

export default App
