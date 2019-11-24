import { Derive } from 'overmind'

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
}

export type State = {
  currentUserId: string
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
  listByUser: Derive<State, TodoList[]>
}

export const state: State = {
  currentUserId: '',
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
  listByUser: ({ todoLists, currentUserId }) =>
    todoLists.filter(list => list.userId === currentUserId),
}
