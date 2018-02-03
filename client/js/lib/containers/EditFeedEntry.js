'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { updateFeedEntry, deleteFeedEntry } from '../actions'

class EditFeedEntry extends React.Component {
  render() {
    let { title, rssUrl, userCategories, dispatch } = this.props
    return (
      <li className={'edit-feed-entry-form'}>
        <header className={'edit-feed-entry-header'}>
          <button className={'remove-feed-entry-button'} onClick={_ => dispatch(deleteFeedEntry(rssUrl))}>Delete</button>
          <span>{title}</span>
        </header>
        <section>
          <button className={'update-feed-entry-button'} onClick={_ => dispatch(updateFeedEntry({ url: rssUrl, categories: this.categories.value }))}>Update Feed Categories</button>
          <input name={'feed-categories'} type={'text'} ref={c => this.categories = c} defaultValue={userCategories.join(', ')} />
        </section>
      </li>
    )
  }
}

export default connect()(EditFeedEntry)
