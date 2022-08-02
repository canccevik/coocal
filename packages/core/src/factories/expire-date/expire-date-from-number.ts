import { IExpireDateFactory } from '../../interfaces'
import { TimesInMiliseconds } from './time-in-ms'

class ExpireDateFromNumber implements IExpireDateFactory {
  convertToDate(expires: number): Date {
    return new Date(new Date().getTime() + TimesInMiliseconds.s * expires)
  }
}

export const expireDateFromNumber = new ExpireDateFromNumber()
