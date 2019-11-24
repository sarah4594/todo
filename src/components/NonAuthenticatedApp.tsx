import React from 'react'
import { useFirebaseAuth, AuthProvider } from '@use-firebase/auth'

const NonAuthenticatedApp = () => {
  const { signIn, signInError, createAuthProvider } = useFirebaseAuth()

  const signInWithRedirect = authProvider => {
    const provider = createAuthProvider(authProvider)
    signIn(provider, { method: 'signInWithPopup' })
  }

  return (
    <div>
      <h1>Please Sign In</h1>
      <p>
        <button onClick={() => signInWithRedirect(AuthProvider.GOOGLE)}>
          Sign In with Google
        </button>
      </p>
      {signInError && (
        <div className="error-message">
          <h3>{signInError.code}</h3>
          {signInError.message}
        </div>
      )}
    </div>
  )
}

export default NonAuthenticatedApp
