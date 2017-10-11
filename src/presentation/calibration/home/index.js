import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  restartRequest
} from '../../../redux/system/actions'
import {
  selectFetchingStatus
} from '../../../redux/system/selector'

import CalibrationHomePresenter from './presenter'

class CalibrationHome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitted: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.fetching && !newProps.fetching) {
      this.setState({ submitted: !newProps.error })
    }
  }

  onReconnectSensors () {
    if (this.props.fetching) {
      return
    }
    this.props.restartRequest()
    this.setState({ submitting: true, submitted: false })
  }

  render () {
    return (
      <CalibrationHomePresenter
        onReconnectSensors={this.onReconnectSensors.bind(this)}
        fetching={this.props.fetching}
        error={this.props.error}
        submitted={this.state.submitted}
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

export default connect(mapStateToProps, mapDispatchToProps)(CalibrationHome)
