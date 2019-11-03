import { IConfig, createOvermind } from 'overmind'
import { createHook } from 'overmind-react'
import { state } from './state'
import * as actions from './actions'
import { onInitialize } from './onInitialize'

export const config = {
  state,
  actions,
  onInitialize,
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const overmind = createOvermind(config)

export const useOvermind = createHook<typeof config>()
