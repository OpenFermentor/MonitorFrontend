import routineSagas from './routine/sagas'
import sensorsSagas from './sensors/sagas'
import readingSagas from './reading/sagas'
import systemSagas from './system/sagas'
import phCalibrationSagas from './calibration/ph/sagas'
import pumpCalibrationSagas from './calibration/pump/sagas'

export default function * root () {
  yield [
    ...routineSagas,
    ...sensorsSagas,
    ...readingSagas,
    ...phCalibrationSagas,
    ...pumpCalibrationSagas,
    ...systemSagas
  ]
}
