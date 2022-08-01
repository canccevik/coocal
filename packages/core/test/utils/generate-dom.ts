import { JSDOM } from 'jsdom'

export function generateDOM() {
  global.window = new JSDOM('').window as unknown as Window & typeof globalThis
  global.document = global.window.document
}
