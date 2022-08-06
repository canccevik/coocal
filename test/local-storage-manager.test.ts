import { generateDOM } from './utils/generate-dom'
import Coocal from '../src/index'
import { unlinkSync } from 'fs'
import path from 'path'

const { localStorage } = Coocal

describe('Local Storage Manager', () => {
  beforeAll(() => generateDOM())

  afterAll(() => unlinkSync(path.join(__dirname + '../../local-storage.json')))

  beforeEach(() => localStorage.removeAll())

  test('Should create a new item and read its value', () => {
    localStorage.set('package_name', 'Coocal')

    const value = localStorage.get('package_name')

    expect('Coocal').toEqual(value)
  })

  test('Should read all of the items', () => {
    localStorage.set('package_name', 'Coocal')
    localStorage.set('author', 'Can Çevik')

    const allItems = localStorage.getAll()
    const expectedItems = [
      { name: 'package_name', value: 'Coocal' },
      { name: 'author', value: 'Can Çevik' }
    ]

    expect(expectedItems).toEqual(allItems)
  })

  test('Should remove the item and return null', () => {
    localStorage.set('package_name', 'Coocal')

    localStorage.remove('package_name')
    const removedItem = localStorage.get('package_name')

    expect(null).toEqual(removedItem)
  })

  test('Should remove all of the items', () => {
    localStorage.set('package_name', 'Coocal')
    localStorage.set('author', 'Can Çevik')

    localStorage.removeAll()
    const allItems = localStorage.getAll()

    expect([]).toEqual(allItems)
  })
})
