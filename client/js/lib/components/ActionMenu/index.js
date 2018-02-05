'use strict'

// NPM Modules

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import UpdateFeeds from './containers/UpdateFeeds'
import EditFeedsLink from './components/EditFeedsLink'
import FeedEntriesLink from './components/FeedEntriesLink'

// Images
import Loader from '../../../../assets/images/loader.svg'

class ActionMenu extends React.Component {
  render() {
    let { feeds } = this.props
    return (
      <section className={'action-menu'} >
        <FeedEntriesLink />
        <Loader id={'loader-icon'} className={''} />
        {feeds.length ? (<UpdateFeeds />) : ''}
        <EditFeedsLink />
      </section>
    )
  }
}

export default connect()(withRouter(ActionMenu))
