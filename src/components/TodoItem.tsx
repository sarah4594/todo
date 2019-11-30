import React from 'react'
import { useOvermind } from '../overmind'
import { Todo } from '../overmind/state'
import TodoItemEdit from './TodoItemEdit'

interface Props {
  todo: Todo
}

const TodoItem = ({ todo }: Props) => {
  const { actions, state } = useOvermind()

  const handleClick = () => {
    actions.toggleTodo(todo)
  }

  const handleDelete = () => {
    actions.deleteTodo(todo)
  }

  const handleStartEdit = () => {
    if (state.editingTodoId) return
    actions.startEditingTodo(todo)
  }

  return (
    <li>
      {state.editingTodoId === todo.id ? (
        <TodoItemEdit todo={todo} />
      ) : (
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleClick}
          />
          <span onDoubleClick={handleStartEdit}>{todo.title}</span>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </li>
  )
}

export default TodoItem
