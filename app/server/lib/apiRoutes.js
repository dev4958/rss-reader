'use strict';

// Native Node Modules
const path = require('path')

// NPM Modules
const debug = require('debug')('RSS Reader: apiRoutes.js')
const express = require('express')
const request = require('request')

// Local Modules
const getFeedData = require(path.join(__dirname, 'getFeedData'))
const getUserConfiguration = require(path.join(__dirname, 'getUserConfiguration'))
const updateUserConfiguration = require(path.join(__dirname, 'updateUserConfiguration'))

const apiRouter = new express.Router()

apiRouter.get('/feeds', (req, res) => {
  debug(`Updating feeds.`)
  getUserConfiguration().then(userConfig => {
    let feeds = userConfig['feeds'].map(feed => getFeedData(feed.url, feed.categories).then(d => d).catch(e => { error: 'Bad request.' }))
    Promise.all(feeds).then(d => res.status(200).json(d)).catch(e => res.status(400).send('Bad request.'))
  }).catch(e => res.status(400).send('Bad request.'))
})

apiRouter.post('/add', (req, res) => {
  debug(`Adding feed data to user configuration.`)
  let feed = { url: req.body.url, categories: req.body.categories.split(',').map(s => s.trim()) }
  getUserConfiguration().then(userConfig => {
    userConfig.feeds.push(feed)
    updateUserConfiguration(userConfig).then(_ => getFeedData(feed.url, feed.categories).then(d => res.status(200).json(d)).catch(e => res.status(400).send('Bad request.'))).catch(e => res.status(400).send('Bad request.'))
  })
})

apiRouter.put('/update', (req, res) => {
  debug(`Updating feed data in user configuration.`)
  let feed = { url: req.body.url, categories: req.body.categories.split(',').map(s => s.trim()) }
  getUserConfiguration().then(userConfig => {
    for (let i = 0; i < userConfig['feeds'].length; i++) if (userConfig['feeds'][i].url === feed.url) {
      userConfig['feeds'][i] = feed
      break
    }
    updateUserConfiguration(userConfig).then(_ => getFeedData(feed.url, feed.categories).then(d => res.status(200).json(d)).catch(e => res.status(400).send('Bad request.'))).catch(e => res.status(400).send('Bad request.'))
  })
})

apiRouter.delete('/delete', (req, res) => {
  debug(`Deleting feed data from user configuration.`)
  getUserConfiguration().then(userConfig => {
    for (let i = 0; i < userConfig['feeds'].length; i++) if (userConfig['feeds'][i].url === req.body.url) {
      userConfig['feeds'].splice(i, 1)
      break
    }
    updateUserConfiguration(userConfig).then(_ => res.status(201).json({ message: `Deleted ${req.body.url} feed successfully.` })).catch(e => res.status(400).send('Bad request.'))
  })
})

module.exports = apiRouter
