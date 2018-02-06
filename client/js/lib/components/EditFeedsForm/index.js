'use strict'

// NPM Modules
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import ActionMenu from '../ActionMenu/'
import EditFeedEntry from './containers/EditFeedEntry'
import AddFeedEntry from './containers/AddFeedEntry'

class EditFeedsForm extends React.Component {
  render() {
    let { feeds, browserHistory } = this.props
    return (
      <main>
        <section className={'interface edit-feeds-interface'}>
          <ActionMenu feeds={feeds} />
          <section className={'edit-feeds-form'}>
            <p id={'edit-feeds-error'}>Edit feeds form error message.</p>
            <ul>
              <AddFeedEntry feeds={feeds} />
              {feeds.map((feed, i) => (<EditFeedEntry key={i} feed={feed} />))}
            </ul>
          </section>
        </section>
      </main>
    )
  }
}

export default connect()(withRouter(EditFeedsForm))
