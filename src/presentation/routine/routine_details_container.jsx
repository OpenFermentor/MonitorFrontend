/* global Blob */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import RoutineDetails from './routine_details'
import JsonToCsv from 'json2csv'
import FileSaver from 'file-saver'

import {
  selectRoutine,
  selectRoutineFetchingStatus
} from '../../core/redux/routine/selector'
import {
  fetchRoutineReadingsRequest,
  destroyRoutineRequest
} from '../../core/redux/routine/actions'

class RoutineDetailsContainer extends Component {
  componentWillMount () {
    this.props.requestRoutineReadings(this.props.routine)
  }

  exportReadingsToCsv () {
    const readingsData = this.props.routine.readings.map(({ temp, createdAt = '' }) => ({ temp, createdAt }))
    const fields = ['temp', 'createdAt']
    const csvReadings = JsonToCsv({ data: readingsData, fields: fields })
    const blob = new Blob([csvReadings], {type: 'text/plain;charset=utf-8'})
    FileSaver.saveAs(blob, `${this.props.routine.title}.csv`)
  }

  render () {
    return (
      <RoutineDetails
        fetching={this.props.fetching}
        error={this.props.error}
        routine={this.props.routine}
        onCancel={this.props.history.goBack}
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
    routine: selectRoutine(state, props.match.params),
    fetching,
    error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRoutineReadings: routine => dispatch(fetchRoutineReadingsRequest(routine)),
    requestDestroy: routine => dispatch(destroyRoutineRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDetailsContainer)
