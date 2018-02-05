'use strict'

// NPM Modules
import { connect } from 'react-redux'

// Components
import FeedList from '../components/FeedList/'

const mapStateToProps = (state, ownProps) => {
  const feeds = state.feeds
  return ({ feeds })
}

const FeedEntriesContainer = connect(mapStateToProps, null)(FeedList)
export default FeedEntriesContainer
