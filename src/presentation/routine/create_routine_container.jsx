import React, { Component } from 'react'
import { connect } from 'react-redux'
import UpsertRoutine from './upsert_routine'

import {
  createRoutineRequest
} from '../../core/redux/routine/actions'
import {
  selectRoutineFetchingStatus
} from '../../core/redux/routine/selector'

class CreateRoutineContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (!this.state.submitting || newProps.fetching) {
      return
    }

    if (newProps.error) {
      return this.setState({ submitting: false })
    }

    this.props.history.replace('/')
  }

  onSubmit (routine) {
    this.setState({ submitting: true })
    this.props.requestCreateRoutine(routine)
  }

  render () {
    return (
      <UpsertRoutine
        fetching={this.props.fetching}
        error={this.props.error}
        onCancel={this.props.history.goBack}
        onSubmit={this.onSubmit}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  requestCreateRoutine: routine => dispatch(createRoutineRequest(routine))
})

const mapStateToProps = state => {
  const { fetching, error } = selectRoutineFetchingStatus(state)
  return {
    fetching,
    error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoutineContainer)
