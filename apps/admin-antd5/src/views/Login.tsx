import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserLogin } from '~/features/user/userUse'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

export function Component() {
  const login = useUserLogin()
  const navigate = useNavigate()
  const location = useLocation()

  const onFinish = useCallback<Exclude<FormProps<FieldType>['onFinish'], undefined>>(async (values) => {
    console.log('Success:', values)
    await login(values.username!, values.password!)

    let to: string = location.state?.from?.pathname ?? '/'
    navigate(to)
  }, [])
  const onFinishFailed = useCallback<Exclude<FormProps<FieldType>['onFinishFailed'], undefined>>((errorInfo) => {
    console.log('Failed:', errorInfo)
  }, [])

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ width: 600, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="Username" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input />
      </Form.Item>
      <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

Component.displayName = 'Login'
