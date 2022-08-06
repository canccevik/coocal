import { IStorageManager } from '../storage-manager.interface'
import { ILocalStorageOptions } from './local-storage-options.interface'

export interface ILocalStorageManager extends Omit<IStorageManager, 'set'> {
  set(name: string, value: string, options?: ILocalStorageOptions): void
}
