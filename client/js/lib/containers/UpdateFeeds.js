'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { updateFeeds } from '../actions'

let UpdateFeeds = ({ dispatch }) => {
  return (
    <button className={'update-feeds action-menu-item'} onClick={_ => dispatch(updateFeeds())}>Update Feeds</button>
  )
}
UpdateFeeds = connect()(UpdateFeeds)

export default UpdateFeeds
