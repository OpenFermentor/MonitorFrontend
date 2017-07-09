import { call, put } from 'redux-saga/effects'
import {
  createRoutineFailure,
  createRoutineSuccess
} from '../actions'

export default function * performCreateRoutines (httpService, { routine }) {
  try {
    const response = yield call(httpService.createRoutine, routine)
    yield put(createRoutineSuccess(response.data.data))
  } catch (error) {
    yield put(createRoutineFailure(error))
  }
}
