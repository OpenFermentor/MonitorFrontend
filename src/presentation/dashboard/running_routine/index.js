import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  selectRunningRoutineTitle
} from '../../../core/redux/routine/selector'
import {
  selectRunningRoutineTemperatureTimeline,
  selectRunningRoutineCurrentValue
} from '../../../core/redux/reading/selector'
import {
  stopRunningRoutineRequest
} from '../../../core/redux/routine/actions'

import RunningRoutineDashboardPresenter from './presenter'

class RunningRoutineDashboard extends Component {
  render () {
    return (
      <RunningRoutineDashboardPresenter
        routineTitle={this.props.routineTitle}
        currentValue={this.props.currentValue || {}}
        temperatureTimeline={this.props.temperatureTimeline}
        onPressSelectRoutine={() => this.props.history.push('/routines/select')}
        onRoutineStop={this.props.requestRoutineStop}
        onNavigateToExperiments={() => this.props.history.push('/routines/select')}
      />
    )
  }
}

const mapStateToProps = state => ({
  routineTitle: selectRunningRoutineTitle(state),
  currentValue: selectRunningRoutineCurrentValue(state),
  temperatureTimeline: selectRunningRoutineTemperatureTimeline(state)
})

const mapDispatchToProps = dispatch => ({
  requestRoutineStop: () => dispatch(stopRunningRoutineRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RunningRoutineDashboard))
