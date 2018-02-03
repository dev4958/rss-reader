'use strict'

// NPM Modules
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import EditFeedEntry from '../containers/EditFeedEntry'
import AddFeedEntry from '../containers/AddFeedEntry'

class EditFeedsForm extends React.Component {
  render() {
    if (this.props.match.url !== '/edit-feeds') return ('')
    let { feeds } = this.props
    feeds = feeds.map((feed, i) => (<EditFeedEntry key={i} {...feed} />))
    return (
      <section className={'edit-feeds-form'}>
        <ul>
          <AddFeedEntry />
          {feeds}
        </ul>
      </section>
    )
  }
}

export default connect()(withRouter(EditFeedsForm))
