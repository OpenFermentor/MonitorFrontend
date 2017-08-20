import React, { Component } from 'react'
import { Modal, Button, Divider, Message, Loader } from 'semantic-ui-react'

import SensorChart from './sensor_chart'
import NavigationChart from './navigation_chart'

export default class RoutineDetails extends Component {
  render () {
    if (!this.props.routine) {
      return
    }
    return (
      <Modal open>
        <Modal.Header>Experimento {this.props.routine.title}</Modal.Header>
        <Modal.Content>
          <Modal.Description>

            <Button floated='right' onClick={this.props.onDelete}>Eliminar</Button>
            <Button floated='right' onClick={this.props.onUpdate}>Editar</Button>

            <p>Medio: {this.props.routine.medium}</p>
            <p>Temperatura objetivo: {this.props.routine.targetTemp}</p>
            <p>Tiempo estimado en segundos: {this.props.routine.estimatedTimeSeconds}</p>
            <p>Notas adicionales: {this.props.routine.extraNotes}</p>

            <Divider />

            <h3>Lecturas</h3>

            <SensorChart
              title='Temperatura'
              valueUnit='ºC'
              data={this.props.temperatureTimeline}
            />
            <SensorChart
              title='pH'
              data={{ labels: this.props.temperatureTimeline.labels }}
            />
            <SensorChart
              title='Agitación'
              data={{ labels: this.props.temperatureTimeline.labels }}
            />

            <NavigationChart />

            { this.props.error &&
              <Message
                error
                content={this.props.error.message}
              />
            }

            {
              this.props.fetching &&
              <Loader />
            }

            { this.props.routine.readings.length > 0 &&
              <div>
                <Button floated='right' onClick={this.props.onExportToCsv}>Exportar a CSV</Button>
              </div>

            }

            <Button floated='right' onClick={this.props.onCancel}>Cancelar</Button>

          </Modal.Description>

        </Modal.Content>
      </Modal>
    )
  }
}
