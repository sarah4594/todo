import React from 'react'
import { useOvermind } from '../overmind'
import { useFirebaseAuth } from '@use-firebase/auth'
import TodoList from './TodoList'
import { listsbyuser } from '../overmind/state'

const AuthenticatedApp: React.FC = () => {
  const { state, actions } = useOvermind()
  const [name, setName] = React.useState('')
  const { user, signOut } = useFirebaseAuth()
  const { displayName } = user

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
      <h1>Welcome {displayName}</h1>
      <input
        type="text"
        placeholder="Add List"
        disabled={Boolean(state.editingTodoId)}
        value={name}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <div>
        {listsbyuser(state).map(list => (
          <TodoList key={list.id} list={list} />
        ))}
      </div>
      <p>
        <button onClick={signOut}>Sign Out</button>
      </p>
    </div>
  )
}

export default AuthenticatedApp
