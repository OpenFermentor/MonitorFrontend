import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  upsertUpdateRoutine,
  upsertAddTemperatureRange,
  upsertSetTemperatureRange,
  upsertRemoveTemperatureRange
} from '../../../../redux/routine/actions'

import {
  selectUpsertActionStatus,
  selectRoutineFetchingStatus
} from '../../../../redux/routine/selector'

import UpsertExperimentParametersPresenter from './presenter'

class UpsertExperimentParameters extends Component {
  render () {
    return (
      <UpsertExperimentParametersPresenter
        routine={this.props.routine}
        tempRanges={this.props.tempRanges}
        error={this.props.error}

        onSetTemperatureRange={this.props.setTemperatureRange}
        onAddTempRange={this.props.addTemperatureRange}
        onRemoveTemperatureRange={this.props.removeTemperatureRange}
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
  updateRoutine: routine => dispatch(upsertUpdateRoutine(routine)),
  addTemperatureRange: () => dispatch(upsertAddTemperatureRange()),
  setTemperatureRange: tempRange => dispatch(upsertSetTemperatureRange(tempRange)),
  removeTemperatureRange: tempRange => dispatch(upsertRemoveTemperatureRange(tempRange))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpsertExperimentParameters)
