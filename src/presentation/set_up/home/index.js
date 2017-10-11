import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  restartRequest
} from '../../../redux/system/actions'
import {
  selectFetchingStatus
} from '../../../redux/system/selector'

import SetUpHomePresenter from './presenter'

class SetUpHome extends Component {
  render () {
    return (
      <SetUpHomePresenter
        onReconnectSensors={this.props.restartRequest}
        fetching={this.props.fetching}
        error={this.props.error}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    ...selectFetchingStatus(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    restartRequest: () => dispatch(restartRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetUpHome)
