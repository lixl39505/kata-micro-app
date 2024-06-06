import { SitePath, selectSitePathRecords } from '~/features/sitemap/sitemapSlice'
import { close, selectVisited } from '~/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '~/store'
import useStyles from './VisitedBar.style'
import useSitePath from '~/features/sitemap/useSitePath'
import AppIcon from '~/components/AppIcon'
import { useNavigate } from 'react-router-dom'

const VisitedBar: React.FC = () => {
  const { styles, cx } = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const visited = useAppSelector(selectVisited)
  const sitePathRecords = useAppSelector(selectSitePathRecords)
  const sitePath = useSitePath()

  let items = visited.map((id) => sitePathRecords[id])

  const backHome = () => navigate('/')
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

  return (
    <div className={styles.container}>
      {items.map((v, i) => (
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
      ))}
    </div>
  )
}

export default VisitedBar
