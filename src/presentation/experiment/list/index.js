import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExperimentsPresenter from './presenter'

import {
  selectAllRoutines,
  selectRoutineFetchingStatus
} from '../../../redux/routine/selector'
import {
  fetchRoutinesRequest,
  setSelectedRoutine
} from '../../../redux/routine/actions'

class Experiments extends Component {
  componentWillMount () {
    this.props.requestRoutines()
  }

  onSelectRoutine (routine) {
    this.props.setSelectedRoutine(routine)
    this.props.history.push(`/routines/detail`)
  }

  render () {
    return (
      <ExperimentsPresenter
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

export default connect(mapStateToProps, mapDispatchToProps)(Experiments)
