import { Derive } from 'overmind'

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type State = {
  todos: {
    [id: string]: Todo
  }
  todoList: Derive<State, Todo[]>
  editingTodoId?: string
  filter: 'all' | 'active' | 'completed'
  filteredList: Derive<State, Todo[]>
  totalCount: Derive<State, number>
  activeCount: Derive<State, number>
  completedCount: Derive<State, number>
}

export const state: State = {
  todos: {},
  todoList: ({ todos }) => Object.values(todos),
  filter: 'all',
  filteredList: ({ todos, filter }) =>
    Object.values(todos).filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed
        case 'completed':
          return todo.completed
        default:
          return true
      }
    }),
  totalCount: ({ todos }) => Object.values(todos).length,
  activeCount: ({ todos }) =>
    Object.values(todos).filter(todo => !todo.completed).length,
  completedCount: ({ todos }) =>
    Object.values(todos).filter(todo => todo.completed).length,
}
