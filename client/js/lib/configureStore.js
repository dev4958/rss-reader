'use strict'

// NPM Modules
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import * as request from 'superagent'

// Reducers
import reducers from './reducers/'

export const configureStore = (cb) => request.get('http://localhost:4000/api/settings').end((e, res) => cb(createStore(reducers, res.body || { feeds: [], settings: {} }, applyMiddleware(...[thunk, createLogger()]))))
