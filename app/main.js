'use strict'

// Native Node Modules
const path = require('path')
const url = require('url')

// NPM Modules
const electron = require('electron')
const debug = require('debug')('RSS Reader: main.js')

// Local Modules
const server = require(path.join(__dirname, 'server', 'server'))

const app = electron.app
const BrowserWindow = electron.BrowserWindow
let listener = null
let mainWindow = null

const createWindow = () => {
  listener = server.listen(0, () => {
    debug(`Server listening on port ${listener.address().port}.`)
    mainWindow = new BrowserWindow({ width: 800, height: 600 })
    mainWindow.loadURL(url.format({ pathname: path.join(__dirname, 'client', 'index.html'), protocol: 'file:', slashes: true }))
    mainWindow.on('closed', () => {
      listener.close()
      mainWindow = null
    })
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
