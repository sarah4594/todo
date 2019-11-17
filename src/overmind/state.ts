import { Derive } from 'overmind'

export interface Todo {
  id: string
  listId: string
  title: string
  completed: boolean
}

export interface NewTodo {
  listId: string
  title: string
}

export interface TodoList {
  id: string
  name: string
}

export type State = {
  todos: {
    [id: string]: Todo
  }
  lists: {
    [id: string]: TodoList
  }
  todoLists: Derive<State, TodoList[]>
  todoList: Derive<State, (listId: string) => Todo[]>
  editingListId?: string
  editingTodoId?: string
  filter: 'all' | 'active' | 'completed'
  filteredList: Derive<State, (listId: string) => Todo[]>
  totalCount: Derive<State, (listId: string) => number>
  activeCount: Derive<State, (listId: string) => number>
  completedCount: Derive<State, (listId: string) => number>
}

export const state: State = {
  todos: {},
  lists: {},
  todoLists: ({ lists }) => Object.values(lists),
  todoList: ({ todos }) => listId =>
    Object.values(todos).filter(todo => todo.listId === listId),
  filter: 'all',
  filteredList: ({ todoList, filter }) => listId =>
    todoList(listId).filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed
        case 'completed':
          return todo.completed
        default:
          return true
      }
    }),
  totalCount: ({ todoList }) => listId => todoList(listId).length,
  activeCount: ({ todoList }) => listId =>
    todoList(listId).filter(todo => !todo.completed).length,
  completedCount: ({ todoList }) => listId =>
    todoList(listId).filter(todo => todo.completed).length,
}
