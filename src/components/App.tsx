import React from 'react'
import logo from '../logo.svg'
import './App.css'
import { useOvermind } from '../overmind'
import { addTodo } from '../overmind/actions'

const App: React.FC = () => {
  const { state, actions } = useOvermind()
  actions.addTodo('first todo')
  actions.addTodo('second todo')

  return (
    <div className="App">
      <ul>
        {Object.values(state.todos).map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
