import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import {
  upsertUpdateRoutine
} from '../../../../redux/routine/actions'

import {
  selectUpsertActionStatus,
  selectRoutineFetchingStatus
} from '../../../../redux/routine/selector'

import UpsertExperimentDetailsPresenter from './presenter'

class UpsertExperimentDetails extends Component {
  onUpdateRoutine (routine) {
    const hoursDuration = moment.duration(parseInt(routine.hours), 'hours').asSeconds() || 0
    const minutesDuration = moment.duration(parseInt(routine.minutes), 'minutes').asSeconds() || 0
    this.props.updateRoutine({
      ...routine,
      estimatedTimeSeconds: hoursDuration + minutesDuration
    })
  }

  mapTempRangesToHoursAndSeconds () {
    const estimatedTimeSecondsDuration = moment.duration(this.props.routine.estimatedTimeSeconds)
    return {
      ...this.props.routine,
      hours: estimatedTimeSecondsDuration.hours(),
      minutes: estimatedTimeSecondsDuration.minutes()
    }
  }

  render () {
    return (
      <UpsertExperimentDetailsPresenter
        routine={this.props.routine}
        error={this.props.error}

        onUpdateRoutine={this.onUpdateRoutine.bind(this)}
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
