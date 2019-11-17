import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = ({ state, effects }) => {
  state.todos = effects.getTodos()
  state.lists = effects.getLists()
}
