'use strict'

import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class FilterLink extends React.Component {
    render() {
      let { filter, children, match } = this.props
      return (
        <Link to={filter === 'All' ? '' : `/filter/${filter}`} className={'filter-link'}>{children}</Link>
      )
    }
}

export default withRouter(FilterLink)
