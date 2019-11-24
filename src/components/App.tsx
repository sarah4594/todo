import React from 'react'
import { useFirebaseAuth } from '@use-firebase/auth'
import Splashr from 'splashr'
import SplashScreen from '../SplashScreen'
import AuthenticatedApp from './AuthenticatedApp'
import NonAuthenticatedApp from './NonAuthenticatedApp'
import { useOvermind } from '../overmind'

const App = () => {
  const { loading, isSignedIn, user } = useFirebaseAuth()
  const { actions } = useOvermind()

  if (isSignedIn) {
    actions.setCurrentUser(user.uid)
  }
  return (
    <Splashr minDelay={0} extend={loading} splash={<SplashScreen />}>
      <div className="App">
        {isSignedIn ? <AuthenticatedApp /> : <NonAuthenticatedApp />}
      </div>
    </Splashr>
  )
}

export default App
