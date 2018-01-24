'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { addFeedEntry } from '../actions'

class EditFeedEntry extends React.Component {
  render() {
    let { dispatch } = this.props
    return (
      <li className={'add-feed-entry-form'}>
        <button className={'add-feed-entry-button'} onClick={_ => {
          dispatch(addFeedEntry({ url: this.url.value, categories: this.categories.value }))
          this.url.value = ''
          this.categories.value = ''
        }}>Add Feed</button>
        <input name={'feed-url'} type={'text'} ref={c => this.url = c} placeholder={'Feed URL.'}/>
        <input name={'feed-categories'} type={'text'} ref={c => this.categories = c} placeholder={'Feed categories, separated by commas.'}/>
      </li>
    )
  }
}

export default connect()(EditFeedEntry)
