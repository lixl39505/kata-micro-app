import { Dropdown, MenuProps, Space } from 'antd'
import { useState } from 'react'
import AppIcon from '~/components/AppIcon'
import { selectLangs } from '~/features/system/systemSlice'
import { useAppSelector } from '~/store'

const SelectLang: React.FC = () => {
  const langs = useAppSelector(selectLangs)
  const items: MenuProps['items'] = langs.map((v) => ({
    key: v.id,
    label: v.text,
  }))
  const [currentKey, setCurrentKey] = useState(langs[0].id)
  const onClick: MenuProps['onClick'] = ({ key }) => {
    setCurrentKey(key)
  }
  let currentLabel = langs.find((v) => v.id === currentKey)?.text

  return (
    <Dropdown menu={{ items, onClick }}>
      <Space size={2} style={{ marginRight: '16px' }}>
        <AppIcon name="lang" size={18} style={{ verticalAlign: '-3px' }} />
        <span>{currentLabel}</span>
      </Space>
    </Dropdown>
  )
}

export default SelectLang
