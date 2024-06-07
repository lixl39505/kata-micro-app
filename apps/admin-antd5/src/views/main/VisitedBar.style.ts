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
    overCard: css`
      position: fixed;
      box-sizing: border-box;
      font-size: 12px;
      padding: 6px 16px;
      line-height: 24px;
      background-color: #fff;
      width: ${itemWidth * 1.5};
      border: 1px solid ${token.colorBorder};
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    `,
    overCardTitle: css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
  }
})

export default useStyles
