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
}
