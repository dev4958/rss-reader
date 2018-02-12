'use strict'

// NPM Modules
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import UpdateFeeds from './containers/UpdateFeeds'
import EditFeedsLink from './components/EditFeedsLink'
import FeedEntriesLink from './components/FeedEntriesLink'

// Images
import Loader from './components/Loader'

// Actions
import { updateBrowserHistory } from '../../actions'

class ActionMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      removeHistoryEventListener: null
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    if (window.onpopstate === null) window.onpopstate = () => {
      dispatch(updateBrowserHistory(document.location.pathname))
      window.scrollTop = 0
    }
    if (this.state.removeHistoryEventListener === null) this.setState({
      removeHistoryEventListener: this.props.history.listen((location, action) => {
        dispatch(updateBrowserHistory(document.location.pathname))
        window.scrollTop = 0
      })
    })
  }
  componentWillUnmount() {
    this.state.removeHistoryEventListener()
  }
  render() {
    let { feeds, applicationState, match } = this.props
    return (
      <section className={'action-menu'}>
        {this.props.match.url !== '/' ? (<FeedEntriesLink />) : ''}
        <Loader applicationState={applicationState} />
        {feeds.length ? (<UpdateFeeds />) : ''}
        {match.url !== '/edit-feeds' ? (<EditFeedsLink />) : ''}
      </section>
    )
  }
}

export default connect()(withRouter(ActionMenu))
