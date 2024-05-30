import { Outlet } from 'react-router-dom'
import withUserAuth from '~/features/user/withUserAuth'

export const Component = withUserAuth(() => {
  return <Outlet></Outlet>
})

Component.displayName = 'Main'
