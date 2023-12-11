export const isValidNumber = (value, step) => {
  const expresionRegular = new RegExp(`^-?\\d+(\\.\\d{0,${step}})?$`)
  return expresionRegular.test(value)
}

export const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false

  const parts = dateString.split('-')
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const day = parseInt(parts[2], 10)

  if (day < 1 || day > 31 || month < 1 || month > 12 || year > 2023) {
    return false
  }

  return true
}