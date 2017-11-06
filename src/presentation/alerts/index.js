import React from 'react'
import { connect } from 'react-redux'

import {
  selectPendingAlerts
} from '../../redux/alert/selector'

import ModalAlert from './modal'
import NotificationAlerts from './notifications'

const Alerts = ({ alerts }) => {
  const systemAlert = alerts.find(alert => alert.status === 'system')
  if (systemAlert) {
    return (
      <ModalAlert alert={systemAlert} />
    )
  } else {
    const notificationAlerts = alerts.filter(alert => alert.status !== 'status')
    return (
      <NotificationAlerts
        alerts={notificationAlerts}
      />
    )
  }
}

const mapStateToProps = state => ({
  alerts: selectPendingAlerts(state)
})

export default connect(mapStateToProps)(Alerts)
