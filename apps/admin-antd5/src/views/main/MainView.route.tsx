import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Button, Flex, Layout } from 'antd'
// import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import withUserAuth from '~/features/user/withUserAuth'
import useStyles from './MainView.style'
import { VisitedBar } from './VisitedBar'
import SideMenu from './SideMenu'
import antdSvg from '~/assets/antd.svg'
import AppIcon from '~/components/AppIcon'

export const Component = withUserAuth(() => {
  const { styles } = useStyles()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className={styles.main} hasSider>
      {/* 左侧导航 */}
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>
          <img src={antdSvg} width="28" height="28" style={{ verticalAlign: 'middle', marginRight: '10px' }} />
          {collapsed === false && 'Ant Design'}
        </div>
        <SideMenu></SideMenu>
      </Layout.Sider>
      <Layout>
        {/* 顶部导航 */}
        <Layout.Header>
          <Flex>
            <Button
              className={styles.iconLarge}
              type="text"
              icon={collapsed ? <AppIcon name="MenuUnfoldOutlined" /> : <AppIcon name="MenuFoldOutlined" />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <Flex justify="flex-end" style={{ flex: 'auto' }}>
              <Button
                className={styles.iconLarge}
                type="text"
                icon={collapsed ? <AppIcon name="MenuUnfoldOutlined" /> : <AppIcon name="MenuFoldOutlined" />}
                onClick={() => navigate('/login')}
              />
            </Flex>
          </Flex>
        </Layout.Header>
        {/* 历史标签 */}
        <VisitedBar></VisitedBar>
        {/* 内容 */}
        <Layout.Content className={styles.content}>
          <div style={{ background: 'red', height: '2000px' }}></div>
          <Outlet></Outlet>
        </Layout.Content>
      </Layout>
    </Layout>
  )
})

Component.displayName = 'Main'
