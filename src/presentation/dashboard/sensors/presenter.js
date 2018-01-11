import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

import InfoMessage from '../../common/message'
import Screen from '../../common/screen'

export default class SensorsDashboardPresenter extends Component {
  render () {
    return (
      <Screen>

        { this.props.error &&
          <InfoMessage
            centerVertical
            title='Se produjo un error en los sensores'
            subtitle={this.props.error}
          />
        }

        { this.props.statusLoaded &&
          <div>
            <Message
              positive={this.props.sensors.temp}
              negative={!this.props.sensors.temp}
              header='Temperatura'
              content={
                this.props.sensors.temp ? 'Sensor operativo' : 'Sesor no operativo'
              }
            />
            <Message
              positive={this.props.sensors.ph}
              negative={!this.props.sensors.ph}
              header='pH'
              content={
                this.props.sensors.ph ? 'Sensor operativo' : 'Sesor no operativo'
              }
            />
            <Message
              positive={this.props.sensors.pumps}
              negative={!this.props.sensors.pumps}
              header='Bombas peristálticas'
              content={
                this.props.sensors.pumps ? 'Bombas operativas' : 'Bombas no operativas'
              }
            />
          </div>
        }

        { !this.props.statusLoaded &&
          <InfoMessage
            centerVertical
            dimmed
            title='Cargando estado de sensores...'
          />
        }

      </Screen>
    )
  }
}
