'use strict'

// NPM Modules
import React from 'react'

class Article extends React.Component {
  render() {
    let { title, description, link } = this.props
    return (
      <li className={'entry-container'}>
        <article className={'entry'}>
          <header className={'entry-header'}>
            <a href={link} target={'_blank'}><h3>{title}</h3></a>
          </header>
          {description ? <p>{description}</p> : ''}
        </article>
      </li>
    )
  }
}

export default Article
