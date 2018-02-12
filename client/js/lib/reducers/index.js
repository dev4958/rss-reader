'use strict'

//NPM Modules
import { combineReducers } from 'redux'

//Reducers
import feeds from './feeds'
import browserHistory from './browserHistory'
import applicationHistory from './applicationHistory'
import applicationState from './applicationState'

export default combineReducers({ feeds, browserHistory, applicationHistory, applicationState })
