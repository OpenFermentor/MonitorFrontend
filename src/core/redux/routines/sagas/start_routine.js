import { call, put } from 'redux-saga/effects'
import {
  startRoutineFailure,
  startRoutineSuccess
} from '../actions'

export default function * performStartRoutine (httpService, { routine }) {
  try {
    yield call(httpService.startRoutine, routine)
    yield put(startRoutineSuccess(routine))
  } catch (error) {
    yield put(startRoutineFailure(error))
  }
}
