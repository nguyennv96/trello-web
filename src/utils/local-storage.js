export const setItem = (keyword, value) => {
  localStorage.setItem(keyword, JSON.stringify(value))
}
export const getItem = (keyword) => {
  return JSON.parse(localStorage.getItem(keyword)) || null
}
export const removeItem = (keyword) => {
  localStorage.removeItem(keyword)
}
