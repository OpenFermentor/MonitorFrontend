import React from 'react'
import './styles.css'
import classNames from 'classnames'

import Container from '../../../common/container'
import ButtonIcon from '../../../common/button/icon'

const NotificationAlert = ({ alert, onDismiss }) => {
  return (
    <div
      className={classNames('notificationAlert', {
        error: alert.messageType === 'error',
        success: alert.messageType === 'success'
      })}
    >
      <Container row>
        <h6 className='title'>{alert.message}</h6>
        <ButtonIcon
          icon='close'
          basic
          inverted
          onClick={onDismiss}
        />
      </Container>
      { !!alert.errors &&
        <ul>
          { alert.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      }
    </div>
  )
}

export default NotificationAlert
