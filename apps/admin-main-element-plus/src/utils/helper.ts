import type { RouteLocationNormalized } from 'vue-router'

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
 * @param {RouteLocationNormalized} route
 * @return {*}  {boolean}
 */
export function isHomeRoute(route: RouteLocationNormalized): boolean {
  return route.path === '/index'
}
