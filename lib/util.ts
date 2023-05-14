export const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1))
    const tmp = array[i]
    array[i] = array[rand]
    array[rand] = tmp
  }

  return array
}
