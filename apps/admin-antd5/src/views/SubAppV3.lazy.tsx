import { useLocation } from 'react-router-dom'
import Wujie from 'wujie-react'

const { bus } = Wujie

export function Component() {
  const loc = useLocation()

  let name = 'v3' // 子应用名称
  let path = loc.pathname.replace(`${name}/`, '')
  let url = `${import.meta.env.VITE_V3_URL}${path}`

  bus.$emit(`${name}:routeChange`, path)

  return <Wujie width="100%" height="100%" name={name} url={url} alive></Wujie>
}

Component.displayName = 'SubAppV3'
