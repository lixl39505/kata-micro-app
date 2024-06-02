import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import withUserAuth from '~/features/user/withUserAuth'
import useStyles from './MainView.style'
import { VisitedBar } from './VisitedBar'
import { SideMenu } from './SideMenu'

export const Component = withUserAuth(() => {
  const { styles } = useStyles()

  return (
    <Layout className={styles.main} hasSider>
      <Layout.Sider>aside</Layout.Sider>
      <Layout>
        <Layout.Header>
          header
          <SideMenu></SideMenu>
        </Layout.Header>
        <VisitedBar></VisitedBar>
        <Layout.Content className={styles.content}>
          <div style={{ background: 'red', height: '2000px' }}></div>
          <Outlet></Outlet>
        </Layout.Content>
      </Layout>
    </Layout>
  )
})

Component.displayName = 'Main'
