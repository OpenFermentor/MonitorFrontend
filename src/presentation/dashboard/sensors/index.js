import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  selectSensorsStatus
} from '../../../redux/sensors/selector'

import SensorsDashboardPresenter from './presenter'

class SensorsDashboard extends Component {
  render () {
    return (
      <SensorsDashboardPresenter
        status={this.props.status}
      />
    )
  }
}

const mapStateToProps = state => ({
  status: selectSensorsStatus(state)
})

export default connect(mapStateToProps)(SensorsDashboard)
