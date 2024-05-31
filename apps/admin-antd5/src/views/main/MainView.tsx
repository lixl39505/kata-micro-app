import { Outlet } from 'react-router-dom'
import withUserAuth from '~/features/user/withUserAuth'
import useStyles from './MainView.style'

export const Component = withUserAuth(() => {
  const { styles, cx } = useStyles()

  return (
    <div className={styles.container}>
      <Outlet></Outlet>
    </div>
  )
})

Component.displayName = 'Main'
