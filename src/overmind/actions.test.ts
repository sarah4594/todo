import { createOvermindMock } from 'overmind'
import { config } from './'
import { tolist, getstats } from './state'

it('should add a list', () => {
  const { state, actions } = createOvermindMock(config, {
    storeLists: jest.fn(),
  })
  const name = 'new todo list'
  actions.addList(name)
  expect(tolist(state.lists).find(list => list.name === name)).toBeTruthy()
})

it('should add a todo to a list', () => {
  const { state, actions } = createOvermindMock(config, {
    storeLists: jest.fn(),
  })
  const name = 'new todo list'
  const listId = actions.addList(name)
  const title = 'new todo'
  const list = state.lists[listId]
  actions.addTodo({ list, title })
  expect(tolist(list.todos).find(todo => todo.title === title)).toBeTruthy()
})

it('should add 2 todos', () => {
  const { state, actions } = createOvermindMock(config, {
    storeLists: jest.fn(),
  })
  const name = 'new todo list'
  const listId = actions.addList(name)
  const title1 = 'new todo 1'
  const title2 = 'new todo 2'
  const list = state.lists[listId]
  actions.addTodo({ list, title: title1 })
  actions.addTodo({ list, title: title2 })
  expect(tolist(list.todos).length).toBe(2)
})

it('should toggle completed', () => {
  const { state, actions } = createOvermindMock(config, {
    storeLists: jest.fn(),
  })
  const name = 'new todo list'
  const listId = actions.addList(name)
  const title = 'new todo'
  const list = state.lists[listId]
  const todoId = actions.addTodo({ list, title })
  expect(list.todos[todoId].completed).toBe(false)
  actions.toggleTodo(list.todos[todoId])
  expect(list.todos[todoId].completed).toBe(true)
  actions.toggleTodo(list.todos[todoId])
  expect(list.todos[todoId].completed).toBe(false)
})

describe('filtered list', () => {
  it('should return all todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const list = state.lists[listId]
    const todoId = actions.addTodo({ list, title })
    actions.toggleTodo(list.todos[todoId])
    actions.addTodo({ list, title: 'todo 2' })
    actions.addTodo({ list, title: 'todo 3' })
    actions.showAll(list)
    expect(getstats(list).totalCount).toBe(3)
  })

  it('should return active todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const list = state.lists[listId]
    const todoId = actions.addTodo({ list, title })
    actions.toggleTodo(list.todos[todoId])
    actions.addTodo({ list, title: 'todo 2' })
    actions.addTodo({ list, title: 'todo 3' })
    actions.showActive(list)
    expect(getstats(list).activeCount).toBe(2)
  })

  it('should return completed todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const list = state.lists[listId]
    const todoId = actions.addTodo({ list, title })
    actions.toggleTodo(list.todos[todoId])
    actions.addTodo({ list, title: 'todo 2' })
    actions.addTodo({ list, title: 'todo 3' })
    actions.showCompleted(list)
    expect(getstats(list).completedCount).toBe(1)
  })

  it('should return correct counts by status', () => {
    const { state, actions } = createOvermindMock(config, {
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const list = state.lists[listId]
    const todoId = actions.addTodo({ list, title })
    actions.toggleTodo(list.todos[todoId])
    actions.addTodo({ list, title: 'todo 2' })
    actions.addTodo({ list, title: 'todo 3' })
    expect(getstats(list).totalCount).toBe(3)
    expect(getstats(list).activeCount).toBe(2)
    expect(getstats(list).completedCount).toBe(1)
    actions.addTodo({ list, title: 'todo 4' })
    expect(getstats(list).totalCount).toBe(4)
    expect(getstats(list).activeCount).toBe(3)
    expect(getstats(list).completedCount).toBe(1)
  })

  it('should delete completed todos and return a list of active todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const list = state.lists[listId]
    const todoId = actions.addTodo({ list, title })
    actions.toggleTodo(list.todos[todoId])
    actions.addTodo({ list, title: 'todo 2' })
    actions.addTodo({ list, title: 'todo 3' })
    expect(getstats(list).completedCount).toBe(1)
    actions.clearCompleted(list)
    expect(getstats(list).completedCount).toBe(0)
    expect(getstats(list).activeCount).toBe(2)
  })

  it('should delete a single todo', () => {
    const { state, actions } = createOvermindMock(config, {
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const list = state.lists[listId]
    const todoId = actions.addTodo({ list, title })
    actions.toggleTodo(list.todos[todoId])
    actions.addTodo({ list, title: 'todo 2' })
    actions.addTodo({ list, title: 'todo 3' })
    expect(getstats(list).totalCount).toBe(3)
    actions.deleteTodo(list.todos[todoId])
    expect(getstats(list).totalCount).toBe(2)
  })

  it('should delete a single list with all todos in the list', () => {
    const { state, actions } = createOvermindMock(config, {
      storeLists: jest.fn(),
    })
    const listId = actions.addList('list 1')
    const list = state.lists[listId]
    actions.addTodo({ list, title: 'todo 1' })
    actions.addTodo({ list, title: 'todo 2' })
    actions.addList('list 2')
    actions.addList('list 3')
    expect(tolist(state.lists).length).toBe(3)
    expect(getstats(list).totalCount).toBe(2)
    actions.deleteList(list)
    expect(tolist(list.todos).length).toBe(2)
  })
})
