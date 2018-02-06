'use strict'

//NPM Modules
import { combineReducers } from 'redux'

//Reducers
import feeds from './feeds'
import browserHistory from './browserHistory'
import applicationHistory from './applicationHistory'

export default combineReducers({
  feeds,
  browserHistory,
  applicationHistory
})
