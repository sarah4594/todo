export const getTodos = () => {
  return JSON.parse(localStorage.getItem('TODOS') || '{}')
}

export const storeTodos = (todos: any) => {
  localStorage.setItem('TODOS', JSON.stringify(todos))
}
