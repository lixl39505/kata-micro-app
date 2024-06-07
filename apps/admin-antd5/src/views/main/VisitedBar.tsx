import { SitePath, selectSitePathRecords } from '~/features/sitemap/sitemapSlice'
import { close, closeAll, closeLeft, closeOthers, closeRight, selectVisited } from '~/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '~/store'
import useStyles from './VisitedBar.style'
import useSitePath from '~/features/sitemap/useSitePath'
import AppIcon from '~/components/AppIcon'
import { NavigateOptions, useNavigate } from 'react-router-dom'
import { Dropdown } from 'antd'
import { MenuProps } from 'antd/lib'

const VisitedBar: React.FC = () => {
  const { styles, cx } = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const visited = useAppSelector(selectVisited)
  const sitePathRecords = useAppSelector(selectSitePathRecords)
  const sitePath = useSitePath()

  let items = visited.map((id) => sitePathRecords[id])

  const backHome = (opts?: NavigateOptions) => navigate('/', opts)
  const onItemClick = (item: SitePath) => {
    navigate(item.path!)
  }
  const onItemClose = (item: SitePath, i: number) => {
    // overTimer && clearTimeout(overTimer)
    // overTimer = 0
    // overCard.show = false

    dispatch(close(item.id))

    if (item.id === sitePath.id) {
      if (i - 1 >= 0) navigate(items[i - 1].path!)
      else backHome()
    }
  }

  const contextMenus: MenuProps['items'] = [
    { key: 'closeRight', label: '关闭右侧' },
    { key: 'closeOthers', label: '关闭其它' },
    { key: 'closeLeft', label: '关闭左侧' },
    { key: 'closeAll', label: '关闭所有' },
  ]
  const onContextMenuClick = (action: string, id: string, n1: number) => {
    let target = sitePathRecords[id],
      n2 = visited.findIndex((id) => id === sitePath.id) // 当前标签位置

    if (action === 'closeRight') {
      dispatch(closeRight(id))
      if (n2 > n1) navigate(target.path!, { replace: true })
    }
    if (action === 'closeOthers') {
      dispatch(closeOthers(id))
      if (id !== sitePath.id) navigate(target.path!, { replace: true })
    }
    if (action === 'closeLeft') {
      dispatch(closeLeft(id))
      if (n2 < n1) navigate(target.path!, { replace: true })
    }
    if (action === 'closeAll') {
      dispatch(closeAll())
      backHome({ replace: true })
    }
  }

  return (
    <div className={styles.container}>
      {items.map((v, i) => (
        <Dropdown
          menu={{ items: contextMenus, onClick: ({ key }) => onContextMenuClick(key, v.id, i) }}
          trigger={['contextMenu']}
        >
          <div className={cx(styles.item, { active: v.id === sitePath.id })} key={v.id} onClick={() => onItemClick(v)}>
            <span className={styles.itemTitle}>{v.title}</span>
            <AppIcon
              className={styles.close}
              name="CloseCircleOutlined"
              onClick={(e) => {
                e.stopPropagation()
                onItemClose(v, i)
              }}
            ></AppIcon>
          </div>
        </Dropdown>
      ))}
    </div>
  )
}

export default VisitedBar
