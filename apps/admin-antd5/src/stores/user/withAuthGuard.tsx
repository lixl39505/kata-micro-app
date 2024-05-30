// 登录验证路由组件
export function withAuthGuard<P extends JSX.IntrinsicAttributes>(Component: React.ComponentType<P>): React.FC<P> {
  return (props: P) => {
    //
    return <Component {...props} />
  }
}
