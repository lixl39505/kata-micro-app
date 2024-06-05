import { Menu } from 'antd'
import { useMatches } from 'react-router-dom'
import { Handle } from '~/features/sitemap/sitemapSlice'
import useMainMenu from '~/features/sitemap/useMainMenu'

const SideMenu: React.FC = () => {
  const matches = useMatches()
  const [menus, matchMenus] = useMainMenu()

  let loc = matches[matches.length - 1]
  let defaultKeys = [(loc?.handle as Handle).id]
  let defaultOpens = matchMenus(defaultKeys[0]).map((v) => v.key)

  return (
    <Menu defaultSelectedKeys={defaultKeys} defaultOpenKeys={defaultOpens} mode="inline" theme="dark" items={menus} />
  )
}

export default SideMenu
