import React from 'react'
import { useOvermind } from '../overmind'
import { toggleTodo } from '../overmind/actions'

const App: React.FC = () => {
  const { state } = useOvermind()
  const handleClick = () => {
    actions.toggleTodo(todo.id)
  }

  return (
    <div>
      <ul>
        {Object.values(state.todos).map(todo => (
          <li key={todo.id}>
            {todo.title}
            <input type="checkbox" id={todo.id} onClick={handleClick()} />
            {todo.completed ? 'yes' : 'no'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
