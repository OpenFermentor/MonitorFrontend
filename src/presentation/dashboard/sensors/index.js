import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  selectSensorsActionStatus
} from '../../../redux/sensors/selector'

import SensorsDashboardPresenter from './presenter'

class SensorsDashboard extends Component {
  render () {
    return (
      <SensorsDashboardPresenter
        {...this.props.status}
      />
    )
  }
}

const mapStateToProps = state => ({
  status: selectSensorsActionStatus(state)
})

export default connect(mapStateToProps)(SensorsDashboard)
