import { createOvermindMock } from 'overmind'
import { config } from './'
import { addTodo } from './actions'

it('should add a list', () => {
  const { state, actions } = createOvermindMock(config, {
    storeLists: jest.fn(),
  })
  const name = 'new todo list'
  actions.addList(name)
  console.log(state.lists)
  expect(state.todoLists.find(list => list.name === name)).toBeTruthy()
})

it('should add a todo to a list', () => {
  const { state, actions } = createOvermindMock(config, {
    storeTodos: jest.fn(),
    storeLists: jest.fn(),
  })
  const name = 'new todo list'
  const listId = actions.addList(name)
  const title = 'new todo'
  actions.addTodo({ listId, title })
  console.log(state.todos)
  expect(state.todoList(listId).find(todo => todo.title === title)).toBeTruthy()
})

it('should add 2 todos', () => {
  const { state, actions } = createOvermindMock(config, {
    storeTodos: jest.fn(),
    storeLists: jest.fn(),
  })
  const name = 'new todo list'
  const listId = actions.addList(name)
  const title1 = 'new todo 1'
  const title2 = 'new todo 2'
  actions.addTodo({ listId, title: title1 })
  actions.addTodo({ listId, title: title2 })
  console.log(state.todos)
  expect(state.todoList(listId).length).toBe(2)
})

it('should toggle completed', () => {
  const { state, actions } = createOvermindMock(config, {
    storeTodos: jest.fn(),
    storeLists: jest.fn(),
  })
  const name = 'new todo list'
  const listId = actions.addList(name)
  const title = 'new todo'
  const todoId = actions.addTodo({ listId, title })
  expect(state.todos[todoId].completed).toBe(false)
  actions.toggleTodo(todoId)
  expect(state.todos[todoId].completed).toBe(true)
  actions.toggleTodo(todoId)
  expect(state.todos[todoId].completed).toBe(false)
})

describe('filtered list', () => {
  it('should return all todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const todoId = actions.addTodo({ listId, title })
    actions.toggleTodo(todoId)
    actions.addTodo({ listId, title: 'todo 2' })
    actions.addTodo({ listId, title: 'todo 3' })
    actions.showAll()
    expect(state.filteredList(listId).length).toBe(3)
  })

  it('should return active todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const todoId = actions.addTodo({ listId, title })
    actions.toggleTodo(todoId)
    actions.addTodo({ listId, title: 'todo 2' })
    actions.addTodo({ listId, title: 'todo 3' })
    actions.showActive()
    expect(state.filteredList(listId).length).toBe(2)
  })

  it('should return completed todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const todoId = actions.addTodo({ listId, title })
    actions.toggleTodo(todoId)
    actions.addTodo({ listId, title: 'todo 2' })
    actions.addTodo({ listId, title: 'todo 3' })
    actions.showCompleted()
    expect(state.filteredList(listId).length).toBe(1)
  })

  it('should return correct counts by status', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const todoId = actions.addTodo({ listId, title })
    actions.toggleTodo(todoId)
    actions.addTodo({ listId, title: 'todo 2' })
    actions.addTodo({ listId, title: 'todo 3' })
    expect(state.totalCount(listId)).toBe(3)
    expect(state.activeCount(listId)).toBe(2)
    expect(state.completedCount(listId)).toBe(1)
    actions.addTodo({ listId, title: 'todo 4' })
    expect(state.totalCount(listId)).toBe(4)
    expect(state.activeCount(listId)).toBe(3)
    expect(state.completedCount(listId)).toBe(1)
  })

  it('should delete completed todos and return a list of active todos', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const todoId = actions.addTodo({ listId, title })
    actions.toggleTodo(todoId)
    actions.addTodo({ listId, title: 'todo 2' })
    actions.addTodo({ listId, title: 'todo 3' })
    expect(state.completedCount(listId)).toBe(1)
    actions.clearCompleted(listId)
    expect(state.completedCount(listId)).toBe(0)
    expect(state.activeCount(listId)).toBe(2)
  })

  it('should delete a single todo', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
      storeLists: jest.fn(),
    })
    const name = 'new todo list'
    const listId = actions.addList(name)
    const title = 'new todo'
    const todoId = actions.addTodo({ listId, title })
    actions.toggleTodo(todoId)
    actions.addTodo({ listId, title: 'todo 2' })
    actions.addTodo({ listId, title: 'todo 3' })
    expect(state.totalCount(listId)).toBe(3)
    actions.deleteTodo(todoId)
    expect(state.totalCount(listId)).toBe(2)
  })

  it('should delete a single list with all todos in the list', () => {
    const { state, actions } = createOvermindMock(config, {
      storeTodos: jest.fn(),
      storeLists: jest.fn(),
    })
    const listId = actions.addList('list 1')
    actions.addTodo({ listId, title: 'todo 1' })
    actions.addTodo({ listId, title: 'todo 2' })
    actions.addList('list 2')
    actions.addList('list 3')
    expect(state.todoLists.length).toBe(3)
    expect(state.totalCount(listId)).toBe(2)
    actions.deleteList(listId)
    expect(state.todoLists.length).toBe(2)
    expect(state.totalCount(listId)).toBe(0)
  })
})
