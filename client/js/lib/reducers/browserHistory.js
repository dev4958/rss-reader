'use strict'

export default (state = [], action) => {
  let newState = null
  switch (action.type) {
    case 'UPDATE_BROWSER_HISTORY':
      newState = state.slice()
      newState.push(action.payload)
      return newState
    default:
      return state
  }
}
