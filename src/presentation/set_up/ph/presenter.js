import React from 'react'
import './styles.css'

import Calibration from './calibration'

const PhCalibrationPresenter = ({ currentValue, inProgress, error, finished, onStartCalibration, onFinish, onCancel }) => (
  <div className='phCalibration'>

    <Calibration
      currentValue={currentValue}
      inProgress={inProgress}
      error={error}
      finished={finished}
      onCancel={onCancel}
      onStart={onStartCalibration}
      onFinish={onFinish}
    />

  </div>
)

export default PhCalibrationPresenter
