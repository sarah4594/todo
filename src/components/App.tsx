import React from 'react'
import { useOvermind } from '../overmind'
import TodoItem from './TodoItem'

const App: React.FC = () => {
  const { state, actions } = useOvermind()
  const [count, setCount] = React.useState(1)

  const handleClick = () => {
    actions.addTodo(`Todo #${count}`)
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={handleClick}>Add Todo</button>
      <ul>
        {Object.values(state.todos).map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

export default App
