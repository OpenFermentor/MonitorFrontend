import React from 'react'
import { connect } from 'react-redux'

import {
  dismissAlert
} from '../../../redux/alert/actions'

import NotificationAlertsPresenter from './presenter'

const NoficationAlerts = ({ alerts, dismissAlert }) => {
  return (
    <NotificationAlertsPresenter
      alerts={alerts}
      onDismissAlert={dismissAlert}
    />
  )
}

const mapDispatchToProps = dispatch => ({
  dismissAlert: alert => dispatch(dismissAlert(alert))
})

export default connect(null, mapDispatchToProps)(NoficationAlerts)
