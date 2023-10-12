import { CookieSerializeOptions } from 'cookie'
import { IExpirable } from './expirable.interface'

export interface ICookieOptions extends IExpirable, Omit<CookieSerializeOptions, 'expires'> {}
