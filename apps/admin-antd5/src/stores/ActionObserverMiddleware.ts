import { Middleware, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

interface ActionObserver {
  (action: PayloadAction): void
}

export const ActionObserverMiddleware: Middleware<{}, RootState> = (store) => {
  let listeners: Array<ActionObserver> = []

  function emit(action: PayloadAction) {
    listeners.forEach((f) => f(action))
  }

  Object.assign(store, {
    subscribeAction(handler: ActionObserver) {
      listeners.push(handler)

      return () => {
        let i = listeners.findIndex((v) => v === handler)
        listeners.splice(i, 1)
      }
    },
  })

  return (next) => (action) => {
    next(action)
    emit(action as PayloadAction)
  }
}
