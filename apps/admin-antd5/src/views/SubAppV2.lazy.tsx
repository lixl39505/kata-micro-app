import { useLocation } from 'react-router-dom'
import { bus } from 'wujie'
import ReactWujie from '~/components/ReactWujie'

export function Component() {
  const loc = useLocation()
  let name = 'v2' // 子应用名称
  let path = loc.pathname.replace(`${name}/`, '')
  let url = `${import.meta.env.VITE_V2_URL}${path}`

  bus.$emit(`${name}:routeChange`, path)

  return <ReactWujie width="100%" height="100%" name={name} url={url} alive></ReactWujie>
}

Component.displayName = 'SubAppV2'
