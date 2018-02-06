'use strict'

// NPM Modules
import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Modernizr from 'modernizr'

// Components
import InterfaceContainer from './InterfaceContainer'
import EditFeedsFormComponent from './EditFeedsForm/'
import FeedListComponent from './FeedList/'
import FeedComponent from './Feed/'

const EditFeedsForm = InterfaceContainer(EditFeedsFormComponent)
const FeedList = InterfaceContainer(FeedListComponent)
const Feed = InterfaceContainer(FeedComponent)

class Root extends React.Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store} key='provider'>
        <Router>
          <section>
            <Route exact path='/' component={FeedList} />
            <Route path='/filter/:filter' component={FeedList} />
            <Route path='/feed/:feed' component={Feed} />
            <Route path='/edit-feeds' component={EditFeedsForm} />
          </section>
        </Router>
      </Provider>
    )
  }
}

export default connect()(Root)
