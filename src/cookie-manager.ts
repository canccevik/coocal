import cookie, { CookieSerializeOptions } from 'cookie'
import { expireDateFactory } from './factories'
import { ICookieManager, ICookieOptions } from './interfaces'

export class CookieManager implements ICookieManager {
  public set(name: string, value: string, options?: ICookieOptions): void {
    if (options && options.expires) {
      options.expires = expireDateFactory.convertToDate(options.expires)
    }
    document.cookie = cookie.serialize(name, value, options as CookieSerializeOptions)
  }

  public get(name: string): string | null {
    const cookiesObject = cookie.parse(document.cookie)

    if (cookiesObject.hasOwnProperty(name)) {
      return cookiesObject[name]
    }
    return null
  }

  public getAll(): { [name: string]: string }[] {
    const cookiesObject = cookie.parse(document.cookie)

    return Object.entries(cookiesObject).map((cookie) => {
      return { name: cookie[0], value: cookie[1] as string }
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
