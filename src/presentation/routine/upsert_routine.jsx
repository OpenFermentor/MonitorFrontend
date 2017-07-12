import React, { Component } from 'react'
import { Modal, Button, Message } from 'semantic-ui-react'
import t from 'tcomb-form'

const Form = t.form.Form

const Routine = t.struct({
  title: t.String,
  meidum: t.String,
  strain: t.Number,
  targetTemp: t.Number,
  targetPh: t.Number,
  targetCo2: t.Number,
  extimatedTimeSeconds: t.Number,
  extraNotes: t.String
})

export default class UpsertRoutine extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null
    }
  }

  onSubmit () {
    this.setState({ error: null })
    var routineData = this.refs.form.getValue()
    if (routineData) {
      this.props.onSubmit({ id: (this.props.routine || {}).id, ...routineData })
    } else {
      this.setState({ error: 'Se produjo un error' })
    }
  }

  render () {
    console.log(this.props.routine)
    return (
      <Modal open>
        <Modal.Header>{this.props.routine ? 'Editar rutina' : 'Crear Rutina'}</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            { this.state.error &&
              <Message negative>
                <Message.Header>{this.state.error}</Message.Header>
              </Message>
            }

            <Form
              ref='form'
              value={this.props.routine}
              type={Routine}
            />
            <Button onClick={this.props.onCancel}>Cancelar</Button>
            <Button onClick={() => this.onSubmit()} primary type='submit'>Guardar</Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
