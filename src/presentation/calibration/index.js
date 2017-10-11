import React from 'react'
import { Route } from 'react-router-dom'

import CalibrationHome from './home'
import PhCalibration from './ph'

const Calibration = ({ match }) => {
  return (
    <div>
      <Route exact path={match.url} component={CalibrationHome} />
      <Route path={match.url + '/ph'} component={PhCalibration} />
    </div>
  )
}

export default Calibration
