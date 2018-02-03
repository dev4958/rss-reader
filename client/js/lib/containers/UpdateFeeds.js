'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { updateFeeds } from '../actions'

class UpdateFeeds extends React.Component {
  render() {
    let { dispatch } = this.props
    return (
      <button className={'update-feeds action-menu-item'}  onClick={_ => dispatch(updateFeeds())}>Update Feeds</button>
    )
  }
}

export default connect()(UpdateFeeds)
