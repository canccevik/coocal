import { ExpireDate, IExpireDateFactory } from '../../interfaces'
import { TimesInMiliseconds } from './time-in-ms'

class ExpireDateFromObject implements IExpireDateFactory {
  convertToDate(expires: ExpireDate): Date {
    let totalTimeInMs = 0

    Object.keys(expires).forEach((key: string) => {
      const value = expires[key as keyof ExpireDate]

      if (value && typeof value === 'number') {
        totalTimeInMs += TimesInMiliseconds[key as keyof typeof TimesInMiliseconds] * value
      }
    })
    return new Date(new Date().getTime() + totalTimeInMs)
  }
}

export const expireDateFromObject = new ExpireDateFromObject()
