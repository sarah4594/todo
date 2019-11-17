import React from 'react'
import { useOvermind } from '../overmind'
import { TodoList } from '../overmind/state'

interface Props {
  list: TodoList
}

const TodoListEdit = ({ list }: Props) => {
  const { actions } = useOvermind()
  const [name, setName] = React.useState(list.name)
  const input = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (input && input.current) {
      input.current.focus()
    }
  }, [input])

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === 27) {
      actions.stopEditingList()
      return
    }
    if (event.keyCode !== 13) {
      return
    }
    event.preventDefault()
    if (name) {
      actions.saveEditingList(name)
    }
  }

  return (
    <input
      type="text"
      ref={input}
      value={name}
      onChange={handleTitleChange}
      onKeyUp={handleKeyUp}
    />
  )
}

export default TodoListEdit
