import { types } from '../types/types'

export const setError = (mensaje) => ({
  type: types.uiSetErrorMessage,
  payload: mensaje,
})

export const removeError = () => ({
  type: types.uiRemoveErrorMessage,
  payload: null
})

export const startLoading = () => ({
  type: types.uiStartLoading,

})

export const finishLoading = () => ({
  type: types.uiFinishLoading,

})
