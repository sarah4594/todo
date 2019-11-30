import { Action } from 'overmind'
import Utils from '../Utils'
import { Todo, TodoList, tolist } from './state'

export const setCurrentUser: Action<string> = ({ state }, userId) => {
  state.currentUserId = userId
}

export const logoutUser: Action = ({ state }) => {
  state.currentUserId = ''
}

export const addList: Action<string, string> = ({ state, effects }, name) => {
  const list: TodoList = {
    id: Utils.uuid(),
    name,
    userId: state.currentUserId,
    filter: 'all',
    todos: {},
  }
  state.lists[list.id] = list
  effects.storeLists(state.lists)
  return list.id
}

export const addTodo: Action<{ list: TodoList; title: string }, string> = (
  { state, effects },
  { list, title },
) => {
  const todo = {
    id: Utils.uuid(),
    listId: list.id,
    title,
    completed: false,
    userId: state.currentUserId,
  }
  list.todos[todo.id] = todo
  effects.storeLists(state.lists)
  return todo.id
}

export const toggleTodo: Action<Todo> = ({ state, effects }, todo) => {
  todo.completed = !todo.completed
  effects.storeLists(state.lists)
}

export const startEditingList: Action<string> = ({ state }, listId) => {
  state.editingListId = listId
}

export const stopEditingList: Action = ({ state }) => {
  state.editingListId = undefined
}

export const saveEditingList: Action<string> = ({ state, effects }, name) => {
  if (!state.editingListId) return
  state.lists[state.editingListId].name = name
  state.editingListId = undefined
  effects.storeLists(state.lists)
}

export const startEditingTodo: Action<Todo> = ({ state }, todo) => {
  state.editingTodoId = todo.id
  state.editingListId = todo.listId
}

export const stopEditingTodo: Action = ({ state }) => {
  state.editingTodoId = undefined
  state.editingListId = undefined
}

export const saveEditingTodo: Action<string> = ({ state, effects }, title) => {
  if (!state.editingTodoId || !state.editingListId) return
  const list = state.lists[state.editingListId]
  const todo = list.todos[state.editingTodoId]
  todo.title = title
  state.editingTodoId = undefined
  state.editingListId = undefined
  effects.storeLists(state.lists)
}

export const showAll: Action<TodoList> = ({ state }, list) => {
  list.filter = 'all'
}

export const showActive: Action<TodoList> = ({ state }, list) => {
  list.filter = 'active'
}

export const showCompleted: Action<TodoList> = ({ state }, list) => {
  list.filter = 'completed'
}

export const clearCompleted: Action<TodoList> = ({ state, effects }, list) => {
  tolist(list.todos)
    .filter(todo => todo.completed)
    .forEach(todo => {
      delete list.todos[todo.id]
    })
  effects.storeLists(state.lists)
}

export const deleteList: Action<TodoList> = ({ state, effects }, list) => {
  delete state.lists[list.id]
  effects.storeLists(state.lists)
}

export const deleteTodo: Action<Todo> = ({ state, effects }, todo) => {
  const list = state.lists[todo.listId]
  delete list.todos[todo.id]
  effects.storeLists(state.lists)
}
