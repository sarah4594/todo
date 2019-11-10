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
}

export const state: State = {
  todos: {},
  todoList: ({ todos }) => Object.values(todos),
  filter: 'all',
  filteredList: ({ todos, filter }) =>
    Object.values(todos).filter(todo => {
      switch (filter) {
        case 'all':
          return true
        case 'active':
          return !todo.completed
        case 'completed':
          return todo.completed
      }
    }),
}
