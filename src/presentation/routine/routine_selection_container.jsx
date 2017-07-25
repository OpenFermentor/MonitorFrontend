import React, { Component } from 'react'
import { connect } from 'react-redux'
import RoutineSelection from './routine_selection'

import {
  selectAllRoutines,
  selectRoutineFetchingStatus
} from '../../core/redux/routine/selector'
import {
  fetchRoutinesRequest,
  startRoutineRequest
} from '../../core/redux/routine/actions'

class RoutineSelectionContainer extends Component {
  componentWillMount () {
    this.props.requestRoutines()
  }

  onSelectRoutine (routine) {
    this.props.startRoutineRequest(routine)
    this.props.history.goBack()
  }

  render () {
    return (
      <RoutineSelection
        routines={this.props.routines}
        onSelectRoutine={this.onSelectRoutine.bind(this)}
        onCancel={this.props.history.goBack}
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutineSelectionContainer)
