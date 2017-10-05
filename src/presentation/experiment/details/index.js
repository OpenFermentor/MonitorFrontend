import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExperimentPresenter from './presenter'

import {
  selectRoutineFetchingStatus,
  selectSelectedRoutine
} from '../../../redux/routine/selector'
import {
  selectSelectedRoutineTimeline
} from '../../../redux/reading/selector'
import {
  fetchRequest,
  startRoutineRequest
} from '../../../redux/routine/actions'

class Experiment extends Component {
  componentWillMount () {
    this.props.requestRoutine(this.props.match.params)
  }

  componentWillReceiveProps ({ routine = {} }) {
    if (this.props.routine && !this.props.routine.started && routine.started) {
      this.props.history.push('/')
    }
  }

  onStart () {
    this.props.startRoutine(this.props.routine)
  }

  render () {
    return (
      <ExperimentPresenter
        fetching={this.props.fetching}
        error={this.props.error}
        routine={this.props.routine}
        timeline={this.props.timeline}

        onStart={this.onStart.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    ...selectRoutineFetchingStatus(state),
    routine: selectSelectedRoutine(state),
    timeline: selectSelectedRoutineTimeline(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRoutine: routine => dispatch(fetchRequest(routine)),
    startRoutine: routine => dispatch(startRoutineRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiment)
