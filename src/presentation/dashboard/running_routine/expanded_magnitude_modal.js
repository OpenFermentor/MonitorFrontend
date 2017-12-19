
import React from 'react'

import Modal from '../../common/modal'
import SensorChart from '../../common/sensor_chart'
import Button from '../../common/button'
import Container from '../../common/container'

const isExternalMagnitude = magnitude => ['product', 'biomass', 'substratum'].includes(magnitude)

const ExpandedMagnitudeModal = ({ title, magnitude, timeline, onClose, onAddReadings }) => {
  return (
    <Modal
      open
      onClose={onClose}
      size='large'
      title={title}
    >
      <Modal.Content>
        <SensorChart
          magnitudes={[magnitude]}
          timeline={timeline}
          height={140}
        />

      </Modal.Content>
      { isExternalMagnitude(magnitude) &&
        <Modal.Actions>
          <Container row end noPadding>
            <Button primary onClick={onAddReadings}>Agregar lectura</Button>
          </Container>
        </Modal.Actions>
      }
    </Modal>
  )
}

export default ExpandedMagnitudeModal
