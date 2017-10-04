import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import UpsertExperimentPresenter from './presenter'

import {
  selectRoutineFetchingStatus,
  selectSelectedRoutine
} from '../../../redux/routine/selector'
import {
  selectSelectedRoutineTimeline
} from '../../../redux/reading/selector'
import {
  fetchRequest,
  updateRoutineRequest,
  createRoutineRequest
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
      this.props.requestUpdateRoutine(routine)
    } else {
      this.props.requestCreateRoutine(routine)
    }
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
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...selectRoutineFetchingStatus(state),
  routine: selectSelectedRoutine(state),
  timeline: selectSelectedRoutineTimeline(state)
})

const mapDispatchToProps = dispatch => {
  return {
    requestRoutine: routine => dispatch(fetchRequest(routine)),
    requestUpdateRoutine: routine => dispatch(updateRoutineRequest(routine)),
    requestCreateRoutine: routine => dispatch(createRoutineRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpsertExperiment)
