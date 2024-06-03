import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => ({
  main: {
    height: '100%',
  },
  logo: css`
    line-height: 48px;
    padding: 0 16px;
    color: #ededed;
    font-size: 16px;
  `,
  iconLarge: {
    fontSize: '16px',
    width: 48,
    height: 48,
  },
  content: css`
    padding: 16px;
  `,
}))
