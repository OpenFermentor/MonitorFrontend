import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExperimentReportPresenter from './presenter'

import {
  selectRoutineFetchingStatus, selectSelectedRoutine
} from '../../../redux/routine/selector'

import {
  fetchRequest
} from '../../../redux/routine/actions'

class ExperimentReport extends Component {
  componentWillMount () {
    this.props.requestRoutine(this.props.match.params)
  }

  render () {
    return (
      <ExperimentReportPresenter
        routine={this.props.routine}
        fetching={this.props.fetching}
        error={this.props.error}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    ...selectRoutineFetchingStatus(state),
    routine: selectSelectedRoutine(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRoutine: routine => dispatch(fetchRequest(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentReport)
