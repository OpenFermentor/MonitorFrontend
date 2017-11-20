import alertSagas from './alert/sagas'
import routineSagas from './routine/sagas'
import sensorsSagas from './sensors/sagas'
import readingSagas from './reading/sagas'
import systemSagas from './system/sagas'
import phCalibrationSagas from './calibration/ph/sagas'
import pumpCalibrationSagas from './calibration/pump/sagas'
import routineLogEntrySagas from './routine_log_entry/sagas'

export default function * root () {
  yield [
    ...alertSagas,
    ...routineSagas,
    ...sensorsSagas,
    ...readingSagas,
    ...phCalibrationSagas,
    ...pumpCalibrationSagas,
    ...systemSagas,
    ...routineLogEntrySagas
  ]
}
