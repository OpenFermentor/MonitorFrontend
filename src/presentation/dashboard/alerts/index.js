import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  selectPendingAlerts
} from '../../../redux/alert/selector'
import {
  dismissAlert
} from '../../../redux/alert/actions.js'

import AlertsPresenter from './presenter'

class Alerts extends Component {
  render () {
    return (
      <AlertsPresenter
        alerts={this.props.alerts}
        onDismissAlert={this.props.dismissAlert}
      />
    )
  }
}

const mapStateToProps = state => ({
  alerts: selectPendingAlerts(state)
})

const mapDispatchToProps = dispatch => ({
  dismissAlert: alert => dispatch(dismissAlert(alert))
})

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
