'use strict'

// NPM Modules
import { connect } from 'react-redux'

// Components
import FeedEntries from '../components/FeedEntries'

const mapStateToProps = (state, ownProps) => {
  const feeds = state.feeds
  return ({ feeds })
}

const FeedEntriesContainer = connect(mapStateToProps, null)(FeedEntries)
export default FeedEntriesContainer
