export const getLists = () => {
  return JSON.parse(localStorage.getItem('LISTS') || '{}')
}

export const storeLists = (lists: any) => {
  localStorage.setItem('LISTS', JSON.stringify(lists))
}

export const getTodos = () => {
  return JSON.parse(localStorage.getItem('TODOS') || '{}')
}

export const storeTodos = (todos: any) => {
  localStorage.setItem('TODOS', JSON.stringify(todos))
}
