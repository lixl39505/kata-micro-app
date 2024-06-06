import { createStyles } from 'antd-style'

const useStyles = createStyles(({ token, css }) => {
  let itemWidth = 100
  let lineHeight = 32

  return {
    container: css`
      position: relative;
      background-color: #fff;
      padding: 0 12px;
      display: flex;
      flex-wrap: nowrap;
      line-height: ${lineHeight}px;
      border-top: 1px solid ${token.colorBorder};
      border-bottom: 1px solid ${token.colorBorder};
      font-size: 12px;
    `,
    item: css`
      display: flex;
      flex: 0 1 ${itemWidth}px;
      align-items: center;
      box-sizing: border-box;
      min-width: ${24 + 1}px;
      border-right: 1px solid ${token.colorBorder};
      fill: ${token.colorText};
      cursor: pointer;
      &:hover {
        color: ${token.colorPrimaryHover};
      }
      &.active {
        color: #fff;
        background: ${token.colorPrimary};
      }
    `,
    itemTitle: css`
      flex: 1 1 0;
      text-indent: 6px;
      white-space: nowrap;
      overflow: hidden;
    `,
    close: css`
      flex: 0 0 24px;
      font-size: 12px;
      justify-content: center;
      &:hover {
        transform: scale(1.2);
      }
    `,
  }
})

export default useStyles
