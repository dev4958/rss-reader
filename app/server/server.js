'use strict'

// Native Node Modules
const path = require('path')

// NPM Modules
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()
app.use(helmet())
app.use(helmet.noCache())
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
app.use(bodyParser.json())
app.use('/api', require(path.join(__dirname, 'lib', 'apiRoutes.js')))

module.exports = app
