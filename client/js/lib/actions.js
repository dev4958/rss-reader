'use strict'

import * as request from 'superagent'

export const updateFeeds = _ => dispatch => {
  document.getElementById('loader-icon').style.opacity = 1
  dispatch(({ type: 'FETCHING_FEEDS' }))
  request.get('http://localhost:4000/api/feeds').end((e, res) => {
    if (e) return console.error(e)
    dispatch(({ type: 'UPDATE_FEEDS', payload: res.body }))
    document.getElementById('loader-icon').style.opacity = 0
  })
}

export const deleteFeedEntry = url => dispatch => {
  document.getElementById('loader-icon').style.opacity = 1
  dispatch(({ type: 'DELETING_FEED_ENTRY', payload: url }))
  request.delete('http://localhost:4000/api/delete').send({ url }).end((e, res) => {
    if (e) return console.error(e)
    dispatch(({ type: 'DELETED_FEED_ENTRY', payload: url }))
    document.getElementById('loader-icon').style.opacity = 0
  })
}

export const updateFeedEntry = feedEntry => dispatch => {
  document.getElementById('loader-icon').style.opacity = 1
  dispatch(({ type: 'UPDATING_FEED_ENTRY', payload: feedEntry }))
  request.put('http://localhost:4000/api/update').send(feedEntry).end((e, res) => {
    if (e) return console.error(e)
    dispatch(({ type: 'UPDATED_FEED_ENTRY', payload: res.body }))
    document.getElementById('loader-icon').style.opacity = 0
  })
}

export const addFeedEntry = feedEntry => dispatch => {
  if (feedEntry['url'] !== '' && !feedEntry['feeds'].filter(f => f['rssUrl'] === feedEntry['url']).length) {
    document.getElementById('loader-icon').style.opacity = 1
    dispatch(({ type: 'ADDING_FEED_ENTRY', payload: feedEntry }))
    request.post('http://localhost:4000/api/add').send(feedEntry).end((e, res) => {
      if (e) return console.error(e)
      dispatch(({ type: 'ADDED_FEED_ENTRY', payload: res.body }))
      document.getElementById('loader-icon').style.opacity = 0
    })
  } else {
    if (feedEntry['url'] === '') document.getElementById('edit-feeds-error').innerHTML = 'Error, you must specify the URL of the RSS feed.'
    if (feedEntry['feeds'].filter(f => f['rssUrl'] === feedEntry['url']).length) document.getElementById('edit-feeds-error').innerHTML = `Error, you must specify a new feed.  The feed you're attempting to add is already in your feed list.`
    document.getElementById('edit-feeds-error').style.opacity = 1
    setTimeout(() => {
      document.getElementById('edit-feeds-error').style.opacity = 0
    }, 3000)
    dispatch(({ type: 'ERROR_ADDING_FEED_ENTRY', payload: feedEntry }))
  }
}
