'use strict'

// NPM Modules
import { connect } from 'react-redux'

// Components
import Feed from '../components/Feed'

const mapStateToProps = (state, ownProps) => {
  const feeds = state.feeds ? filterFeedsAndArticles(state.feeds, ownProps.feedFilters, ownProps.articleFilters) : []
  return ({
    feeds,
    feedFilters: ownProps.feedFilters,
    articleFilters: ownProps.articleFilters
  })
}

const FeedContainer = connect(mapStateToProps, null)(Feed)
export default FeedContainer

// Helper Functions
const filterFeedsAndArticles = (feeds = [], feedFilters = null, articleFilters = null) => {
  if (Array.isArray(feedFilters)) feeds = filterElements(feeds, feedFilters)
  if (Array.isArray(articleFilters)) feeds = feeds.map(f => {
    f.articles = filterElements(f.articles, articleFilters)
    return f
  })
  return feeds
}

const filterElements = (elements = [], filters = null) => filters ? elements.filter(e => e.hasOwnProperty('filters') ? e.filters.some(f => filters.includes(f)) : false) : elements
