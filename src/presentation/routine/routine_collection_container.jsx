import React, { Component } from 'react'
import { connect } from 'react-redux'
import RoutineCollection from './routine_collection'

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

  render () {
    return (
      <RoutineCollection
        routines={this.props.routines}
        onSelectRoutine={routine => this.props.history.push(`/routines/details/${routine.id}`)}
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
