import { call, put } from 'redux-saga/effects'

import {
  fetchRoutineReadingsFailure,
  fetchRoutineReadingsSuccess
} from '../actions'

export function * performFetchRoutineReadings (httpService, { routine }) {
  try {
    const response = yield call([httpService, 'getRoutineReadings'], routine)
    yield put(fetchRoutineReadingsSuccess(routine, response.data.data))
  } catch (error) {
    yield put(fetchRoutineReadingsFailure(error))
  }
}
