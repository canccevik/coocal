import { isJSON } from '../utils'

export function SyncLocalStorage() {
  return function (target: object, key: string | symbol, descriptor: PropertyDescriptor): void {
    const method = descriptor.value

    descriptor.value = function (...args: unknown[]): unknown {
      Object.keys(localStorage).forEach((key) => {
        const itemString = localStorage.getItem(key) as string
        if (!isJSON(itemString)) return

        const item = JSON.parse(itemString)

        if (item.expires && new Date(item.expires).getTime() < new Date().getTime()) {
          localStorage.removeItem(key)
        }
      })
      return method.apply(this, args)
    }
  }
}
