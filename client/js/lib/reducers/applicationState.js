'use strict'

// Actions
import { updateApplicationState } from '../actions'

export default (state = { loading: false, errors: [], errorMessages: {} }, action) => {
  let newState = null
  switch (action.type) {
    case 'APPLICATION_LOADING':
      newState = Object.assign({}, state, { loading: true })
      return newState
    case 'APPLICATION_LOADED':
      newState = Object.assign({}, state, { loading: false })
      return newState
    case 'ADD_APPLICATION_ERROR_MESSAGE':
      newState = Object.assign({}, state, { errors: state.errors.slice(), errorMessages: Object.assign({}, state.errorMessages) })
      newState['errors'].push(action.payload.errorClass)
      newState['errorMessages'][action.payload.errorClass.replace(/-/g, '')] = action.payload.errorMessage
      return newState
    case 'REMOVE_APPLICATION_ERROR_MESSAGE':
      newState = Object.assign({}, state, { errors: state.errors.slice(), errorMessages: Object.assign({}, state.errorMessages) })
      for (let i = 0; i < newState['errors'].length; i++) if (newState['errors'][i] === action.payload.errorClass) newState['errors'].splice(i, 1)
      return newState
    default:
      return state
  }
}
