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
}

export const state: State = {
  todos: {},
  todoList: ({ todos }) => Object.values(todos),
}
