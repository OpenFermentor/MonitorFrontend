import routineSagas from './routine/sagas'
import sensorsSagas from './sensors/sagas'
import readingSagas from './reading/sagas'

export default function * root () {
  yield [
    ...routineSagas,
    ...sensorsSagas,
    ...readingSagas
  ]
}
