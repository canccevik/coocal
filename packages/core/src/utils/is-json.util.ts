export function isJSON(value: string) {
  try {
    JSON.parse(value)
  } catch (error) {
    return false
  }
  return true
}
