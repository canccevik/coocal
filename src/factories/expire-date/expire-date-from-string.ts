import { IExpireDateFactory } from '../../interfaces'
import { TimesInMiliseconds } from './time-in-ms'

class ExpireDateFromString implements IExpireDateFactory {
  convertToDate(expires: string): Date {
    let totalTimeInMs = 0
    const usedDateTypes: string[] = []

    expires.split(' ').forEach((strDate: string) => {
      const value = strDate.substring(0, strDate.length - 1)
      const dateType = strDate.at(strDate.length - 1) as keyof typeof TimesInMiliseconds

      if (TimesInMiliseconds[dateType] && Number(value) && !usedDateTypes.includes(dateType)) {
        totalTimeInMs += TimesInMiliseconds[dateType] * Number(value)
        usedDateTypes.push(dateType)
      } else {
        throw new Error('Invalid date string!')
      }
    })
    return new Date(new Date().getTime() + totalTimeInMs)
  }
}

export const expireDateFromString = new ExpireDateFromString()
