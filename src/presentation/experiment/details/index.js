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
  fetchRequest
} from '../../../redux/routine/actions'

class Experiment extends Component {
  componentWillMount () {
    this.props.requestRoutine(this.props.match.params)
  }

  render () {
    return (
      <ExperimentPresenter
        fetching={this.props.fetching}
        error={this.props.error}
        routine={this.props.routine}
        timeline={this.props.timeline}

        onAnalyzeData={() => this.props.history.push(`/experiments/${this.props.routine.id}/analysis`)}
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
    requestRoutine: routine => dispatch(fetchRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiment)
