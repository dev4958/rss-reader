'use strict'

const debug = require('debug')('RSS Reader: getFeedData.js')
const FeedParser = require('feedparser')
const request = require('request')
const moment = require('moment')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')

const window = (new JSDOM('')).window
const DOMPurify = createDOMPurify(window)

module.exports = (url = null, categories = []) => new Promise((resolve, reject) => {
  debug(`Now retrieving new feed data @ [${url}].`)
  let req = request({ url: url, headers: { 'User-Agent': 'RSS Reader' } }), feedparser = new FeedParser(), feed = { articles: [] }
  req.on('error', (e) => {
    debug(`Feed Request Error @ [${url}]: ${e}`)
    reject(e)
  })
  feedparser.on('error', (e) => {
    debug(`Feed Parser Error @ [${url}]: ${e}`)
    reject(e)
  })
  req.on('response', function(res) {
    debug(`Response Status Code @ [${url}]: ${res.statusCode}`)
    res.statusCode !== 200 ? reject('Failed request.') : this.pipe(feedparser)
  })
  feedparser.on('data', (chunk, article = {}) => {
    DOMPurify.setConfig({ ALLOWED_TAGS: ['p', 'a', 'figure', 'span', 'em', '#text'], SAFE_FOR_JQUERY: true, SAFE_FOR_TEMPLATES: true, ALLOWED_ATTR: [] })
    article['title'] = chunk.hasOwnProperty('title') ? DOMPurify.sanitize(chunk.title) : null
    article['description'] = chunk.hasOwnProperty('summary') ? chunk.hasOwnProperty('description') ? DOMPurify.sanitize(chunk.description) : DOMPurify.sanitize(chunk.summary) : null
    article['date'] = chunk.hasOwnProperty('date') ? DOMPurify.sanitize(chunk.date) : null
    article['link'] = chunk.hasOwnProperty('link') ? DOMPurify.sanitize(chunk.link) : null
    article['author'] = chunk.hasOwnProperty('author') ? DOMPurify.sanitize(chunk.author) : null
    article['image'] = chunk.hasOwnProperty('image') ? DOMPurify.sanitize(chunk.image) : null
    article['categories'] = chunk.hasOwnProperty('categories') ? DOMPurify.sanitize(chunk.categories) : null
    article['source'] = chunk.hasOwnProperty('source') ? DOMPurify.sanitize(chunk.source) : null
    DOMPurify.setConfig({ ALLOWED_TAGS: ['a', 'p', 'em', '#text'], SAFE_FOR_JQUERY: true, SAFE_FOR_TEMPLATES: true, ALLOWED_ATTR: [], KEEP_CONTENT: false })
    for (let key in article) article[key] = DOMPurify.sanitize(article[key])
    DOMPurify.setConfig({ ALLOWED_TAGS: ['#text'], SAFE_FOR_JQUERY: true, SAFE_FOR_TEMPLATES: true, ALLOWED_ATTR: [] })
    for (let key in article) article[key] = DOMPurify.sanitize(article[key]).replace(/\||\. \(video link\)|\(\)|\"\"/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/(^|\w?)View.?/g, '').trim()
    article['date'] = moment(article['date']).format('dddd, MMMM Do YYYY')
    if (article['date'] === 'Invalid date') article['date'] = null
    feed.articles.push(article)
  })
  feedparser.on('readable', function() {
    DOMPurify.setConfig({ ALLOWED_TAGS: ['p', 'a', 'figure', 'span', 'em', '#text'], SAFE_FOR_JQUERY: true, SAFE_FOR_TEMPLATES: true, ALLOWED_ATTR: [] })
    feed['title'] = this.meta.hasOwnProperty('title') ? DOMPurify.sanitize(this.meta.title) : null
    feed['description'] = this.meta.hasOwnProperty('description') ? DOMPurify.sanitize(this.meta.description) : null
    feed['date'] = this.meta.hasOwnProperty('date') ? DOMPurify.sanitize(this.meta.date) : null
    feed['link'] = this.meta.hasOwnProperty('link') ? DOMPurify.sanitize(this.meta.link) : null
    feed['author'] = this.meta.hasOwnProperty('author') ? DOMPurify.sanitize(this.meta.author) : null
    feed['language'] = this.meta.hasOwnProperty('language') ? DOMPurify.sanitize(this.meta.language) : null
    feed['favicon'] = this.meta.hasOwnProperty('favicon') ? DOMPurify.sanitize(this.meta.favicon) : null
    feed['copyright'] = this.meta.hasOwnProperty('copyright') ? DOMPurify.sanitize(this.meta.copyright) : null
    feed['image'] = this.meta.hasOwnProperty('image') ? DOMPurify.sanitize(this.meta.image) : null
    feed['categories'] = this.meta.hasOwnProperty('categories') ? DOMPurify.sanitize(this.meta.categories) : null
    DOMPurify.setConfig({ ALLOWED_TAGS: ['p', 'em', '#text'], SAFE_FOR_JQUERY: true, SAFE_FOR_TEMPLATES: true, ALLOWED_ATTR: [], KEEP_CONTENT: false })
    for (let key in feed) if (key !== 'articles') feed[key] = DOMPurify.sanitize(feed[key])
    DOMPurify.setConfig({ ALLOWED_TAGS: ['#text'], SAFE_FOR_JQUERY: true, SAFE_FOR_TEMPLATES: true, ALLOWED_ATTR: [] })
    for (let key in feed) if (key !== 'articles') feed[key] = DOMPurify.sanitize(feed[key]).trim()
    feed['date'] = moment(feed['date']).format('dddd, MMMM Do YYYY')
    if (feed['date'] === 'Invalid date') feed['date'] = null
    feed['filters'] = ['all']
    feed['internalUrl'] = feed['title'].toLowerCase().replace(/[^a-z]/g, '-')
    feed['rssUrl'] = url
    feed['userCategories'] = categories
    // debug(`Feed Data: ${JSON.stringify(feed)}`)
    resolve(feed)
  })
})
