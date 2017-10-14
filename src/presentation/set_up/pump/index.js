import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  pushAcidRequest,
  testAcidDropRequest,
  pushBaseRequest,
  testBaseDropRequest
} from '../../../redux/calibration/pump/actions'
import {
  selectFetchingStatus
} from '../../../redux/calibration/pump/selector'

import PumpCalibrationPresenter from './presenter'

class CalibrationHome extends Component {
  render () {
    return (
      <PumpCalibrationPresenter
        fetching={this.props.fetching}
        error={this.props.error}

        onPushAcidPump={this.props.pushAcidRequest}
        onTestAcidDrop={this.props.testAcidDropRequest}
        onPushBasePump={this.props.pushBaseRequest}
        onTestBaseDrop={this.props.testBaseDropRequest}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...selectFetchingStatus(state)
})

const mapDispatchToProps = dispatch => ({
  pushAcidRequest: () => dispatch(pushAcidRequest()),
  testAcidDropRequest: () => dispatch(testAcidDropRequest()),
  pushBaseRequest: () => dispatch(pushBaseRequest()),
  testBaseDropRequest: () => dispatch(testBaseDropRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(CalibrationHome)
