'use strict'

import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom'
import Interface from './Interface'

class Root extends React.Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store} key='provider'>
        <Router>
          <section>
            <Route exact path='/' component={Interface} />
            <Route path='/filter/:filter' component={Interface} />
            <Route path='/feed/:feed' component={Interface} />
            <Route path='/edit-feeds' component={Interface} />
          </section>
        </Router>
      </Provider>
    )
  }
}

export default connect()(Root)
