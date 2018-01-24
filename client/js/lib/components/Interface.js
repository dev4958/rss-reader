'use strict'

//NPM Modules
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//Components
import FeedContainer from '../containers/FeedContainer'
import FeedEntriesContainer from '../containers/FeedEntriesContainer'
import UpdateFeeds from '../containers/UpdateFeeds'
import EditFeedsLink from './EditFeedsLink'
import EditFeedsContainer from '../containers/EditFeedsContainer'
import FeedEntriesLink from './FeedEntriesLink'

//Actions
import { updateFeeds } from '../actions'

class Interface extends React.Component {
  render() {
    return (
      <main>
        <section className={'interface'}>
          <section className={'action-menu'}>
            <FeedEntriesLink />
            <UpdateFeeds />
            <EditFeedsLink />
          </section>
          <FeedEntriesContainer />
          <FeedContainer />
          <EditFeedsContainer />
        </section>
      </main>
    )
  }
}
export default connect()(withRouter(Interface))
