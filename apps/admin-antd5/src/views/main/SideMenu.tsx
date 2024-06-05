import React, { useMemo, useState } from 'react'
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import type { MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems'
import { Link, UIMatch, matchPath, useLocation, useMatch, useMatches } from 'react-router-dom'
import { useAppSelector } from '~/store'
import {
  Handle,
  RouteInfo,
  selectAllRouteIds,
  selectAllRouteInfos,
  selectRouteInfoTree,
  selectRouteRecords,
} from '~/features/router/routerSlice'
import AppIcon from '~/components/AppIcon'

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

// 兼容 Antd 的 MenuItem
type MenuItem = { key: string; label?: string | React.JSX.Element; icon?: React.JSX.Element; children?: MenuItem[] }

const SideMenu: React.FC = () => {
  const routeInfoTree = useAppSelector(selectRouteInfoTree)
  const matches = useMatches()
  const menus = useMemo(() => {
    let items: MenuItem[] = [],
      underMain = false

    let walk = (cur: RouteInfo, parent?: MenuItem) => {
      let t: MenuItem,
        reset: (() => void) | null = null

      // 菜单需包含在 MainView 中
      if (underMain) {
        t = { key: cur.id }
        if (cur.path) t.label = <Link to={cur.path}>{cur.handle?.title ?? ''}</Link>
        else t.label = cur.handle?.title ?? ''

        if (cur.handle?.icon) t.icon = <AppIcon name={cur.handle?.icon ?? ''} />

        if (parent) {
          if (!parent.children) parent.children = []
          parent.children.push(t)
        } else items.push(t)
      }

      if (cur.id === 'MainView') {
        underMain = true
        reset = () => (underMain = false)
      }
      if (cur.children) cur.children.forEach((v) => walk(v, t))
      if (reset) reset()
    }

    routeInfoTree.forEach((v) => walk(v))

    return items
  }, [routeInfoTree])

  let loc = matches[matches.length - 1],
    defaultKeys = [(loc?.handle as Handle).id]

  return <Menu defaultSelectedKeys={defaultKeys} mode="inline" theme="dark" items={menus} />
}

export default SideMenu
