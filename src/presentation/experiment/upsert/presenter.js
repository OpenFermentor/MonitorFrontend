import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import './styles.css'

import Button from '../../common/button'
import Container from '../../common/container'
import Modal from '../../common/modal'

import UpsertExperimentBreadcrumb from './breadcrumb'
import UpsertExperimentDetails from './details'
import UpsertExperimentParameters from './parameters'

export default class UpsertRoutine extends Component {
  render () {
    return (
      <Modal
        open
        onClose={this.props.onCancel}
        size='large'
        title={this.props.operation === 'edition' ? 'Editar experimento' : 'Crear experimento'}
      >

        <UpsertExperimentBreadcrumb
        />

        <Modal.Content scrolling>
          <Modal.Description>

            { this.props.error && this.props.error.type === 'String' &&
              <Message
                error
                content={this.props.error.message}
              />
            }

            { this.props.currentSection === 'details' &&
              <UpsertExperimentDetails />
            }

            { this.props.currentSection === 'parameters' &&
              <UpsertExperimentParameters />
            }

          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Container row end={this.props.operation === 'creation'} noPadding>
            { this.props.operation === 'edition' &&
              <Button negative onClick={this.props.onDestroy}>Eliminar</Button>
            }
            { this.props.currentSection === 'details' &&
              <Button onClick={this.props.onNextSection} primary type='submit'>Siguiente</Button>
            }
            { this.props.currentSection === 'parameters' &&
              <Button onClick={this.props.onSubmit} primary type='submit'>Guardar</Button>
            }
          </Container>
        </Modal.Actions>
      </Modal>
    )
  }
}
