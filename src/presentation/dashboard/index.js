import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectIsRunningRoutine
} from '../../redux/routine/selector'
import SensorsDashboard from './sensors'
import RunningRoutineDashboard from './running_routine'

class Dashboard extends Component {
  render () {
    if (this.props.isRunningRoutine) {
      return <RunningRoutineDashboard />
    } else {
      return (
        <SensorsDashboard />
      )
    }
  }
}

const mapStateToProps = state => ({
  isRunningRoutine: selectIsRunningRoutine(state)
})

export default connect(mapStateToProps)(Dashboard)
