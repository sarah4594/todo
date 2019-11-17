import { Action } from 'overmind'
import Utils from '../Utils'
import { NewTodo } from './state'

export const addList: Action<string, string> = ({ state, effects }, name) => {
  const list = { id: Utils.uuid(), name }
  state.lists[list.id] = list
  effects.storeLists(state.lists)
  return list.id
}

export const addTodo: Action<NewTodo, string> = (
  { state, effects },
  newTodo,
) => {
  const todo = {
    id: Utils.uuid(),
    listId: newTodo.listId,
    title: newTodo.title,
    completed: false,
  }
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

export const clearCompleted: Action<string> = ({ state, effects }, listId) => {
  state
    .todoList(listId)
    .filter(todo => todo.completed)
    .forEach(todo => {
      delete state.todos[todo.id]
    })
  effects.storeTodos(state.todos)
}

export const deleteTodo: Action<string> = ({ state, effects }, todoId) => {
  delete state.todos[todoId]
  effects.storeTodos(state.todos)
}
