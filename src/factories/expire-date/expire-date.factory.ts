import { IExpireDateFactory } from '../../interfaces'
import { expireDateFromNumber } from './expire-date-from-number'
import { expireDateFromObject } from './expire-date-from-object'
import { expireDateFromString } from './expire-date-from-string'

class ExpireDateFactory {
  private factories: { [key: string]: IExpireDateFactory } = {
    number: expireDateFromNumber,
    string: expireDateFromString,
    object: expireDateFromObject
  }

  convertToDate(expires: unknown): Date {
    return this.factories[typeof expires].convertToDate(expires)
  }
}

export const expireDateFactory = new ExpireDateFactory()
