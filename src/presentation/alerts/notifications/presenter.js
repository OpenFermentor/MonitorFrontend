import React from 'react'
import './styles.css'

import NotificationAlert from './item'

const MAXIMMUM_VISIBLE_NOTIFICATIONS = 4

const NotificationAlertsPresenter = ({ alerts, onDismissAlert }) => {
  return (
    <div className='notificationAlerts'>
      {alerts.slice(0, MAXIMMUM_VISIBLE_NOTIFICATIONS).map(alert => (
        <NotificationAlert
          key={alert.id}
          alert={alert}
          onDismiss={() => onDismissAlert(alert)}
        />
      ))}
    </div>
  )
}

export default NotificationAlertsPresenter
