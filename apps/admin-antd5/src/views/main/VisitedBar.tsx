import { useEffect, useRef, useState } from 'react'
import { NavigateOptions, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { SitePath, selectSitePathRecords } from '~/features/sitemap/sitemapSlice'
import { close, closeAll, closeLeft, closeOthers, closeRight, selectVisited } from '~/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '~/store'
import useStyles from './VisitedBar.style'
import useSitePath from '~/features/sitemap/useSitePath'
import AppIcon from '~/components/AppIcon'

const VisitedBar: React.FC = () => {
  const { styles, cx } = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const visited = useAppSelector(selectVisited)
  const sitePathRecords = useAppSelector(selectSitePathRecords)
  const sitePath = useSitePath()
  // 标签数据
  let items = visited.map((id) => sitePathRecords[id])
  // 返回首页
  const backHome = (opts?: NavigateOptions) => navigate('/', opts)
  // 点击标签
  const onItemClick = (item: SitePath) => {
    navigate(item.path!)
  }
  // 右键菜单打开/隐藏
  const onItemCtxOpenChg = (open: boolean) => {
    if (open) {
      setShowOverCard(false)
      overCard.current.disabled = true
    } else {
      overCard.current.disabled = false
    }
  }
  // 关闭标签
  const onItemClose = (item: SitePath, i: number) => {
    overTimer.current && clearTimeout(overTimer.current)
    overTimer.current = 0
    setShowOverCard(false)
    dispatch(close(item.id))

    if (item.id === sitePath.id) {
      if (i - 1 >= 0) navigate(items[i - 1].path!)
      else backHome()
    }
  }
  // 标签右键菜单
  const contextMenus: MenuProps['items'] = [
    { key: 'closeRight', label: '关闭右侧' },
    { key: 'closeOthers', label: '关闭其它' },
    { key: 'closeLeft', label: '关闭左侧' },
    { key: 'closeAll', label: '关闭所有' },
  ]
  // 点击标签右键菜单
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
  // 标签详情卡片
  const $bar = useRef<HTMLDivElement>(null)
  const overCard = useRef({
    top: 'auto',
    left: 'auto',
    right: 'auto',
    title: '',
    fullpath: '',
    disabled: false,
  })
  const overTimer = useRef(0)
  const [showOverCard, setShowOverCard] = useState(false)
  const [, updateOverCard] = useState({})
  const onItemLeave = () => {
    overTimer.current && clearTimeout(overTimer.current)
    overTimer.current = 0
  }
  const onItemEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: SitePath, index: number) => {
    let rect = $bar.current?.getBoundingClientRect() as DOMRect,
      itemWidth = (e.currentTarget as HTMLElement).offsetWidth,
      remain = rect.width - index * itemWidth,
      popWidth = 100 * 1.5

    // 右侧空间不足
    if (remain < popWidth) {
      overCard.current.left = 'auto'
      overCard.current.right = '4px'
    } else {
      overCard.current.left = rect.left + index * itemWidth + 6 + 'px'
      overCard.current.right = 'auto'
    }
    overCard.current.top = rect.top + rect.height + 6 + 'px'
    overCard.current.title = item.title || ''
    overCard.current.fullpath = item.path!

    // 延迟提示
    if (showOverCard === false && overCard.current.disabled === false) {
      overTimer.current = setTimeout(() => {
        setShowOverCard(true)
      }, 800)
    } else updateOverCard({})
  }
  const onBarLeave = () => {
    setShowOverCard(false)
  }
  // clean timer
  useEffect(() => () => {
    if (overTimer.current) clearTimeout(overTimer.current)
  })

  console.log(overCard)
  console.log(overTimer.current)

  return (
    <div ref={$bar} className={styles.container} onMouseLeave={onBarLeave}>
      {/* 标签列表 */}
      {items.map((v, i) => (
        <Dropdown
          key={v.id}
          menu={{ items: contextMenus, onClick: ({ key }) => onContextMenuClick(key, v.id, i) }}
          trigger={['contextMenu']}
          onOpenChange={onItemCtxOpenChg}
        >
          <div
            className={cx(styles.item, { active: v.id === sitePath.id })}
            onClick={() => onItemClick(v)}
            onMouseEnter={(e) => onItemEnter(e, v, i)}
            onMouseLeave={onItemLeave}
          >
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
      {/* 标签详情卡片 */}
      {createPortal(
        <div
          className={styles.overCard}
          style={{
            display: showOverCard ? 'block' : 'none',
            top: overCard.current.top,
            left: overCard.current.left,
            right: overCard.current.right,
          }}
        >
          <div className={styles.overCardTitle}>{overCard.current.title}</div>
          <div className={styles.overCardTitle}>{overCard.current.fullpath}</div>
        </div>,
        document.body,
      )}
    </div>
  )
}

export default VisitedBar
