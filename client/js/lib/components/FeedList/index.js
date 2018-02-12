'use strict'

// NPM Modules
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
    this.state = {
      feeds: props.feeds.slice(),
      filteredFeeds: props.match.params.filter ? filterElements(props.feeds.slice(), [props.match.params.filter]) : props.feeds.slice(),
      userCategories: getUserCategories(props)
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      feeds: nextProps.feeds,
      filteredFeeds: nextProps.match.params.filter ? filterElements(nextProps.feeds.slice(), [nextProps.match.params.filter]) : nextProps.feeds.slice(),
      userCategories: getUserCategories(nextProps)
    })
  }
  render() {
    let feeds = this.state.filteredFeeds.map((feed, i) => (<FeedEntry key={i} {...feed} />)), userCategories = this.state.userCategories, { match, applicationState } = this.props
    if (userCategories.length === 1 && /\/filter\//.test(match.url)) userCategories = (<h1 className={'feed-filter-header'}>{userCategories}</h1>)
    return (
      <main>
        <section className={'interface feed-list-interface'}>
          <ActionMenu feeds={feeds} applicationState={applicationState} />
          <section>
            <section className={'feed-filters-container'}>{userCategories}</section>
            <ul>{feeds}</ul>
          </section>
        </section>
      </main>
    )
  }
}

export default connect()(withRouter(FeedList))

// Helper Functions
const getUserCategories = (props = null, userCategories = []) => {
  if (props === null) return []
  userCategories = props.match.params.hasOwnProperty('filter') ? props.match.params.filter : props.feeds.map((feed, i) => feed.userCategories).reduce((a, b) => a ? a.concat(b) : b ? b : a)
  if (userCategories === null) userCategories = []
  userCategories = Array.isArray(userCategories) ? userCategories.filter(c => c).filter((e, i, a) => a && a.indexOf(e) === i) : [userCategories]
  if (props.match.params.hasOwnProperty('filter')) return userCategories
  if (userCategories.length) return userCategories.map(c => (<FilterLink filter={c}>{c}</FilterLink>))
  return []
}

const filterElements = (elements = [], filters = null) => {
  if (!filters.includes('all')) return elements.filter(e => e.hasOwnProperty('userCategories') && e.userCategories ? e.userCategories.some(c => filters.includes(c)) : false)
  return elements
}
