'use strict'

// Native Node Modules
const path = require('path')
const fs = require('fs')

// NPM Modules
const debug = require('debug')('RSS Reader: getUserConfiguration.js')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)
const userConfigDefaults = {
  feeds: [],
  settings: {}
}

module.exports = () => new Promise((resolve, reject) => {
  readFile(path.join(__dirname, '..', 'user-config.json')).then(d => {
    debug(`Reading from existing user configuration file.`)
    resolve(JSON.parse(d.toString()))
  }).catch(e => {
    debug(`Couldn't read user configuration.  Using default user configuration values.`)
    resolve(userConfigDefaults)
  })
})
