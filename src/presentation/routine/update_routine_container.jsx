import React, { Component } from 'react'
import { connect } from 'react-redux'
import UpsertRoutine from './upsert_routine'

import {
  updateRoutineRequest
} from '../../core/redux/routine/actions'

class UpdateRoutineContainer extends Component {
  render () {
    return (
      <UpsertRoutine
        routine={this.props.history.location.state.routine}
        onCancel={this.props.history.goBack}
        onSubmit={this.props.requestUpdateRoutine}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  requestUpdateRoutine: routine => dispatch(updateRoutineRequest(routine))
})

export default connect(undefined, mapDispatchToProps)(UpdateRoutineContainer)
