import React from 'react'
import ReactDOM from 'react-dom'
import { overmind } from './overmind'
import { Provider } from 'overmind-react'
import FirebaseApp from './FirebaseApp'
import './index.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider value={overmind}>
    <FirebaseApp />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
