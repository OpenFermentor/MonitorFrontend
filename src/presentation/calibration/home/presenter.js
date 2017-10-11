import React from 'react'
import { Message } from 'semantic-ui-react'
import Screen from '../../common/screen'
import { withRouter } from 'react-router'

const CalibrationPresenter = ({ fetching, error, submitted, location, history, onReconnectSensors }) => {
  return (
    <Screen>
      <h1>Calibración</h1>

      <Message
        icon='map pin'
        info
        header='Calibrar pH-metro'
        onClick={() => history.push(location.pathname + '/ph')}
      />

      <Message
        icon='lab'
        info
        header='Preparar bombas peristálticas'
        onClick={() => history.push(location.pathname + '/pump')}
      />

      <Message
        icon='refresh'
        positive={submitted}
        negative={error}
        info={!fetching && !error && !submitted}
        header='Reiniciar sistema'
        content={(fetching && 'Reiniciando...') || (submitted && 'Sistema reiniciado') || (error && error.message)}
        onClick={onReconnectSensors}
      />

    </Screen>
  )
}

export default withRouter(CalibrationPresenter)
