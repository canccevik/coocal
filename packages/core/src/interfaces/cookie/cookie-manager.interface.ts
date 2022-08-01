import { IStorageManager } from '../storage-manager.interface'
import { ICookieOptions } from './cookie-options.interface'

export interface ICookieManager extends Omit<IStorageManager, 'set'> {
  set(name: string, value: string, options: ICookieOptions): void
}
