import { Navigate, useLocation } from 'react-router-dom'
import { useUserAuth } from './userUse'

export default function withUserAuth<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
): React.FC<P> {
  return (props: P) => {
    let isAuth = useUserAuth()
    let location = useLocation()

    if (isAuth) return <Component {...props} />
    else {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
  }
}
