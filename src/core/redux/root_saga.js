import routineSagas from './routine/sagas'

export default function * root () {
  yield [
    ...routineSagas
  ]
}
