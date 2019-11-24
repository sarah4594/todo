import React from 'react'
import { FirebaseAppProvider } from '@use-firebase/app'
import { FirebaseAuthProvider } from '@use-firebase/auth'

import App from './components/App'
import { config } from './firebaseConfig'

const FirebaseApp = () => (
  <FirebaseAppProvider config={config}>
    <FirebaseAuthProvider>
      <App />
    </FirebaseAuthProvider>
  </FirebaseAppProvider>
)

export default FirebaseApp
