import React, { Component } from 'react'
import { connect } from 'react-redux'

import RoutinesPresenter from './presenter'

import {
  selectAllRoutines,
  selectRoutineFetchingStatus
} from '../../core/redux/routine/selector'
import {
  fetchRoutinesRequest,
  setSelectedRoutine
} from '../../core/redux/routine/actions'

class Routines extends Component {
  componentWillMount () {
    this.props.requestRoutines()
  }

  onSelectRoutine (routine) {
    this.props.setSelectedRoutine(routine)
    this.props.history.push(`/routines/detail`)
  }

  render () {
    return (
      <RoutinesPresenter
        routines={this.props.routines}
        onSelectRoutine={this.onSelectRoutine.bind(this)}
        onCancel={this.props.history.goBack}
      />
    )
  }
}

const mapStateToProps = state => {
  const { fetching, error } = selectRoutineFetchingStatus(state)
  return {
    routines: selectAllRoutines(state),
    fetching,
    error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRoutines: () => dispatch(fetchRoutinesRequest()),
    setSelectedRoutine: routine => dispatch(setSelectedRoutine(routine))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routines)
