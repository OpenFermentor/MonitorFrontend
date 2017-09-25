import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  startPhMeterCalibration,
  finishPhMeterCalibration,
  startCalibration
} from '../../../redux/calibration/ph/actions'
import {
  selectActionStatus
} from '../../../redux/calibration/ph/selector'

import PhCalibrationPresenter from './presenter'

class PhCalibration extends Component {
  componentWillMount () {
    this.props.startPhMeterCalibration()
  }

  onCancel () {
    this.props.finishPhMeterCalibration()
    this.props.history.replace('/')
  }

  render () {
    return (
      <PhCalibrationPresenter
        inProgress={this.props.inProgress}
        error={this.props.error}
        finished={this.props.finished}
        currentValue={this.props.currentValue}

        onCancel={this.onCancel.bind(this)}
        onStartCalibration={this.props.startCalibration}
        onFinish={() => this.props.history.replace('/')}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...selectActionStatus(state)
})

const mapDispatchToProps = dispatch => ({
  startPhMeterCalibration: () => dispatch(startPhMeterCalibration()),
  finishPhMeterCalibration: () => dispatch(finishPhMeterCalibration()),
  startCalibration: () => dispatch(startCalibration())
})

export default connect(mapStateToProps, mapDispatchToProps)(PhCalibration)
