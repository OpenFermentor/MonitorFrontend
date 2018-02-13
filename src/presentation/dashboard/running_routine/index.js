import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  selectRunningRoutine
} from '../../../redux/routine/selector'
import {
  selectRunningRoutineTimeline,
  selectRunningRoutineCurrentValue
} from '../../../redux/reading/selector'
import {
  stopRunningRoutineRequest
} from '../../../redux/routine/actions'

import RunningRoutineDashboardPresenter from './presenter'

class RunningRoutineDashboard extends Component {
  render () {
    return (
      <RunningRoutineDashboardPresenter
        routine={this.props.routine}
        currentValue={this.props.currentValue || {}}
        timeline={this.props.timeline}
        onPressSelectRoutine={() => this.props.history.push('/routines/select')}
        onRoutineStop={this.props.requestRoutineStop}
        onNavigateToExperiments={() => this.props.history.push('/routines/select')}
      />
    )
  }
}

const mapStateToProps = state => ({
  routine: selectRunningRoutine(state),
  currentValue: selectRunningRoutineCurrentValue(state),
  timeline: selectRunningRoutineTimeline(state)
})

const mapDispatchToProps = dispatch => ({
  requestRoutineStop: () => dispatch(stopRunningRoutineRequest())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RunningRoutineDashboard))
