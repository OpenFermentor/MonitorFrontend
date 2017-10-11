import { call, put } from 'redux-saga/effects'
import {
  restartFailure,
  restartSuccess
} from '../actions'

export function * performSystemRestart (httpService) {
  try {
    yield call([httpService, 'systemRestart'])
    yield put(restartSuccess())
  } catch (error) {
    yield put(restartFailure(error))
  }
}
