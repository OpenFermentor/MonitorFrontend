import React from 'react'
import './styles.css'

import Toolbar from '../../common/toolbar'
import Stepper from './stepper'
import Calibration from './calibration'

const PhCalibrationPresenter = ({ currentValue, inProgress, error, finished, onStartCalibration, onFinish, onCancel }) => (
  <div className='phCalibration'>

    <Toolbar
      title='Calibración ph-metro'
      rightTitle='Cancelar'
      onClickRight={onCancel}
    />

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
