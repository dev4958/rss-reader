'use strict'

export default (state = [], action) => {
  let newState = null
  switch (action.type) {
    case 'UPDATE_FEEDS':
      return action.payload
    case 'ADDED_FEED_ENTRY':
      newState = state.slice()
      newState.push(action.payload)
      return newState.sort((a, b) => a['title'] > b['title'])
    case 'UPDATED_FEED_ENTRY':
      newState = state.slice()
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].rssUrl === action.payload.rssUrl) {
          newState[i] = action.payload
          break
        }
        if (i + 1 === newState.length) newState.push(action.payload)
      }
      return newState
    case 'DELETED_FEED_ENTRY':
      return state.slice().filter(f => f.rssUrl !== action.payload)
    case 'FETCHING_FEEDS':
    case 'ADDING_FEED_ENTRY':
    case 'UPDATING_FEED_ENTRY':
    case 'DELETING_FEED_ENTRY':
    case 'ERROR_ADDING_FEED_ENTRY':
    default:
      return state
  }
}
