import { ExpireDate } from '../expire-date'

export interface ICookieOptions {
  expires?: ExpireDate | string | number | Date
  secure?: boolean
  domain?: string
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None' | boolean
}
