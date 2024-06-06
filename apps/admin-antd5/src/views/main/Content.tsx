import { useEffect } from 'react'
import { Outlet, useMatches } from 'react-router-dom'
import { Handle } from '~/features/sitemap/sitemapSlice'
import { addVisited } from '~/features/user/userSlice'
import { useAppDispatch } from '~/store'

const Content: React.FC = () => {
  const matched = useMatches()
  const dispatch = useAppDispatch()

  let currentRoute = matched[matched.length - 1]
  let id = (currentRoute.handle as Handle).id

  // 记录访问路由
  useEffect(() => {
    dispatch(addVisited(id))
  }, [id])

  return <Outlet></Outlet>
}

export default Content
