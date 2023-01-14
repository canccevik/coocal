import { IExpireDateFactory } from '../../interfaces'
import { TimesInMiliseconds } from './time-in-ms'

class ExpireDateFromNumber implements IExpireDateFactory {
  public convertToDate(expires: number): Date {
    return new Date(new Date().getTime() + TimesInMiliseconds.seconds * expires)
  }
}

export const expireDateFromNumber = new ExpireDateFromNumber()
