'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Feed from './Feed'
import FeedEntry from './FeedEntry'
import FilterLink from './FilterLink'

class FeedEntries extends React.Component {
  constructor(props) {
    super(props)
    let userCategories = null
    if (props.match.params.hasOwnProperty('filter')) {
      userCategories = props.match.params.filter
    } else {
      userCategories = props.feeds.map((feed, i) => feed.userCategories)
      if (userCategories.length) userCategories = userCategories.reduce((a, b) => a.concat(b))
    }
    this.state = {
      feeds: props.feeds.slice(),
      filteredFeeds: props.match.params.filter ? filterElements(props.feeds.slice(), [props.match.params.filter]) : props.feeds.slice(),
      userCategories: props.match.params.filter ? userCategories : userCategories.length ? userCategories.filter((e, i, a) => a.indexOf(e) === i).map(c => (<FilterLink filter={c}>{c}</FilterLink>)) : []
    }
  }
  componentWillReceiveProps(nextProps) {
    let params = nextProps.match.params, userCategories = nextProps.feeds.map((feed, i) => feed.userCategories)
    if (userCategories.length > 1) userCategories = userCategories.reduce((a, b) => a.concat(b))
    this.setState({
      feeds: nextProps.feeds,
      filteredFeeds: params.filter ? filterElements(nextProps.feeds.slice(), [params.filter]) : nextProps.feeds.slice(),
      userCategories: userCategories.filter((e, i, a) => a.indexOf(e) === i).map((c, i) => (<FilterLink filter={c}>{c}</FilterLink>))
    })
  }
  render() {
    if (/^\/edit-feeds/.test(this.props.match.url)) return ('')
    let feeds = this.state.filteredFeeds.map((feed, i) => (<FeedEntry key={i} {...feed} />))
    return (
      <section>
        <section className={'feed-filters-container'}>{this.state.userCategories}</section>
        <ul>{feeds}</ul>
      </section>
    )
  }
}

export default withRouter(connect()(FeedEntries))

// Helper Functions
const filterElements = (elements = [], filters = null) => {
  if (!filters.includes('all')) return elements.filter(e => e.hasOwnProperty('userCategories') && e.userCategories.some(c => filters.includes(c)))
  return elements
}
