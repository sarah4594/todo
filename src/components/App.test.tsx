import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { createOvermindMock } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from '../overmind'

it('renders without crashing', () => {
  const overmind = createOvermindMock(config)
  render(
    <Provider value={overmind}>
      <App />
    </Provider>,
  )
})
