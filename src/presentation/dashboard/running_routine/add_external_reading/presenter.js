
import React from 'react'

import Modal from '../../../common/modal'
import Button from '../../../common/button'
import Container from '../../../common/container'
import TextInput from '../../../common/text_input'
import { Form } from 'semantic-ui-react'

const AddExternalRoutinePresenter = ({ magnitudes, error, onUpdateMagnitudes, onClose, onSubmit }) => {
  return (
    <Modal
      open
      onClose={onClose}
      size='large'
      title='Agregar lecturas externas'
    >
      <Modal.Content>
        <Form>
          <TextInput
            name='observancy'
            error={error}
            label='Observancia'
            required
            type='number'
            min={0}
            onChange={observancy => onUpdateMagnitudes({ ...magnitudes, observancy })}
          />
          <TextInput
            name='substratum'
            error={error}
            label='Sustrato'
            required
            type='number'
            min={0}
            onChange={substratum => onUpdateMagnitudes({ ...magnitudes, substratum })}
          />
          <TextInput
            name='biomass'
            error={error}
            label='Biomasa'
            required
            type='number'
            min={0}
            onChange={biomass => onUpdateMagnitudes({ ...magnitudes, biomass })}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Container row end noPadding>
          <Button onClick={onClose}>Cancelar</Button>
          <Button primary onClick={onSubmit}>Agregar</Button>
        </Container>
      </Modal.Actions>
    </Modal>
  )
}

export default AddExternalRoutinePresenter
