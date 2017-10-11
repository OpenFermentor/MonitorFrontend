import { combineReducers } from 'redux'

import routineReducer from './routine/redux'
import readingReducer from './reading/redux'
import sensorsReducer from './sensors/redux'
import alertReducer from './alert/redux'
import bootReducer from './boot/redux'
import phCalibrationReducer from './calibration/ph/redux'
import systemReducer from './system/redux'

const entities = combineReducers({
  routine: routineReducer.entity,
  reading: readingReducer.entity,
  alert: alertReducer.entity
})

const actionStatus = combineReducers({
  routine: routineReducer.actionStatus,
  reading: readingReducer.actionStatus,
  boot: bootReducer.actionStatus,
  sensors: sensorsReducer.actionStatus,
  phCalibration: phCalibrationReducer.actionStatus,
  system: systemReducer.actionStatus
})

const rootReducer = combineReducers({
  entities,
  actionStatus
})

export default rootReducer
