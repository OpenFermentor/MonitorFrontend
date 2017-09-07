import React from 'react'
import './styles.css'
import { Message } from 'semantic-ui-react'

const AlertsPresenter = ({ alerts, onDismissAlert }) => (
  <div className='alerts'>

    { alerts.map(alert => (
      <Message
        negative
        key={alert.id}
        onDismiss={() => onDismissAlert(alert)}
      >
        <Message.Header>{alert.message}</Message.Header>
        <Message.List items={alert.errors} />
      </Message>
    ))}
  </div>
)

export default AlertsPresenter
