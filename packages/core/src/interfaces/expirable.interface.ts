import { ExpireDate } from './expire-date'

export interface IExpirable {
  expires?: ExpireDate | string | number | Date
}
