import { Avatar, Dropdown, MenuProps, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import AppIcon from '~/components/AppIcon'
import { selectUserActions } from '~/features/system/systemSlice'
import { useUserLogout } from '~/features/user/userUse'
import { useAppSelector } from '~/store'

const UserAction: React.FC = () => {
  const navigate = useNavigate()
  const logout = useUserLogout()
  const userActions = useAppSelector(selectUserActions)
  const items = userActions.reduce<NonNullable<MenuProps['items']>>((acc, v) => {
    if (v.divided) {
      acc.push({
        type: 'divider',
      })
    }
    acc.push({
      key: v.id,
      label: v.text,
    })
    return acc
  }, [])
  const onClick: MenuProps['onClick'] = ({ key }) => {
    // 退出
    if (key === 'exit') {
      logout()
      navigate('/login')
    }
  }
  return (
    <Dropdown menu={{ items, onClick }}>
      <Space style={{ marginRight: '16px' }}>
        <Avatar size={24} icon={<AppIcon name="noimg" />} />
        <AppIcon name="DownOutlined" size={10} />
      </Space>
    </Dropdown>
  )
}

export default UserAction
