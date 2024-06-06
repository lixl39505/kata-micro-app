import { useMatches } from 'react-router-dom'
import { selectSitePathRecords } from '~/features/sitemap/sitemapSlice'
import { selectVisited } from '~/features/user/userSlice'
import { useAppSelector } from '~/store'
import useStyles from './VisitedBar.style'
import useSitePath from '~/features/sitemap/useSitePath'
import AppIcon from '~/components/AppIcon'

const VisitedBar: React.FC = () => {
  const { styles, cx } = useStyles()
  const visited = useAppSelector(selectVisited)
  const sitePathRecords = useAppSelector(selectSitePathRecords)
  const sitePath = useSitePath()

  let items = visited.map((id) => sitePathRecords[id])

  return (
    <div className={styles.container}>
      {items.map((v) => (
        <div className={cx(styles.item, { active: v.id === sitePath.id })} key={v.id}>
          <span className={styles.itemTitle}>{v.title}</span>
          <AppIcon className={styles.close} name="CloseCircleOutlined"></AppIcon>
        </div>
      ))}
    </div>
  )
}

export default VisitedBar
