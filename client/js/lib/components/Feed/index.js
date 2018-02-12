'use strict'

// NPM Modules
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import ActionMenu from '../ActionMenu/'
import Article from './components/Article'

class Feed extends React.Component {
  render() {
    const { match, feeds, applicationState } = this.props
    let feed = null
    for (let i = 0; i < feeds.length; i++) if (feeds[i].internalUrl === match.params.feed) {
      feed = feeds[i]
      break
    }
    let { articles, title, description, date, link } = feed
    articles = articles.map((article, i) => <Article key={i} {...article} />)
    return (
      <main>
        <section className={'interface feed-interface'}>
          <ActionMenu feeds={feeds} applicationState={applicationState} />
          <section className={'feed-container'}>
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
          </section>
        </section>
      </main>
    )
  }
}

export default connect()(withRouter(Feed))
