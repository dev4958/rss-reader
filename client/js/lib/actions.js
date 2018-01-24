'use strict'

import * as request from 'superagent'

export const updateFeeds = _ => dispatch => {
  dispatch(({ type: 'FETCHING_FEEDS' }))
  request.get('http://localhost:4000/api/feeds').end((e, res) => e ? console.error(e) : dispatch(({ type: 'UPDATE_FEEDS', payload: res.body })))
}

export const deleteFeedEntry = url => dispatch => {
  dispatch(({ type: 'DELETING_FEED_ENTRY', payload: url }))
  request.delete('http://localhost:4000/api/delete').send({ url }).end((e, res) => e ? console.error(e) : dispatch(({ type: 'DELETED_FEED_ENTRY', payload: url })))
}

export const updateFeedEntry = feedEntry => dispatch => {
  dispatch(({ type: 'UPDATING_FEED_ENTRY', payload: feedEntry }))
  request.put('http://localhost:4000/api/update').send(feedEntry).end((e, res) => e ? console.error(e) : dispatch(({ type: 'UPDATED_FEED_ENTRY', payload: res.body })))
}

export const addFeedEntry = feedEntry => dispatch => {
  dispatch(({ type: 'ADDING_FEED_ENTRY', payload: feedEntry }))
  request.post('http://localhost:4000/api/add').send(feedEntry).end((e, res) => e ? console.error(e) : dispatch(({ type: 'ADDED_FEED_ENTRY', payload: res.body })))
}
