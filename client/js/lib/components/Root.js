'use strict'

// NPM Modules
import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom'
import Modernizr from 'modernizr'

// Components
import EditFeedsContainer from '../containers/EditFeedsContainer'
import FeedContainer from '../containers/FeedContainer'
import FeedListContainer from '../containers/FeedListContainer'

class Root extends React.Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store} key='provider'>
        <Router>
          <section>
            <Route exact path='/' component={FeedListContainer} />
            <Route path='/filter/:filter' component={FeedListContainer} />
            <Route path='/feed/:feed' component={FeedContainer} />
            <Route path='/edit-feeds' component={EditFeedsContainer} />
          </section>
        </Router>
      </Provider>
    )
  }
}

export default connect()(Root)
