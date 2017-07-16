import routineSagas from './routine/sagas'
import sensorsSagas from './sensors/sagas'

export default function * root () {
  yield [
    ...routineSagas,
    ...sensorsSagas
  ]
}
