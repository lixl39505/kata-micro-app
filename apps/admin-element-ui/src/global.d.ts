export {}
declare global {
  // for https://github.com/yiminghe/async-validator/tree/1.8.5
  type AsyncRule = {
    type:
      | 'string'
      | 'number'
      | 'boolean'
      | 'method'
      | 'regexp'
      | 'integer'
      | 'float'
      | 'array'
      | 'object'
      | 'enum'
      | 'date'
      | 'url'
      | 'hex'
      | 'email'
      | 'any'
    required: boolean
    message: string
    pattern: RegExp
    range: {
      min: number
      max: number
    }
    length: number
    enum: Array<T>
    whitespace: boolean
    fields: Record<string, AsyncRule>
    options: {
      first: boolean
      suppressWarning: boolean
    }
  }
  type AsyncValidator<T, S> = (
    rule: AsyncRule,
    value: T,
    callback: (errors?: Error | Error[]) => void | boolean | Error | Error[],
    source?: S,
    options?: { messages: Record<string, string> },
  ) => void
  // 无界子应用全局变量
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean
    // 子应用公共加载路径
    __WUJIE_PUBLIC_PATH__: string
    // 原生的querySelector
    __WUJIE_RAW_DOCUMENT_QUERY_SELECTOR__: typeof Document.prototype.querySelector
    // 原生的querySelectorAll
    __WUJIE_RAW_DOCUMENT_QUERY_SELECTOR_ALL__: typeof Document.prototype.querySelectorAll
    // 原生的window对象
    __WUJIE_RAW_WINDOW__: Window
    // 子应用沙盒实例
    __WUJIE: WuJie
    // 子应用mount函数
    __WUJIE_MOUNT: () => void
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void
    // 注入对象
    $wujie: {
      bus: typeof bus
      shadowRoot?: ShadowRoot
      props?: { [key: string]: any }
      location?: Object
    }
  }
}
