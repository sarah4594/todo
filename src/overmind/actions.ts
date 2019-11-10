import { Action } from 'overmind'
import Utils from '../Utils'

export const addTodo: Action<string, string> = ({ state, effects }, title) => {
  const todo = { id: Utils.uuid(), title, completed: false }
  state.todos[todo.id] = todo
  effects.storeTodos(state.todos)
  return todo.id
}

export const toggleTodo: Action<string> = ({ state, effects }, todoId) => {
  state.todos[todoId].completed = !state.todos[todoId].completed
  effects.storeTodos(state.todos)
}

export const startEditing: Action<string> = ({ state }, todoId) => {
  state.editingTodoId = todoId
}

export const stopEditing: Action = ({ state }) => {
  state.editingTodoId = undefined
}

export const saveEditingTodo: Action<string> = ({ state, effects }, title) => {
  if (!state.editingTodoId) return
  state.todos[state.editingTodoId].title = title
  state.editingTodoId = undefined
  effects.storeTodos(state.todos)
}

export const showAll: Action = ({ state }) => {
  state.filter = 'all'
}

export const showActive: Action = ({ state }) => {
  state.filter = 'active'
}

export const showCompleted: Action = ({ state }) => {
  state.filter = 'completed'
}
