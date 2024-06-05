import React, { useMemo, useState } from 'react'
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import type { MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems'
import { Link, UIMatch, matchPath, useLocation, useMatch, useMatches } from 'react-router-dom'
import { useAppSelector } from '~/store'
import {
  Handle,
  SitePath,
  selectAllSitePathIds,
  selectAllSitePaths,
  selectSitePathTree,
  selectSitePathRecords,
} from '~/features/sitemap/sitemapSlice'
import AppIcon from '~/components/AppIcon'
import useMainMenu from '~/features/sitemap/useMainMenu'

// type MenuItem = Required<MenuProps>['items'][number]

// const items: MenuItem[] = [
//   { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
//   { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
//   { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
//   {
//     key: 'sub1',
//     label: 'Navigation One',
//     icon: <MailOutlined />,
//     children: [
//       { key: '5', label: 'Option 5' },
//       { key: '6', label: 'Option 6' },
//       { key: '7', label: 'Option 7' },
//       { key: '8', label: 'Option 8' },
//     ],
//   },
//   {
//     key: 'sub2',
//     label: 'Navigation Two',
//     icon: <AppstoreOutlined />,
//     children: [
//       { key: '9', label: 'Option 9' },
//       { key: '10', label: 'Option 10' },
//       {
//         key: 'sub3',
//         label: 'Submenu',
//         children: [
//           { key: '11', label: 'Option 11' },
//           { key: '12', label: 'Option 12' },
//         ],
//       },
//     ],
//   },
// ]

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
