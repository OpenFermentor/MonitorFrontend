import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectRunningRoutine,
  selectRunningRoutineLastValue,
  selectRunningRoutineTemperatureTimeline
} from '../../core/redux/routine/selector'
import {
  selectSensorsLastValue,
  selectSensorsTemperatureTimeline
} from '../../core/redux/sensors/selector'
import {
  stopRunningRoutineRequest
} from '../../core/redux/routine/actions'

import DashboardComponent from './dashboard_component'

class DashboardContainer extends Component {
  render () {
    return (
      <DashboardComponent
        routine={this.props.routine}
        lastValue={this.props.lastValue}
        temperatureTimeline={this.props.temperatureTimeline}
        onPressSelectRoutine={() => this.props.history.push('/routines/select')}
        onRoutineStop={this.props.requestRoutineStop}
      />
    )
  }
}

const mapStateToProps = state => {
  const routine = selectRunningRoutine(state)
  if (routine) {
    return {
      routine,
      lastValue: selectRunningRoutineLastValue(state),
      temperatureTimeline: selectRunningRoutineTemperatureTimeline(state)
    }
  } else {
    return {
      lastValue: selectSensorsLastValue(state),
      temperatureTimeline: selectSensorsTemperatureTimeline(state)
    }
  }
}

const mapDispatchToProps = dispatch => ({
  requestRoutineStop: () => dispatch(stopRunningRoutineRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
