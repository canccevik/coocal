import { IExpirable } from '../expirable.interface'

export interface ICookieOptions extends IExpirable {
  secure?: boolean
  domain?: string
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None' | boolean
}
