export interface IStorageManager {
  set(key: string, value: unknown): unknown
  get(key: string): unknown
  getAll(): Array<object>
  remove(key: string): void
  removeAll(): void
}
