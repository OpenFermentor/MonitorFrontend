import React, { Component } from 'react'
import { connect } from 'react-redux'

import RoutineSelectionPresenter from './presenter'

import {
  selectAllRoutines,
  selectRoutineFetchingStatus
} from '../../../../redux/routine/selector'
import {
  fetchRoutinesRequest,
  startRoutineRequest
} from '../../../../redux/routine/actions'

class RoutineSelection extends Component {
  componentWillMount () {
    this.props.requestRoutines()
  }

  onSelectRoutine (routine) {
    this.props.startRoutineRequest(routine)
  }

  render () {
    return (
      <RoutineSelectionPresenter
        routines={this.props.routines}
        onSelectRoutine={this.onSelectRoutine.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => {
  const { fetching, error } = selectRoutineFetchingStatus(state)
  return {
    routines: selectAllRoutines(state),
    fetching,
    error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRoutines: () => dispatch(fetchRoutinesRequest()),
    startRoutineRequest: routine => dispatch(startRoutineRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineSelection)
