import React from 'react'
import './styles.css'

import Container from '../../common/container'
import Button from '../../common/button'
import Stepper from './stepper'
import Calibration from './calibration'

const PhCalibrationPresenter = ({ currentValue, inProgress, error, finished, onStartCalibration, onFinish, onCancel }) => (
  <div className='phCalibration'>

    <Container row end>
      <Button onClick={onCancel}>Cancelar</Button>
    </Container>

    <Stepper currentValue={currentValue} />

    <Calibration
      currentValue={currentValue}
      inProgress={inProgress}
      error={error}
      finished={finished}
      onStart={onStartCalibration}
      onFinish={onFinish}
    />

  </div>
)

export default PhCalibrationPresenter
