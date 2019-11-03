import React from 'react'
import { useOvermind } from '../overmind'

const App: React.FC = () => {
  const { state } = useOvermind()

  return (
    <div>
      <ul>
        {Object.values(state.todos).map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? 'yes' : 'no'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
