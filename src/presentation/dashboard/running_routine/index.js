import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  selectRunningRoutineTitle
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
        routineTitle={this.props.routineTitle}
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
  routineTitle: selectRunningRoutineTitle(state),
  currentValue: selectRunningRoutineCurrentValue(state),
  timeline: selectRunningRoutineTimeline(state)
})

const mapDispatchToProps = dispatch => ({
  requestRoutineStop: () => dispatch(stopRunningRoutineRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RunningRoutineDashboard))
