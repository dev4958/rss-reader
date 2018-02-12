'use strict'

// NPM Modules
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class EditFeedsLink extends React.Component {
  render() {
    return (<Link to={'/edit-feeds'}><button className={'edit-feeds-link action-menu-item'}>Edit Feeds</button></Link>)
  }
}

export default connect()(withRouter(EditFeedsLink))
