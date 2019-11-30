export const getLists = () => {
  return JSON.parse(localStorage.getItem('LISTS') || '{}')
}

export const storeLists = (lists: any) => {
  localStorage.setItem('LISTS', JSON.stringify(lists))
}
