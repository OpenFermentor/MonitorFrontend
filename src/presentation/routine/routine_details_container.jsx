import React, { Component } from 'react'
import { connect } from 'react-redux'
import RoutineDetails from './routine_details'

import {
  selectRoutine
} from '../../core/redux/routine/selector'
import {
} from '../../core/redux/routine/actions'

class RoutineDetailsContainer extends Component {
  render () {
    return (
      <RoutineDetails
        routine={this.props.routine}
        onCancel={this.props.history.goBack}
      />
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    routine: selectRoutine(state, props.match.params)
    // routines: selectAllRoutines(state),
    // fetching,
    // error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // requestRoutines: () => dispatch(fetchRoutinesRequest()),
    // startRoutineRequest: routine => dispatch(startRoutineRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDetailsContainer)
