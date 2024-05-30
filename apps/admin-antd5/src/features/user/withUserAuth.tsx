import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './userUse'

export default function withUserAuth<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
): React.FC<P> {
  return (props: P) => {
    let isAuth = useAuth()
    let location = useLocation()

    if (isAuth) return <Component {...props} />
    else {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
  }
}
