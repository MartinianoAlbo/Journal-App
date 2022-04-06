import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useForm } from '../../hooks/useForm'
import { startLoginEmailPasswords, startGoogleLogin } from '../../actions/auth'
import { setError, removeError } from '../../actions/ui'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const { msgError, loading } = state.ui

  const [values, handleInputChanges] = useForm({
    email: 'alvaro1234@gmail.com',
    password: '1234568',
  })

  const { email, password } = values

  const handleLogin = (e) => {
    e.preventDefault()

    if (isFormValid()) {
      if (msgError != null) {
        dispatch(removeError())
      }
      dispatch(startLoginEmailPasswords(email, password))
    }
  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin())
  }

  const isFormValid = () => {
    
    if (!validator.isEmail(email)) {
      console.warn('Email incorrect')
      dispatch(setError('Email incorrect'))
    }
    // else if (password.length < 5) {

    //   console.warn('Password incorrect')
    //   dispatch(setError('Password incorrect'))

    // }
    else {
      return true
    }
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>

      {msgError && <div className="auth__alert-error">{msgError}</div>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChanges}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChanges}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>
      </form>

      {loading && (
        <div className="auth__spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      )}

      <div className="auth__social-networks">
        <p>Login with social networks</p>

        <div className="google-btn" onClick={handleGoogleLogin}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google button"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
      </div>

      <Link to="/auth/register" className="link">
        Create new account
      </Link>
    </>
  )
}
