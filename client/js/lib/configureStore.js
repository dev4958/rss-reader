'use strict'

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers/'

const persistedState = {
  feeds: [],
  settings: {}
}

export const configureStore = () => {
  const middleware = [thunk]
  if (process.env.NODE_ENV !== 'production') middleware.push(createLogger())
  return createStore(reducers, persistedState, applyMiddleware(...middleware))
}
