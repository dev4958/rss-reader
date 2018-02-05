'use strict'

// NPM Modules
import React from 'react'
import { connect } from 'react-redux'

// Actions
import { updateFeedEntry, deleteFeedEntry } from '../../../actions'

class EditFeedEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.feed.userCategories ? this.props.feed.userCategories.join(', ') : '' }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.feed.userCategories ? nextProps.feed.userCategories.join(', ') : '' })
  }
  render() {
    let { feed, dispatch, update } = this.props, { title, rssUrl } = feed, input = (<input name={'feed-categories'} type={'text'} placeholder={'Feed categories, separated by commas.'} value={this.state.value} ref={c => this.categories = c} onChange={this.handleChange} />)
    return (
      <li className={'edit-feed-entry-form'}>
        <header className={'edit-feed-entry-header'}>
          <button className={'remove-feed-entry-button'} onClick={_ => dispatch(deleteFeedEntry(rssUrl))}>Delete</button>
          <span>{title}</span>
        </header>
        <section>
          <button className={'update-feed-entry-button'} onClick={_ => dispatch(updateFeedEntry({ url: rssUrl, categories: this.categories.value }))}>Update Feed Categories</button>
          {input}
        </section>
      </li>
    )
  }
}

export default connect()(EditFeedEntry)
