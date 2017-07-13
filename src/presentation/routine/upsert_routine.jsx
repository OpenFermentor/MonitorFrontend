import React, { Component } from 'react'
import { Modal, Button, Message } from 'semantic-ui-react'
import Form from '../common/Form'
import TextInput from '../common/TextInput'
import TextArea from '../common/TextArea'

export default class UpsertRoutine extends Component {
  constructor (props) {
    super(props)
    const { id, title, medium, targetTemp, estimatedTimeSeconds, extraNotes } = this.props.routine || {}
    this.state = {
      id,
      title,
      estimatedTimeSeconds,
      extraNotes,
      medium,
      targetTemp,
      strain: '-1',
      targetPh: -1,
      targetCo2: -1,
      targetDensity: -1
    }
  }

  onSubmit () {
    this.props.onSubmit(this.state)
  }

  render () {
    console.log(this.props)
    return (
      <Modal open>
        <Modal.Header>{this.props.routine ? 'Editar rutina' : 'Crear Rutina'}</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            { this.props.error &&
              <Message
                error
                content={this.props.error.message}
              />
            }

            <Form onSubmit={this.onSubmit} fetching={this.props.fetching}>
              <TextInput
                label='Título'
                value={this.state.title}
                onChange={title => this.setState({ title })}
              />

              <TextInput
                label='Medio'
                value={this.state.medium}
                onChange={medium => this.setState({ medium })}
              />

              <TextInput
                label='Temperatura objetivo'
                value={this.state.targetTemp}
                onChange={targetTemp => this.setState({ targetTemp })}
              />

              <TextInput
                label='Tiempo estimado en segundos'
                value={this.state.estimatedTimeSeconds}
                onChange={estimatedTimeSeconds => this.setState({ estimatedTimeSeconds })}
              />

              <TextArea
                label='Notas adicionales'
                value={this.state.extraNotes}
                onChange={extraNotes => this.setState({ extraNotes })}
              />

              <Button onClick={this.props.onCancel}>Cancelar</Button>
              <Button onClick={this.onSubmit.bind(this)} primary type='submit'>Guardar</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
