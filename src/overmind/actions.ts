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
