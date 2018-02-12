'use strict'

// NPM Modules
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  const feeds = state.feeds, browserHistory = state.browserHistory, applicationHistory = state.applicationHistory, applicationState = state.applicationState
  return ({ feeds, browserHistory, applicationHistory, applicationState, feedFilters: ownProps.feedFilters })
}

export default (component) => connect(mapStateToProps, null)(component)
