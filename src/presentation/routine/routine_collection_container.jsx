import React, { Component } from 'react'
import { connect } from 'react-redux'
import RoutineCollection from './routine_collection'

import {
  selectAllRoutines
} from '../../core/redux/routine/selector'
import {
  fetchRoutinesRequest,
  destroyRoutineRequest,
  startRoutineRequest
} from '../../core/redux/routine/actions'

class RoutineCollectionContainer extends Component {
  componentWillMount () {
    this.props.requestRoutines()
  }

  render () {
    return (
      <RoutineCollection
        routines={this.props.routines}
        onSelectRoutine={() => {}}
        onClickDeleteRoutine={this.props.requestRoutineRemoval}
        onClickStartRoutine={this.props.startRoutineRequest}
      />
    )
  }
}

const mapStateToProps = state => ({
  routines: selectAllRoutines(state)
})

const mapDispatchToProps = dispatch => {
  return {
    requestRoutines: () => dispatch(fetchRoutinesRequest()),
    requestRoutineRemoval: routine => dispatch(destroyRoutineRequest(routine)),
    startRoutineRequest: routine => dispatch(startRoutineRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineCollectionContainer)
