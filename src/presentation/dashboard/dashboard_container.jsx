import React, { Component } from 'react'
import { connect } from 'react-redux'
import RoutineCollection from '../routine/routine_collection_container'

import {
  selectRunningRoutine
} from '../../core/redux/routine/selectors'

class DashboardContainer extends Component {
  render () {
    if (!this.props.runningRoutine) {
      return (
        <div>
          <h1>Seleccionar rutina</h1>
          <RoutineCollection />
        </div>
      )
    }

    return (
      <div>
        <div>
          <h2>Running routine</h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  runningRoutine: selectRunningRoutine(state)
})

export default connect(mapStateToProps)(DashboardContainer)
