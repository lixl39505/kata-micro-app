import { createPinia } from 'pinia'
import type { Router } from 'vue-router'

export const pinia = createPinia()

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router
  }
}

export function injectRouter(router: Router) {
  pinia.use(() => {
    return {
      router: markRaw(router),
    }
  })
}
