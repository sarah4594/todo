import React, { useEffect } from 'react'
import { useOvermind } from '../overmind'
import { Todo } from '../overmind/state'

interface Props {
  todo: Todo
}

const TodoItem = ({ todo }: Props) => {
  const { actions, state } = useOvermind()
  const [title, setTitle] = React.useState(todo.title)

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === 27) {
      actions.stopEditing()
      return
    }
    if (event.keyCode !== 13) {
      return
    }
    event.preventDefault()
    if (title) {
      actions.saveEditingTodo(title)
    }
  }

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
        <input
          type="text"
          defaultValue={todo.title}
          onChange={handleTitleChange}
          onKeyUp={handleKeyUp}
        />
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
