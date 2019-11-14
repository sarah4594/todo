import React from 'react'
import { useOvermind } from '../overmind'
import TodoItem from './TodoItem'

const App: React.FC = () => {
  const { state, actions } = useOvermind()
  const [title, setTitle] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode !== 13) {
      return
    }
    event.preventDefault()
    if (title) {
      actions.addTodo(title)
      setTitle('')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Add Todo"
        disabled={Boolean(state.editingTodoId)}
        value={title}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <ul>
        {state.filteredList.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <button onClick={actions.showAll}>All ({state.totalCount})</button>
      <button onClick={actions.showActive}>Active ({state.activeCount})</button>
      <button onClick={actions.showCompleted}>
        Completed ({state.completedCount})
      </button>
      <button onClick={actions.clearCompleted}>Clear Completed</button>
    </div>
  )
}

export default App
