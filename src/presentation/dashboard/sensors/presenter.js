import React, { Component } from 'react'

import Alerts from '../alerts'
import Message from '../../common/message'
import Screen from '../../common/screen'

export default class SensorsDashboardPresenter extends Component {
  render () {
    return (
      <Screen>

        <Alerts />

        { this.props.status.error &&
          <Message
            centerVertical
            title='Se produjo un error en los sensores'
            subtitle={this.props.status.error}
          />
        }

        { this.props.status.operative &&
          <Message
            centerVertical
            title='Sensores en funcionamiento'
          />
        }

        { !this.props.status.operative && !this.props.status.error &&
          <Message
            centerVertical
            dimmed
            title='Cargando estado de sensores...'
          />
        }

      </Screen>
    )
  }
}
