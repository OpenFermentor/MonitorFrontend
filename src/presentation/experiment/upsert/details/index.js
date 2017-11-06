import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  upsertUpdateRoutine
} from '../../../../redux/routine/actions'

import {
  selectUpsertActionStatus,
  selectRoutineFetchingStatus
} from '../../../../redux/routine/selector'

import UpsertExperimentDetailsPresenter from './presenter'

class UpsertExperimentDetails extends Component {
  render () {
    return (
      <UpsertExperimentDetailsPresenter
        routine={this.props.routine}
        error={this.props.error}

        onUpdateRoutine={this.props.updateRoutine}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...selectUpsertActionStatus(state),
  ...selectRoutineFetchingStatus(state)
})

const mapDispatchToProps = dispatch => ({
  updateRoutine: routine => dispatch(upsertUpdateRoutine(routine))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpsertExperimentDetails)
