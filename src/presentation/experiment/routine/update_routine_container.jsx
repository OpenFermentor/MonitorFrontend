import React, { Component } from 'react'
import { connect } from 'react-redux'
import UpsertRoutine from './upsert_routine'

import {
  updateRoutineRequest
} from '../../redux/routine/actions'
import {
  selectRoutineFetchingStatus
} from '../../redux/routine/selector'

class UpdateRoutineContainer extends Component {
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
    this.props.requestUpdateRoutine(routine)
  }

  render () {
    return (
      <UpsertRoutine
        routine={(this.props.history.location.state || {}).routine}
        onCancel={this.props.history.goBack}
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  requestUpdateRoutine: routine => dispatch(updateRoutineRequest(routine))
})

const mapStateToProps = state => {
  const { fetching, error } = selectRoutineFetchingStatus(state)
  return {
    fetching,
    error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRoutineContainer)
