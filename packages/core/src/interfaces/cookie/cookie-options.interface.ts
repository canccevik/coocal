enum SameSite {
  Strict = 'Strict',
  Lax = 'Lax',
  None = 'None'
}

export interface ICookieOptions {
  expires?: Date
  secure?: boolean
  httpOnly?: boolean
  domain?: string
  path?: string
  sameSite?: SameSite | boolean
  maxAge: number
}
