import cookie, { CookieSerializeOptions } from 'cookie'
import { expireDateFactory } from './factories'
import { ICookieOptions, IStorageManager } from './interfaces'

export class CookieManager implements IStorageManager {
  public set(name: string, value: string, options?: ICookieOptions): void {
    if (options && options.expires) {
      options.expires = expireDateFactory.convertToDate(options.expires)
    }
    document.cookie = cookie.serialize(name, value, options as CookieSerializeOptions)
  }

  public get(name: string): string | null {
    const cookies = cookie.parse(document.cookie)

    if (cookies.hasOwnProperty(name)) {
      return cookies[name]
    }
    return null
  }

  public getAll(): Record<'name', string>[] {
    const cookies = cookie.parse(document.cookie)

    return Object.entries(cookies).map((cookie) => {
      return { name: cookie[0], value: cookie[1] }
    })
  }

  public remove(name: string): void {
    const pastDate = new Date(Date.now() - 1000)
    document.cookie = cookie.serialize(name, '', { expires: pastDate })
  }

  public removeAll(): void {
    const cookiesObject = cookie.parse(document.cookie)

    Object.entries(cookiesObject).forEach((cookie) => {
      const cookieName = cookie[0]
      this.remove(cookieName)
    })
  }
}
