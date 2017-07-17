import React, { Component } from 'react'
import { Modal, Button, Divider, Message, Loader, Table } from 'semantic-ui-react'
import moment from 'moment'

export default class RoutineDetails extends Component {
  render () {
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

            { this.props.routine.readings.length === 0 &&
              <Message visible>
                El experimento nunca se realizó
              </Message>
            }

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
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Temperatura</Table.HeaderCell>
                      <Table.HeaderCell>Fecha</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    { this.props.routine.readings.map((reading, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>{ reading.temp }</Table.Cell>
                        <Table.Cell>{ moment(reading.createdAt).format('HH:mm DD/MM/YYYY')}</Table.Cell>
                      </Table.Row>
                   ))}
                  </Table.Body>
                </Table>
              </div>

            }

          </Modal.Description>
          <Button floated='right' onClick={this.props.onCancel}>Cancelar</Button>

        </Modal.Content>
      </Modal>
    )
  }
}
