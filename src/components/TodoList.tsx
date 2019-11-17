import React from 'react'
import { useOvermind } from '../overmind'
import { TodoList as TodoListType } from '../overmind/state'
import TodoItem from './TodoItem'

interface Props {
  list: TodoListType
}

const TodoList = ({ list }: Props) => {
  const { state, actions } = useOvermind()
  const [title, setTitle] = React.useState('')
  const listId = list.id

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode !== 13) {
      return
    }
    event.preventDefault()
    if (title) {
      actions.addTodo({ listId, title })
      setTitle('')
    }
  }

  return (
    <div>
      <h2>{list.name}</h2>
      <input
        type="text"
        placeholder="Add Todo"
        disabled={Boolean(state.editingTodoId)}
        value={title}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <ul>
        {state.filteredList(listId).map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <span>All ({state.totalCount(listId)})</span>
      <span>Active ({state.activeCount(listId)})</span>
      <span>Completed ({state.completedCount(listId)})</span>
      <button onClick={() => actions.clearCompleted(listId)}>
        Clear Completed
      </button>
    </div>
  )
}

export default TodoList
