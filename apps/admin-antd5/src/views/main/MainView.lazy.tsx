import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Button, Flex, Layout } from 'antd'
// import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import withUserAuth from '~/features/user/withUserAuth'
import antdSvg from '~/assets/antd.svg'
import AppIcon from '~/components/AppIcon'
import useStyles from './MainView.style'
import VisitedBar from './VisitedBar'
import SideMenu from './SideMenu'
import SelectLang from './SelectLang'
import UserAction from './UserAction'
import Content from './Content'

export const Component = withUserAuth(() => {
  const { styles } = useStyles()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className={styles.main} hasSider>
      {/* 左侧导航 */}
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>
          <img src={antdSvg} width="28" height="28" style={{ verticalAlign: 'middle' }} />
          {collapsed === false && <span style={{ marginLeft: '10px' }}>Ant Design</span>}
        </div>
        <SideMenu></SideMenu>
      </Layout.Sider>
      <Layout>
        {/* 顶部导航 */}
        <Layout.Header>
          <Flex align="center">
            {/* 菜单折叠 */}
            <Button
              type="text"
              size="large"
              icon={collapsed ? <AppIcon name="MenuUnfoldOutlined" /> : <AppIcon name="MenuFoldOutlined" />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <Flex justify="flex-end" align="center" style={{ flex: 'auto' }}>
              {/* 全屏 */}
              <Button
                type="text"
                size="large"
                icon={<AppIcon name="fullscreen" />}
                onClick={() => navigate('/login')}
              />
              {/* 多语言切换 */}
              <SelectLang />
              {/* 当前用户 */}
              <UserAction />
            </Flex>
          </Flex>
        </Layout.Header>
        {/* 历史标签 */}
        <VisitedBar></VisitedBar>
        {/* 内容 */}
        <Layout.Content className={styles.content}>
          <Content></Content>
        </Layout.Content>
      </Layout>
    </Layout>
  )
})

Component.displayName = 'Main'
