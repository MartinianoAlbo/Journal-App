import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { JournalScreen } from '../components/journal/JournalScreen'
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import {startLoadingNotes} from '../actions/notes'

export const AppRouter = () => {
  const dispatch = useDispatch()

  //esperar que nos de una respuesta firebase para saber a donde redireccionar al usuario
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //mantener al usuario logueado si es que recarga la pagina
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {

        dispatch(login(user.uid, user.displayName))
        
        setIsLoggedIn(true)

        dispatch(startLoadingNotes(user.uid))

      } else {
        setIsLoggedIn(false)
      }

      setChecking(false)
    })
  }, [dispatch, setChecking, setIsLoggedIn])

  if (checking) {
    ;<h2>Wait...</h2>
  }

  return (
    <div className="animate__animated animate__fadeIn">
      <Router>
        <Switch>
          <PublicRoutes
            path="/auth"
            isAuthenticated={isLoggedIn}
            component={AuthRouter}
          />

          <PrivateRoutes
            exact
            path="/"
            isAuthenticated={isLoggedIn}
            component={JournalScreen}
          />

          {/* <Route exact path={'/'} component={JournalScreen} /> */}

          <Redirect to="/auth/login" />
        </Switch>
      </Router>
    </div>
  )
}
