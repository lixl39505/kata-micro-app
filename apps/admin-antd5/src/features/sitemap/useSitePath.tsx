import { useMatches } from 'react-router-dom'
import { useAppSelector } from '~/store'
import { Handle, selectSitePathRecords } from './sitemapSlice'

// 获取当前SitePath
export default function useSitePath() {
  const matches = useMatches()
  const records = useAppSelector(selectSitePathRecords)

  let id = (matches[matches.length - 1].handle as Handle).id

  return records[id]
}
