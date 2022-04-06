import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { useForm } from '../../hooks/useForm'
import { setError, removeError } from '../../actions/ui'
import { startRegisterWithEmailPasswordsName } from '../../actions/auth'

export const RegisterScreen = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const { msgError } = state.ui

  const [values, handleInputChange] = useForm({
    name: 'Alvaro M',
    email: 'alvaro1234@gmail.com',
    password: '1234568',
    confirm: '1234568',
  })

  const { name, email, password, confirm } = values

  const handleRegister = (e) => {
    e.preventDefault()

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordsName(email, password, name))
    }
  }

  const isFormValid = () => {
    if (name.trim().length === 0) {
      console.warn('Se requiere el nombre')
      dispatch(setError('Se requiere el nombre'))
    } else if (validator.isEmail(email) === false) {
      console.warn('Email incorrect')
      dispatch(setError('Email incorrect'))
    } else if (password !== confirm || password.length < 5) {
      console.warn('Password incorrect')
      dispatch(setError('Password incorrect'))
    } else {
      dispatch(removeError())
      return true
    }
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>

      {msgError && <div className="auth__alert-error">{msgError}</div>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          defaultValue={name}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          defaultValue={email}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          onChange={handleInputChange}
          defaultValue={password}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm"
          className="auth__input"
          onChange={handleInputChange}
          defaultValue={confirm}
        />
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>

        <div className="mt-5">
          <Link to="/auth/login" className="link">
            Already registered?
          </Link>
        </div>
      </form>
    </>
  )
}
