import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '~/store'
import { SitePath, selectSitePathTree } from './sitemapSlice'
import AppIcon from '~/components/AppIcon'

// 兼容 Antd 的 MenuItem
type AppMenuItem = {
  key: string
  parentkey: string
  label?: string | React.JSX.Element
  icon?: React.JSX.Element
  children?: AppMenuItem[]
}
// 获取主菜单
export default function useMainMenu() {
  const sitePathTree = useAppSelector(selectSitePathTree)
  const menuMap: Record<string, AppMenuItem> = {}
  // 菜单配置项
  const menus = useMemo(() => {
    let items: AppMenuItem[] = [],
      underMain = false

    let walk = (cur: SitePath, parent?: AppMenuItem) => {
      let t: AppMenuItem,
        reset: (() => void) | null = null

      // 菜单需包含在 MainView 中
      if (underMain) {
        t = { key: cur.id, parentkey: '' }
        // 内容
        if (cur.path) t.label = <Link to={cur.path}>{cur.title ?? ''}</Link>
        else t.label = cur.title ?? ''
        // 图标
        if (cur.icon) t.icon = <AppIcon name={cur.icon ?? ''} />
        // 嵌套关系
        menuMap[t.key] = t
        if (parent) {
          if (!parent.children) parent.children = []
          parent.children.push(t)
          t.parentkey = parent.key
        } else items.push(t)
      }

      if (cur.tagName === 'MainView') {
        underMain = true
        reset = () => (underMain = false)
      }
      if (cur.children) cur.children.forEach((v) => walk(v, t))
      if (reset) reset()
    }

    sitePathTree.forEach((v) => walk(v))

    return items
  }, [sitePathTree])
  // 匹配完整路径菜单
  const matchMenus = useCallback(
    (key: string) => {
      let result: Array<AppMenuItem> = [],
        item: AppMenuItem = menuMap[key]

      while (item) {
        result.unshift(item)
        item = menuMap[item.parentkey]
      }

      return result
    },
    [sitePathTree],
  )

  return [menus, matchMenus] as const
}
