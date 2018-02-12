'use strict'

// NPM Modules
import React from 'react'
import { Link } from 'react-router-dom'

class FilterLink extends React.Component {
    render() {
      let { filter, children } = this.props
      return (<Link to={filter === 'All' ? '' : `/filter/${filter}`} className={'filter-link'}>{children}</Link>)
    }
}

export default FilterLink
