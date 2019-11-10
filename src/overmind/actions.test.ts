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

describe('filtered list', () => {
  it('should return all todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
    })
    const todoId = actions.addTodo('todo1')
    actions.toggleTodo(todoId)
    actions.addTodo('todo2')
    actions.addTodo('todo3')
    actions.showAll()
    expect(state.filteredList.length).toBe(3)
  })

  it('should return active todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
    })
    const todoId = actions.addTodo('todo1')
    actions.toggleTodo(todoId)
    actions.addTodo('todo2')
    actions.addTodo('todo3')
    actions.showActive()
    expect(state.filteredList.length).toBe(2)
  })

  it('should return completed todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
    })
    const todoId = actions.addTodo('todo1')
    actions.toggleTodo(todoId)
    actions.addTodo('todo2')
    actions.addTodo('todo3')
    actions.showCompleted()
    expect(state.filteredList.length).toBe(1)
  })

  it('should return correct counts by status', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
    })
    const todoId = actions.addTodo('todo1')
    actions.toggleTodo(todoId)
    actions.addTodo('todo2')
    actions.addTodo('todo3')
    expect(state.totalCount).toBe(3)
    expect(state.activeCount).toBe(2)
    expect(state.completedCount).toBe(1)
    actions.addTodo('todo4')
    expect(state.totalCount).toBe(4)
    expect(state.activeCount).toBe(3)
    expect(state.completedCount).toBe(1)
  })
})
