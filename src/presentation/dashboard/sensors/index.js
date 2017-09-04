import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  selectSensorsLastValue,
  selectSensorsTimeline
} from '../../../core/redux/sensors/selector'
import {
  stopRunningRoutineRequest
} from '../../../core/redux/routine/actions'

import SensorsDashboardPresenter from './presenter'

class SensorsDashboard extends Component {
  render () {
    return (
      <SensorsDashboardPresenter
        lastValue={this.props.lastValue}
        timeline={this.props.timeline}
        onRoutineStop={this.props.requestRoutineStop}
        onNavigateToExperiments={() => this.props.history.push('/routines')}
      />
    )
  }
}

const mapStateToProps = state => ({
  lastValue: selectSensorsLastValue(state),
  timeline: selectSensorsTimeline(state)
})

const mapDispatchToProps = dispatch => ({
  requestRoutineStop: () => dispatch(stopRunningRoutineRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SensorsDashboard))
