/**
 * 触发分支条件穷举检查
 *
 * @export
 * @param {never} param
 * @return {*}  {never}
 */
export function exhaustiveCheck(param: never): never {
  throw new Error('should not reach here')
}
