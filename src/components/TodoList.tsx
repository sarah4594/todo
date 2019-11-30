import React from 'react'
import { useOvermind } from '../overmind'
import {
  TodoList as TodoListType,
  todofilter,
  getstats,
} from '../overmind/state'
import TodoItem from './TodoItem'
import TodoListEdit from './TodoListEdit'

interface Props {
  list: TodoListType
}

const TodoList = ({ list }: Props) => {
  const { state, actions } = useOvermind()
  const { totalCount, activeCount, completedCount } = getstats(list)
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
      actions.addTodo({ list, title })
      setTitle('')
    }
  }

  const handleStartEdit = () => {
    if (state.editingListId) return
    actions.startEditingList(list.id)
  }

  const handleDelete = () => {
    actions.deleteList(list)
  }

  return (
    <div>
      {state.editingListId === list.id ? (
        <TodoListEdit list={list} />
      ) : (
        <>
          <h2 onDoubleClick={handleStartEdit}>{list.name}</h2>
          <button onClick={handleDelete}>Delete List</button>
          <input
            type="text"
            placeholder="Add Todo"
            disabled={Boolean(state.editingTodoId)}
            value={title}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
        </>
      )}
      <button onClick={() => actions.showAll(list)}>All {totalCount}</button>
      <button onClick={() => actions.showActive(list)}>
        Active {activeCount}
      </button>
      <button onClick={() => actions.showCompleted(list)}>
        Completed {completedCount}
      </button>
      <ul>
        {todofilter(list).map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <button onClick={() => actions.clearCompleted(list)}>
        Clear Completed
      </button>
    </div>
  )
}

export default TodoList
