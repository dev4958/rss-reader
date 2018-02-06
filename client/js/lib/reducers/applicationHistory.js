'use strict'

export default (state = [], action) => {
  let newState = null
  switch (action.type) {
    case 'UPDATE_APPLICATION_STATE':
      newState = state.slice()
      delete action.payload.state.applicationHistory
      action.payload.state['action'] = action.payload.actionType
      newState.push(action.payload.state)
      return newState
    default:
      return state
  }
}
