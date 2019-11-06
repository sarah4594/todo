import React from 'react'
import { useOvermind } from '../overmind'
import { toggleTodo } from '../overmind/actions'
import TodoItem from './TodoItem'

const App: React.FC = () => {
  const { state } = useOvermind()

  return (
    <div>
      <ul>
        {Object.values(state.todos).map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

export default App
