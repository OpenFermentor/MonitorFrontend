import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExperimentExecutionPresenter from './presenter'

import {
  selectRoutineFetchingStatus, selectSelectedRoutine
} from '../../../redux/routine/selector'

import {
  selectSelectedRoutineLogEntries
} from '../../../redux/routine_log_entry/selector'
import {
  selectSelectedRoutineTimeline
} from '../../../redux/reading/selector'
import {
  fetchRequest
} from '../../../redux/routine/actions'

class ExperimentExecution extends Component {
  componentWillMount () {
    this.props.requestRoutine(this.props.match.params)
  }

  render () {
    return (
      <ExperimentExecutionPresenter
        routine={this.props.routine}
        fetching={this.props.fetching}
        error={this.props.error}
        timeline={this.props.timeline}
        logEntries={this.props.logEntries}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    ...selectRoutineFetchingStatus(state),
    routine: selectSelectedRoutine(state),
    timeline: selectSelectedRoutineTimeline(state),
    logEntries: selectSelectedRoutineLogEntries(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRoutine: routine => dispatch(fetchRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentExecution)
