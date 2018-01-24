'use strict'

import React from 'react'
import { render } from 'react-dom'

import style from '../css/style.sass'
import Root from './lib/components/Root'
import { configureStore } from './lib/configureStore'

render(<Root store={configureStore()}/>, document.getElementById('app'))
