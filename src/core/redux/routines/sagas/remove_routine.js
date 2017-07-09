import { call, put } from 'redux-saga/effects'
import {
  destroyRoutineFailure,
  destroyRoutineSuccess
} from '../actions'

export default function * performRemoveRoutines (httpService, { routine }) {
  try {
    yield call(httpService.removeRoutine, routine.id)
    yield put(destroyRoutineSuccess(routine))
  } catch (error) {
    yield put(destroyRoutineFailure(error))
  }
}
