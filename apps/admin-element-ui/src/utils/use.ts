import {
  useSessionStorage,
  useStorage,
  type MaybeRefOrGetter,
  type StorageLike,
  type UseStorageOptions,
} from '@vueuse/core'

const prefix = 'aeu_'

// SessionStorage
export function useSS<T>(key: string, value: MaybeRefOrGetter<T>, options?: UseStorageOptions<T>) {
  return useSessionStorage(prefix + key, value, options)
}

// LocalStorage
export function useLS<T>(
  key: string,
  value: MaybeRefOrGetter<T>,
  storage?: StorageLike,
  options?: UseStorageOptions<T>,
) {
  return useStorage(prefix + key, value, storage, options)
}
