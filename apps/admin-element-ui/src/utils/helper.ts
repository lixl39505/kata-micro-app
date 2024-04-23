import type { Route } from 'vue-router'

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

/**
 * 是否主页
 *
 * @export
 * @param {Route} route
 * @return {*}  {boolean}
 */
export function isHomeRoute(route: Route): boolean {
  return route.path === '/index'
}
