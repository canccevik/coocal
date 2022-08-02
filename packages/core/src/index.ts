import { CookieManager } from './cookie-manager'
import { LocalStorageManager } from './local-storage-manager'

export default {
  cookies: new CookieManager(),
  localStorage: new LocalStorageManager()
}
