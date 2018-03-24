import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import queryString from 'query-string'

import UpsertExperimentPresenter from './presenter'

import {
  selectRoutineFetchingStatus,
  selectUpsertActionStatus,
  selectSelectedRoutine
} from '../../../redux/routine/selector'

import {
  submitUpsert,
  destroyRoutineRequest,
  upsertSetCurrentSection,
  upsertStartCreation,
  upsertStartEdition
} from '../../../redux/routine/actions'

const ModalHandler = ({ location }) => {
  const params = queryString.parse(location.search)
  const shouldOpenModal = params.showModal === 'true'
  if (!shouldOpenModal) {
    return null;
  }
  return <ConnectedUpsertExperiment />
}

class UpsertExperiment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false
    }
  }

  componentWillMount () {
    if (this.props.selectedRoutine) {
      this.props.startEdition(this.props.selectedRoutine)
    } else {
      this.props.startCreation()
    }
  }

  componentWillReceiveProps (newProps) {
    if (!this.props.selectedRoutine && newProps.selectedRoutine) {
      this.props.startEdition(newProps.selectedRoutine)
    }
    if (!this.state.submitting || newProps.fetching) {
      return
    }
    if (newProps.error) {
      return this.setState({ submitting: false })
    }

    this.setState({ submitting: false })
    this.props.history.goBack()
    this.props.setCurrentSection('details')
  }

  onSubmit (routine) {
    this.setState({ submitting: true })
    this.props.submitUpsert()
  }

  onDestroy () {
    this.setState({ submitting: true })
    this.props.requestDestroy(this.props.routine)
  }

  render () {
    return (
      <UpsertExperimentPresenter
        fetching={this.props.fetching}
        error={this.props.error}
        routine={this.props.routine}
        operation={this.props.operation}
        currentSection={this.props.currentSection}

        onCancel={() => this.props.history.goBack()}
        onDestroy={this.onDestroy.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        onNextSection={() => this.props.setCurrentSection('parameters')}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...selectRoutineFetchingStatus(state),
  ...selectUpsertActionStatus(state),
  selectedRoutine: selectSelectedRoutine(state)
})

const mapDispatchToProps = dispatch => ({
  requestDestroy: routine => dispatch(destroyRoutineRequest(routine)),
  submitUpsert: () => dispatch(submitUpsert()),
  setCurrentSection: section => dispatch(upsertSetCurrentSection(section)),
  startCreation: routine => dispatch(upsertStartCreation(routine)),
  startEdition: routine => dispatch(upsertStartEdition(routine))
})

const ConnectedUpsertExperiment = withRouter(connect(mapStateToProps, mapDispatchToProps)(UpsertExperiment));

export default ModalHandler;
