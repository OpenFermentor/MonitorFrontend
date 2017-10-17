import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

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
  onSetTemperatureRange (tempRange) {
    const hoursDuration = moment.duration(parseInt(tempRange.hours), 'hours').asSeconds() || 0
    const minutesDuration = moment.duration(parseInt(tempRange.minutes), 'minutes').asSeconds() || 0
    this.props.setTemperatureRange({
      ...tempRange,
      fromSecond: hoursDuration + minutesDuration
    })
  }

  mapTempRangesToHoursAndSeconds () {
    this.props.tempRanges.map(tempRange => {
      const fromSecondsDuration = moment.duration(tempRange.fromSecond)
      return {
        ...tempRange,
        hours: fromSecondsDuration.hours(),
        minutes: fromSecondsDuration.minutes()
      }
    })
  }

  render () {
    return (
      <UpsertExperimentParametersPresenter
        routine={this.props.routine}
        tempRanges={this.props.tempRanges}
        error={this.props.error}

        onSetTemperatureRange={this.onSetTemperatureRange.bind(this)}
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
