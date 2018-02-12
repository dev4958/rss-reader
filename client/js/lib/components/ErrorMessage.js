'use strict'

// NPM Modules
import React from 'react'
import { connect } from 'react-redux'

class ErrorMessage extends React.Component {
  render() {
    let { applicationState, id } = this.props, idReference = id.replace(/-/g, '')
    return (
      <p id={id} className={'error-message'} style={{ opacity: applicationState.errors.includes(id) ? 1 : 0 }}>{applicationState.errorMessages.hasOwnProperty(idReference) ? applicationState.errorMessages[idReference] : 'ERROR MESSAGE DEFAULT TEXT'}</p>
    )
  }
}

export default connect()(ErrorMessage)
