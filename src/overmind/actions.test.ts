import { createOvermindMock } from 'overmind'
import { config } from './'

it('should add a todo', () => {
  const { state, actions } = createOvermindMock(config, {
    storeTodos: jest.fn(),
  })
  const title = 'new todo'
  actions.addTodo(title)
  console.log(state.todos)
  expect(state.todoList.find(todo => todo.title === title)).toBeTruthy()
})

it('should add 2 todos', () => {
  const { state, actions } = createOvermindMock(config, {
    storeTodos: jest.fn(),
  })
  const title1 = 'new todo 1'
  const title2 = 'new todo 2'
  actions.addTodo(title1)
  actions.addTodo(title2)
  console.log(state.todos)
  expect(state.todoList.length).toBe(2)
})

it('should toggle completed', () => {
  const { state, actions } = createOvermindMock(config, {
    storeTodos: jest.fn(),
  })
  const title = 'new todo'
  const todoId = actions.addTodo(title)
  expect(state.todos[todoId].completed).toBe(false)
  actions.toggleTodo(todoId)
  expect(state.todos[todoId].completed).toBe(true)
})
