'use strict'

// NPM Modules
import React from 'react'
import { connect } from 'react-redux'

// Actions
import { addFeedEntry } from '../../../actions'

class EditFeedEntry extends React.Component {
  render() {
    let { dispatch, feeds } = this.props
    return (
      <li className={'add-feed-entry-form'}>
        <button className={'add-feed-entry-button'} onClick={_ => {
          dispatch(addFeedEntry({ url: this.url.value, categories: this.categories.value !== '' ? this.categories.value : null, feeds: feeds }))
          this.url.value = ''
          this.categories.value = ''
        }}>Add Feed</button>
        <section>
          <input name={'feed-url'} type={'text'} ref={c => this.url = c} placeholder={'Feed URL.'}/>
        </section>
        <section>
          <input name={'feed-categories'} type={'text'} ref={c => this.categories = c} placeholder={'Feed categories, separated by commas.'}/>
        </section>
      </li>
    )
  }
}

export default connect()(EditFeedEntry)
