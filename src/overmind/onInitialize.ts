import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = ({ state, effects }) => {
  state.lists = effects.getLists()
}
