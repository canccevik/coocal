import cookie, { CookieSerializeOptions } from 'cookie'
import { expireDateFactory } from './factories'
import { ICookieManager, ICookieOptions } from './interfaces'

export class CookieManager implements ICookieManager {
  set(name: string, value: string, options?: ICookieOptions) {
    if (options && options.expires) {
      options.expires = expireDateFactory.convertToDate(options.expires)
    }
    document.cookie = cookie.serialize(name, value, options as CookieSerializeOptions)
  }

  get(name: string): string | null {
    const cookiesObject = cookie.parse(document.cookie)

    if (cookiesObject.hasOwnProperty(name)) {
      return cookiesObject[name]
    }
    return null
  }

  getAll(): { [name: string]: string }[] {
    const cookiesObject = cookie.parse(document.cookie)

    return Object.entries(cookiesObject).map((cookie) => {
      return { key: cookie[0], value: cookie[1] }
    })
  }

  remove(name: string): void {
    const pastDate = new Date(Date.now() - 1000)
    document.cookie = cookie.serialize(name, '', { expires: pastDate })
  }

  removeAll(): void {
    const cookiesObject = cookie.parse(document.cookie)

    Object.entries(cookiesObject).forEach((cookie) => {
      const cookieName = cookie[0]
      this.remove(cookieName)
    })
  }
}
