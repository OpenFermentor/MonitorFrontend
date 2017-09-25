import routineSagas from './routine/sagas'
import sensorsSagas from './sensors/sagas'
import readingSagas from './reading/sagas'
import phCalibrationSagas from './calibration/ph/sagas'

export default function * root () {
  yield [
    ...routineSagas,
    ...sensorsSagas,
    ...readingSagas,
    ...phCalibrationSagas
  ]
}
