import React from 'react'
import Screen from '../../common/screen'
import { withRouter } from 'react-router'

import Container from '../../common/container'
import MessageFetching from '../../common/message/fetching'

const CalibrationPresenter = ({ fetching, error, onPushAcidPump, onTestAcidDrop, onPushBasePump, onTestBaseDrop }) => {
  return (
    <Screen>
      <Container>
        <h1>Calibrar bombas peristálticas</h1>
      </Container>

      <Container>
        <h2>Ácido</h2>
      </Container>

      <MessageFetching
        icon='angle double right'
        title='Bombear ácido'
        fetching={fetching}
        error={error}
        fetchingMessage='Procesando...'
        onClick={onPushAcidPump}
      />

      <MessageFetching
        icon='angle double right'
        title='Gotear ácido'
        fetching={fetching}
        error={error}
        fetchingMessage='Reiniciando...'
        onClick={onTestAcidDrop}
      />

      <Container>
        <h2>Base</h2>
      </Container>

      <MessageFetching
        icon='angle double right'
        title='Bombear base'
        fetching={fetching}
        error={error}
        fetchingMessage='Procesando...'
        onClick={onPushBasePump}
      />

      <MessageFetching
        icon='angle double right'
        title='Gotear base'
        fetching={fetching}
        error={error}
        fetchingMessage='Reiniciando...'
        onClick={onTestBaseDrop}
      />

    </Screen>
  )
}

export default withRouter(CalibrationPresenter)
