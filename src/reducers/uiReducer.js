import { types } from '../types/types'

export const uiReducer = (
  state = { loading: false, msgError: null },
  action,
) => {
  switch (action.type) {
    case types.uiSetErrorMessage:
      return {
        ...state,
        msgError: action.payload,
      }

    case types.uiRemoveErrorMessage:
      return {
        ...state,
        msgError: action.payload,
      }

    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      }

    case types.uiFinishLoading:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
