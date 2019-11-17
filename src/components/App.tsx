import React from 'react'
import { useOvermind } from '../overmind'
import TodoList from './TodoList'

const App: React.FC = () => {
  const { state, actions } = useOvermind()
  const [name, setName] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode !== 13) {
      return
    }
    event.preventDefault()
    if (name) {
      actions.addList(name)
      setName('')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Add List"
        value={name}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <button onClick={actions.showAll}>All</button>
      <button onClick={actions.showActive}>Active</button>
      <button onClick={actions.showCompleted}>Completed</button>
      <div>
        {state.todoLists.map(list => (
          <TodoList key={list.id} list={list} />
        ))}
      </div>
    </div>
  )
}

export default App
