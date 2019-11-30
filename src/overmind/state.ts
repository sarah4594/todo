export interface Todo {
  id: string
  listId: string
  title: string
  completed: boolean
  userId: string
}

export interface NewTodo {
  listId: string
  title: string
}

export interface TodoList {
  id: string
  name: string
  userId: string
  filter: 'all' | 'active' | 'completed'
  todos: {
    [id: string]: Todo
  }
}

export function tolist<T>(o: { [id: string]: T }): Readonly<T[]> {
  return Object.values(o)
}

export function getstats(list: TodoList) {
  const todos = tolist(list.todos)
  return {
    totalCount: todos.length,
    activeCount: todos.filter(todo => !todo.completed).length,
    completedCount: todos.filter(todo => todo.completed).length,
  }
}

export function todofilter(list: TodoList): Readonly<Todo[]> {
  return tolist(list.todos).filter(todo => {
    switch (list.filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })
}

export function listsbyuser(state: State) {
  return tolist(state.lists).filter(list => list.userId === state.currentUserId)
}

export type State = {
  currentUserId: string
  lists: {
    [id: string]: TodoList
  }
  editingListId?: string
  editingTodoId?: string
}

export const state: State = {
  currentUserId: '',
  lists: {},
}
