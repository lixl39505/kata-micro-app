import Icon, {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  DownOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import type { IconBaseProps } from '@ant-design/icons/lib/components/Icon'
import { GetProps } from 'antd'

let antDesignIcons: Record<string, typeof Icon | undefined> = {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  DownOutlined,
  CloseCircleOutlined,
}
let localIcons = import.meta.glob<GetProps<typeof Icon>['component']>('~/assets/icons/*.svg', {
  import: 'default',
  eager: true,
  query: '?react',
})

localIcons = Object.keys(localIcons).reduce(
  (acc, path) => {
    acc[path.split('/').slice(-1)[0].replace('.svg', '')] = localIcons[path]
    return acc
  },
  {} as typeof localIcons,
)

const AppIcon: React.FC<{ name: string; size?: number } & IconBaseProps> = ({ name, size, ...props }) => {
  let A = antDesignIcons[name],
    iconProps = { ...props }

  if (size) {
    if (iconProps.style) iconProps.style.fontSize = size + 'px'
    else iconProps.style = { fontSize: size + 'px' }
  }

  if (A) return <A {...iconProps}></A>

  let B = localIcons[name]
  if (B) return <Icon component={B} {...iconProps}></Icon>

  return <span style={{ color: 'red' }}>noIcon {`<${name}>`}</span>
}

export default AppIcon
