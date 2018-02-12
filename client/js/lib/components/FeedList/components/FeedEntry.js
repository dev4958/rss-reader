'use strict'

// NPM Modules
import React from 'react'
import { Link } from 'react-router-dom'

class FeedEntry extends React.Component {
  render() {
    let { title, description, date, internalUrl } = this.props
    return (
      <li className={'feed-container'}>
        <section className={'feed-entry'}>
          <header className={'feed-header'}>
            <h2><Link to={`/feed/${internalUrl}`}>{title}</Link></h2>
          </header>
          <p>{description}</p>
          {date ? <p>{date}</p> : ''}
        </section>
      </li>
    )
  }
}

export default FeedEntry
