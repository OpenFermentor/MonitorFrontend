import React, { Component } from 'react'
import { connect } from 'react-redux'
import UpsertRoutine from './upsert_routine'

import {
  createRoutineRequest
} from '../../core/redux/routine/actions'

class CreateRoutineContainer extends Component {
  render () {
    return (
      <UpsertRoutine
        onCancel={this.props.history.goBack}
        onSubmit={this.props.requestCreateRoutine}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  requestCreateRoutine: routine => dispatch(createRoutineRequest(routine))
})

export default connect(undefined, mapDispatchToProps)(CreateRoutineContainer)
