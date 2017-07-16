import React, { Component } from 'react'
import { Modal, Button, Divider, Message } from 'semantic-ui-react'

export default class UpsertRoutine extends Component {
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

          </Modal.Description>
          <Button floated='right' onClick={this.props.onCancel}>Cancelar</Button>

        </Modal.Content>
      </Modal>
    )
  }
}
