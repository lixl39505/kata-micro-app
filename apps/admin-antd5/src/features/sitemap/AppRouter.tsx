import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { selectRoutes } from './sitemapSlice'
import { useAppSelector } from '~/store'

const AppRouter: React.FC = () => {
  const routes = useAppSelector(selectRoutes)
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default AppRouter
