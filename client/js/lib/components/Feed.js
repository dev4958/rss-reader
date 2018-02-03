'use strict'

//NPM Modules
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import Entry from './Entry'

class Feed extends React.Component {
  render() {
    const { match, feeds } = this.props
    if (!/^\/feed\//.test(match.url)) return ('')
    let feed = null
    for (let i = 0; i < feeds.length; i++) if (feeds[i].internalUrl === match.params.feed) {
      feed = feeds[i]
      break
    }
    let { articles, title, description, date, link, author, language, favicon, copyright, image, categories } = feed
    articles = articles.map((article, i) => <Entry key={i} {...article} />)
    return (
      <li className={'feed-container'}>
        <section className={'feed'}>
          <header className={'feed-header'}>
            <a href={link} target={'_blank'}><h2>{title}</h2></a>
            <p>{description}</p>
            {date ? <p>{date}</p> : ''}
          </header>
          <ul>
            {articles}
          </ul>
        </section>
      </li>
    )
  }
}

export default connect()(withRouter(Feed))
