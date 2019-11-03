import { Action } from 'overmind'
import Utils from '../Utils'

export const addTodo: Action<string, string> = ({ state }, title) => {
  const todo = { id: Utils.uuid(), title, completed: false }
  state.todos[todo.id] = todo
  return todo.id
}

export const toggleTodo: Action<string> = ({ state }, todoId) => {
  state.todos[todoId].completed = !state.todos[todoId].completed
}
