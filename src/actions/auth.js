import { types } from '../types/types'
import { firebase, googleAuth } from '../firebase/firebase-config'
import { startLoading, finishLoading } from '../actions/ui'
import Swal from 'sweetalert2'
import { notesLogout } from './notes'


export const startLoginEmailPasswords = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))

        if (user) {
          setTimeout(() => {
            dispatch(finishLoading())
          }, 2000)
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(finishLoading())
        Swal.fire('Error', error.message, 'error')
      })
  }
}

export const startRegisterWithEmailPasswordsName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name })

        dispatch(login(user.uid, user.displayName))
      })
      .catch((error) => {
        dispatch(finishLoading())
        Swal.fire('Error', error.message, 'error')
      })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuth)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
  }
}

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  }
}

export const startLogout = () => { 
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(notesLogout());
  }
}

export const logout = () => {
  return {
    type: types.logout
  }
}

