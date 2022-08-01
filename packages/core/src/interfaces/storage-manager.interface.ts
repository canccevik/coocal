export interface IStorageManager {
  set(name: string, value: string): void
  get(name: string): string | null
  getAll(): { [name: string]: string }[]
  remove(name: string): void
  removeAll(): void
}
