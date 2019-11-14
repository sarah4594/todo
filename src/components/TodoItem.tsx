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
    actions.toggleTodo(todo.id)
  }

  const handleStartEdit = () => {
    if (state.editingTodoId) return
    actions.startEditing(todo.id)
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
          <span onDoubleClick={handleStartEdit}>
            {todo.title} ({todo.completed ? 'yes' : 'no'})
          </span>
        </div>
      )}
    </li>
  )
}

export default TodoItem
