import Coocal from '../src/index'
import { generateDOM } from './utils/generate-dom'

const { cookies } = Coocal

describe('Cookie Manager', () => {
  beforeAll(() => generateDOM())

  beforeEach(() => cookies.removeAll())

  test('Should create a new cookie and read its value', () => {
    cookies.set('package_name', 'Coocal')

    const cookie = cookies.get('package_name')

    expect('Coocal').toEqual(cookie)
  })

  test('Should read all of the cookies', () => {
    cookies.set('package_name', 'Coocal')
    cookies.set('author', 'Can Çevik')

    const allCookies = cookies.getAll()
    const expectedCookies = [
      { key: 'package_name', value: 'Coocal' },
      { key: 'author', value: 'Can Çevik' }
    ]

    expect(expectedCookies).toEqual(allCookies)
  })

  test('Should remove the cookie and return null', () => {
    cookies.set('package_name', 'Coocal')

    cookies.remove('package_name')
    const removedCookie = cookies.get('package_name')

    expect(null).toEqual(removedCookie)
  })

  test('Should remove all of the cookies', () => {
    cookies.set('package_name', 'Coocal')
    cookies.set('author', 'Can Çevik')

    cookies.removeAll()
    const allCookies = cookies.getAll()

    expect([]).toEqual(allCookies)
  })
})
