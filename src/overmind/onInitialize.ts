import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = ({ state, effects }) => {
  state.todos = effects.getTodos()
}
