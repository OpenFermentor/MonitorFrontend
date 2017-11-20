import { combineReducers } from 'redux'

import routineReducer from './routine/redux'
import readingReducer from './reading/redux'
import sensorsReducer from './sensors/redux'
import alertReducer from './alert/redux'
import bootReducer from './boot/redux'
import phCalibrationReducer from './calibration/ph/redux'
import pumpCalibrationReducer from './calibration/pump/redux'
import systemReducer from './system/redux'
import routineLogEntryReducer from './routine_log_entry/redux'

const entities = combineReducers({
  routine: routineReducer.entity,
  reading: readingReducer.entity,
  alert: alertReducer.entity,
  routineLogEntry: routineLogEntryReducer.entity
})

const actionStatus = combineReducers({
  routine: routineReducer.actionStatus,
  reading: readingReducer.actionStatus,
  boot: bootReducer.actionStatus,
  sensors: sensorsReducer.actionStatus,
  phCalibration: phCalibrationReducer.actionStatus,
  pumpCalibration: pumpCalibrationReducer.actionStatus,
  system: systemReducer.actionStatus,
  routineLogEntry: routineLogEntryReducer.actionStatus
})

const rootReducer = combineReducers({
  entities,
  actionStatus
})

export default rootReducer
