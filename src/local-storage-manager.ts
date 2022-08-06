import { SyncLocalStorage } from './decorators'
import { expireDateFactory } from './factories'
import { ILocalStorageManager, ILocalStorageOptions } from './interfaces'
import { isJSON } from './utils'

export class LocalStorageManager implements ILocalStorageManager {
  set(name: string, value: string, options?: ILocalStorageOptions): void {
    if (options && options.expires) {
      options.expires = expireDateFactory.convertToDate(options.expires)
    }
    localStorage.setItem(name, JSON.stringify({ value, expires: options?.expires }))
  }

  @SyncLocalStorage()
  get(name: string): string | null {
    const item = JSON.parse(localStorage.getItem(name) as string)
    return item ? item.value : null
  }

  @SyncLocalStorage()
  getAll(): { [name: string]: string }[] {
    return Object.keys(localStorage).map((key) => {
      const item = localStorage.getItem(key) as string

      if (isJSON(item)) {
        return { name: key, ...JSON.parse(item) }
      } else {
        return { name: key, value: item }
      }
    }) as { [name: string]: string }[]
  }

  remove(name: string): void {
    localStorage.removeItem(name)
  }

  removeAll(): void {
    localStorage.clear()
  }
}
