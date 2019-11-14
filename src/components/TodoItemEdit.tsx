import React from 'react'
import { useOvermind } from '../overmind'
import { Todo } from '../overmind/state'

interface Props {
  todo: Todo
}

const TodoItemEdit = ({ todo }: Props) => {
  const { actions } = useOvermind()
  const [title, setTitle] = React.useState(todo.title)
  const input = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (input && input.current) {
      input.current.focus()
    }
  }, [input])

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

  return (
    <input
      type="text"
      ref={input}
      value={title}
      onChange={handleTitleChange}
      onKeyUp={handleKeyUp}
    />
  )
}

export default TodoItemEdit
