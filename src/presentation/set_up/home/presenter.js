import React from 'react'
import { Message } from 'semantic-ui-react'
import Screen from '../../common/screen'
import { withRouter } from 'react-router'

import Container from '../../common/container'
import MessageFetching from '../../common/message/fetching'

const SetUpHomePresenter = ({ fetching, error, submitted, location, history, onReconnectSensors }) => {
  return (
    <Screen>
      <Container>
        <h1>Calibración</h1>
      </Container>

      <Message
        icon='map pin'
        info
        header='Calibrar pH-metro'
        onClick={() => history.push(location.pathname + '/ph')}
      />

      <Message
        icon='lab'
        info
        header='Calibrar bombas peristálticas'
        onClick={() => history.push(location.pathname + '/pump')}
      />

      <MessageFetching
        icon='refresh'
        title='Reconectar sensores'
        fetching={fetching}
        error={error}
        fetchingMessage='Reconectando...'
        submittedMessage='Sensores conectados'
        onClick={onReconnectSensors}
      />

    </Screen>
  )
}

export default withRouter(SetUpHomePresenter)
