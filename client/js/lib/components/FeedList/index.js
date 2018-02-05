'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import ActionMenu from '../ActionMenu/'
import FilterLink from './components/FilterLink'
import FeedEntry from './components/FeedEntry'

class FeedList extends React.Component {
  constructor(props) {
    super(props)
    let userCategories = null
    if (props.match.params.hasOwnProperty('filter')) {
      userCategories = props.match.params.filter
    } else {
      userCategories = props.feeds.map((feed, i) => feed.userCategories)
      if (userCategories.length) userCategories = userCategories.reduce((a, b) => a ? a.concat(b) : b ? b : a : b)
    }
    userCategories = userCategories === null ? [] : Array.isArray(userCategories) ? userCategories.filter(c => c) : [userCategories]
    this.state = {
      feeds: props.feeds.slice(),
      filteredFeeds: props.match.params.filter ? filterElements(props.feeds.slice(), [props.match.params.filter]) : props.feeds.slice(),
      userCategories: props.match.params.filter ? userCategories : userCategories.length ? userCategories.filter((e, i, a) => a && a.indexOf(e) === i).map(c => (<FilterLink filter={c}>{c}</FilterLink>)) : []
    }
  }
  componentWillReceiveProps(nextProps) {
    let params = nextProps.match.params, userCategories = nextProps.feeds.map((feed, i) => feed.userCategories)
    if (userCategories.length > 1) userCategories = userCategories.reduce((a, b) => a ? a.concat(b) : b ? b : a : b)
    userCategories = userCategories === null ? [] : Array.isArray(userCategories) ? userCategories.filter(c => c) : [userCategories]
    this.setState({
      feeds: nextProps.feeds,
      filteredFeeds: params.filter ? filterElements(nextProps.feeds.slice(), [params.filter]) : nextProps.feeds.slice(),
      userCategories: userCategories ? userCategories.filter((e, i, a) => a && a.indexOf(e) === i).map((c, i) => (<FilterLink filter={c}>{c}</FilterLink>)) : []
    })
  }
  render() {
    let feeds = this.state.filteredFeeds.map((feed, i) => (<FeedEntry key={i} {...feed} />)), userCategories = this.state.userCategories, { match } = this.props
    if (userCategories.length === 1 && /\/filter\//.test(match.url)) userCategories = (<h1 className={'feed-filter-header'}>{userCategories}</h1>)
    return (
      <main>
        <section className={'interface feed-list-interface'}>
          <ActionMenu feeds={feeds} />
          <section>
            <section className={'feed-filters-container'}>{userCategories}</section>
            <ul>{feeds}</ul>
          </section>
        </section>
      </main>
    )
  }
}

export default withRouter(connect()(FeedList))

// Helper Functions
const filterElements = (elements = [], filters = null) => {
  if (!filters.includes('all')) return elements.filter(e => e.hasOwnProperty('userCategories') && e.userCategories ? e.userCategories.some(c => filters.includes(c)) : false)
  return elements
}
