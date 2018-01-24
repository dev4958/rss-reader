'use strict'

// Native Node Modules
const path = require('path')
const fs = require('fs')

// NPM Modules
const debug = require('debug')('RSS Reader: updateUserConfiguration.js')
const Promise = require('bluebird')

const writeFile = Promise.promisify(fs.writeFile)

module.exports = (userConfig) => new Promise((resolve, reject) => {
  writeFile(path.join(__dirname, '..', 'user-config.json'), JSON.stringify(userConfig)).then(_ => {
    debug(`User configuration updated successfully.`)
    resolve()
  }).catch(e => {
    debug(`Error encountered while writing user configuration file: ${e}`)
    reject()
  })
})
