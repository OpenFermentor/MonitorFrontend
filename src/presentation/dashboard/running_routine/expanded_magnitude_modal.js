
import React from 'react'

import Modal from '../../common/modal'
import SensorChart from '../../common/sensor_chart'

const ExpandedMagnitudeModal = ({ title, magnitude, timeline, onClose }) => {
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
    </Modal>
  )
}

export default ExpandedMagnitudeModal
