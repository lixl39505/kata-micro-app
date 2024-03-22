// 按需导入 view-design 组件
export const ViewDesignResolver = () => {
  return (comName: string) => {
    return {
      name: comName,
      from: '',
    }
  }
}
