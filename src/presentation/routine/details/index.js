/* global Blob */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import JsonToCsv from 'json2csv'
import FileSaver from 'file-saver'

import RoutineDetailsPresenter from './presenter'

import {
  selectSelectedRoutine,
  selectRoutineFetchingStatus
} from '../../../core/redux/routine/selector'
import {
  selectSelectedRoutineTimeline
} from '../../../core/redux/reading/selector'
import {
  destroyRoutineRequest,
  clearSelectedRoutine
} from '../../../core/redux/routine/actions'
import {
  fetchRoutineReadingsRequest
} from '../../../core/redux/reading/actions'

class RoutineDetails extends Component {
  componentWillMount () {
    this.props.requestRoutineReadings(this.props.routine)
  }

  onCancel () {
    this.props.clearSelectedRoutine()
    this.props.history.goBack()
  }

  exportReadingsToCsv () {
    const readingsData = this.props.routine.readings.map(({ temp, insertedAt = '' }) => ({ temp, insertedAt }))
    const fields = ['temp', 'insertedAt']
    const csvReadings = JsonToCsv({ data: readingsData, fields: fields })
    const blob = new Blob([csvReadings], {type: 'text/plain;charset=utf-8'})
    FileSaver.saveAs(blob, `${this.props.routine.title}.csv`)
  }

  render () {
    return (
      <RoutineDetailsPresenter
        fetching={this.props.fetching}
        error={this.props.error}
        routine={this.props.routine}
        timeline={this.props.timeline}
        navigationTimeline={this.props.navigationTimeline}

        onCancel={this.onCancel.bind(this)}
        onDelete={() => { this.props.history.goBack(); this.props.requestDestroy(this.props.routine) }}
        onUpdate={() => this.props.history.push({ pathname: '/routines/edit', state: { routine: this.props.routine } })}
        onExportToCsv={this.exportReadingsToCsv.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, props) => {
  const { fetching, error } = selectRoutineFetchingStatus(state)
  return {
    routine: selectSelectedRoutine(state),
    timeline: selectSelectedRoutineTimeline(state),
    fetching,
    error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearSelectedRoutine: () => dispatch(clearSelectedRoutine()),
    requestRoutineReadings: routine => dispatch(fetchRoutineReadingsRequest(routine)),
    requestDestroy: routine => dispatch(destroyRoutineRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDetails)
