import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  createExternalReadingRequest
} from '../../../../redux/reading/actions'
import {
  selectRunningRoutine
} from '../../../../redux/routine/selector'
import {
  selectFetchingStatus
} from '../../../../redux/reading/selector'

import AddExternalRoutinePresenter from './presenter'

class AddExternalRoutine extends Component {
  constructor (props) {
    super(props)
    this.state = {
      magnitudes: {
        product: null,
        substratum: null,
        biomass: null
      },
      submitting: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (!this.state.submitting || this.props.fetching) {
      return
    }
    if (newProps.error) {
      return this.setState({ submitting: false })
    }
    this.props.onClose()
  }

  onSubmit () {
    this.setState({ submitting: true })
    this.props.createReading(this.props.routine, this.state.magnitudes)
  }

  render () {
    return (
      <AddExternalRoutinePresenter
        fetching={this.props.fetching}
        error={this.props.error}
        magnitudes={this.state.magnitudes}
        onClose={this.props.onClose}
        onSubmit={this.onSubmit.bind(this)}
        onUpdateMagnitudes={magnitudes => this.setState({ magnitudes })}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...selectFetchingStatus(state),
  routine: selectRunningRoutine(state)
})

const mapDispatchToProps = dispatch => ({
  createReading: (routine, magnitudes) => dispatch(createExternalReadingRequest({ routine, ...magnitudes }))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddExternalRoutine)
