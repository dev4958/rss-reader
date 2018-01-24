'use strict'

// Native Node Modules
const path = require('path')

// NPM Modules
const debug = require('debug')('RSS Reader: devServer.js')

// Local Modules
const server = require(path.join(__dirname, 'server'))

let listener = server.listen(4000, () => debug(`Server listening on port ${listener.address().port}.`))
