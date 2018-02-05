'use strict'

// NPM Modules
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class FeedEntriesLink extends React.Component {
  render() {
    if (this.props.match.url === '/') return ('')
    return (<Link to={'/'} activeStyle={{textDecoration: 'none'}}><button className={'feed-entries-link action-menu-item'}>Feeds</button></Link>)
  }
}

export default connect()(withRouter(FeedEntriesLink))
