'use strict'

import React from 'react'
import { render } from 'react-dom'

import style from '../css/style.sass'
import Root from './lib/components/Root'
import { configureStore } from './lib/configureStore'

document.getElementById('setup-loader').style.opacity = 1
setTimeout(() => {
  configureStore(store => {
    document.getElementById('setup-loader').style.opacity = 0
    setTimeout(() => {
      document.getElementById('setup-loader').remove()
      render(<Root store={store}/>, document.getElementById('app'))
    }, 250)
  })
}, 250)
