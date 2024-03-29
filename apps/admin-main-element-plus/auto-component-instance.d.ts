import type { GlobalComponents } from '@vue/runtime-core'

declare global {
  type AutoComponentInstance = {
    [Property in keyof GlobalComponents]: InstanceType<GlobalComponents[Property]>
  }
}
