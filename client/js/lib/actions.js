'use strict'

import * as request from 'superagent'

export const updateFeeds = _ => dispatch => {
  dispatch(({ type: 'APPLICATION_LOADING' }))
  dispatch(({ type: 'FETCHING_FEEDS' }))
  request.get('http://localhost:4000/api/feeds').end((e, res) => {
    if (e) return console.error(e)
    dispatch(({ type: 'UPDATE_FEEDS', payload: res.body }))
    dispatch(({ type: 'APPLICATION_LOADED' }))
  })
}

export const deleteFeedEntry = url => dispatch => {
  dispatch(({ type: 'APPLICATION_LOADING' }))
  dispatch(({ type: 'DELETING_FEED_ENTRY', payload: url }))
  request.delete('http://localhost:4000/api/delete').send({ url }).end((e, res) => {
    if (e) return console.error(e)
    dispatch(({ type: 'DELETED_FEED_ENTRY', payload: url }))
    dispatch(({ type: 'APPLICATION_LOADED' }))
  })
}

export const updateFeedEntry = feedEntry => dispatch => {
  dispatch(({ type: 'APPLICATION_LOADING' }))
  dispatch(({ type: 'UPDATING_FEED_ENTRY', payload: feedEntry }))
  request.put('http://localhost:4000/api/update').send(feedEntry).end((e, res) => {
    if (e) return console.error(e)
    dispatch(({ type: 'UPDATED_FEED_ENTRY', payload: res.body }))
    dispatch(({ type: 'APPLICATION_LOADED' }))
  })
}

export const addFeedEntry = feedEntry => dispatch => {
  if (feedEntry['url'] !== '' && !feedEntry['feeds'].filter(f => f['rssUrl'] === feedEntry['url']).length) {
    dispatch(({ type: 'APPLICATION_LOADING' }))
    dispatch(({ type: 'ADDING_FEED_ENTRY', payload: feedEntry }))
    request.post('http://localhost:4000/api/add').send(feedEntry).end((e, res) => {
      if (e) return console.error(e)
      dispatch(({ type: 'ADDED_FEED_ENTRY', payload: res.body }))
      dispatch(({ type: 'APPLICATION_LOADED' }))
    })
  } else {
    let errorMessage = null
    if (feedEntry['url'] === '') errorMessage = 'Error, you must specify the URL of the RSS feed.'
    if (feedEntry['feeds'].filter(f => f['rssUrl'] === feedEntry['url']).length) errorMessage = `Error, you must specify a new feed.  The feed you're attempting to add is already in your feed list.`
    dispatch(({ type: 'ADD_APPLICATION_ERROR_MESSAGE', payload: { errorClass: 'edit-feeds-error', errorMessage } }))
    setTimeout(() => {
      dispatch(({ type: 'REMOVE_APPLICATION_ERROR_MESSAGE', payload: { errorClass: 'edit-feeds-error', errorMessage } }))
    }, 3000)
    dispatch(({ type: 'ERROR_ADDING_FEED_ENTRY', payload: feedEntry }))
    dispatch(({ type: 'APPLICATION_LOADED' }))
  }
}

export const updateBrowserHistory = location => dispatch => dispatch({ type: 'UPDATE_BROWSER_HISTORY', payload: location })

export const updateApplicationState = (actionType, state) => dispatch => dispatch({ type: 'UPDATE_APPLICATION_STATE', payload: { actionType, state } })
