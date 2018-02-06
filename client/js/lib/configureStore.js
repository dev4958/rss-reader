'use strict'

// NPM Modules
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import * as request from 'superagent'

// Reducers
import reducers from './reducers/'

// Actions
import { updateApplicationState } from './actions'

const applicationStateTracking = ({ getState, dispatch }) => next => action => {
  let state = next(action)
  if (action.type !== 'UPDATE_APPLICATION_STATE') dispatch(updateApplicationState(action.type, getState()))
  return state
}

export const configureStore = (cb) => request.get('http://localhost:4000/api/settings').end((e, res) => cb(createStore(reducers, res.body || { feeds: [], settings: {}, browserHistory: [] }, applyMiddleware(...[thunk, applicationStateTracking, createLogger()]))))
