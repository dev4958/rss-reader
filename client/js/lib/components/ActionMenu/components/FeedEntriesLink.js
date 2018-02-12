'use strict'

// NPM Modules
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class FeedEntriesLink extends React.Component {
  render() {
    return (<Link to={'/'}><button className={'feed-entries-link action-menu-item'}>Feeds</button></Link>)
  }
}

export default connect()(withRouter(FeedEntriesLink))
