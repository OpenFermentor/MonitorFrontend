import { call, put } from 'redux-saga/effects'
import {
  updateRoutineFailure,
  updateRoutineSuccess
} from '../actions'

export default function * performUpdateRoutines (httpService, { routine }) {
  try {
    const response = yield call(httpService.updateRoutine, routine)
    yield put(updateRoutineSuccess(response.data.data))
  } catch (error) {
    yield put(updateRoutineFailure(error))
  }
}
