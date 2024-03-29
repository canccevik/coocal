import { SyncLocalStorage } from './decorators'
import { expireDateFactory } from './factories'
import { ILocalStorageOptions, IStorageManager } from './interfaces'
import { isJSON } from './utils'

export class LocalStorageManager implements IStorageManager {
  public set(name: string, value: string, options?: ILocalStorageOptions): void {
    if (options && options.expires) {
      options.expires = expireDateFactory.convertToDate(options.expires)
    }
    localStorage.setItem(name, JSON.stringify({ value, expires: options?.expires }))
  }

  @SyncLocalStorage()
  public get(name: string): string | null {
    const item = JSON.parse(localStorage.getItem(name) as string)
    return item ? item.value : null
  }

  @SyncLocalStorage()
  public getAll(): Record<'name', string>[] {
    return Object.keys(localStorage).map((key) => {
      const item = localStorage.getItem(key) as string

      if (isJSON(item)) {
        return { name: key, ...JSON.parse(item) }
      }
      return { name: key, value: item }
    })
  }

  public remove(name: string): void {
    localStorage.removeItem(name)
  }

  public removeAll(): void {
    localStorage.clear()
  }
}
