export interface IExpireDateFactory {
  convertToDate(expires: unknown): Date
}
