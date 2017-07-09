import { call, put } from 'redux-saga/effects'
import {
  stopRunningRoutineFailure,
  stopRunningRoutineSuccess
} from '../actions'

export default function * performStopRoutine (httpService) {
  try {
    yield call(httpService.stopRunningRoutine)
    yield put(stopRunningRoutineSuccess())
  } catch (error) {
    yield put(stopRunningRoutineFailure(error))
  }
}
