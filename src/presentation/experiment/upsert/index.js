import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import UpsertExperimentPresenter from './presenter'

import {
  selectRoutineFetchingStatus,
  selectSelectedRoutine
} from '../../../redux/routine/selector'

import {
  updateRoutineRequest,
  createRoutineRequest,
  destroyRoutineRequest
} from '../../../redux/routine/actions'

class UpsertExperiment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (!this.shouldOpenModal() || !this.state.submitting || newProps.fetching) {
      return
    }
    if (newProps.error) {
      return this.setState({ submitting: false })
    }
    this.props.history.goBack()
  }

  onSubmit (routine) {
    this.setState({ submitting: true })
    if (this.props.routine) {
      this.props.requestUpdate(routine)
    } else {
      this.props.requestCreate(routine)
    }
  }

  onDestroy () {
    this.setState({ submitting: true })
    this.props.requestDestroy(this.props.routine)
  }

  shouldOpenModal () {
    const params = queryString.parse(this.props.location.search)
    return params.showModal === 'true'
  }

  render () {
    if (!this.shouldOpenModal()) {
      return null
    }
    return (
      <UpsertExperimentPresenter
        fetching={this.props.fetching}
        error={this.props.error}
        routine={this.props.routine}
        onCancel={() => this.props.history.goBack()}
        onDestroy={this.onDestroy.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...selectRoutineFetchingStatus(state),
  routine: selectSelectedRoutine(state)
})

const mapDispatchToProps = dispatch => {
  return {
    requestDestroy: routine => dispatch(destroyRoutineRequest(routine)),
    requestUpdate: routine => dispatch(updateRoutineRequest(routine)),
    requestCreate: routine => dispatch(createRoutineRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpsertExperiment)
