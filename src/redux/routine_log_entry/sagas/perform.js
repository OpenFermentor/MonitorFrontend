import { call, put } from 'redux-saga/effects'
import {
  fetchRoutineLogEntriesFailure,
  fetchRoutineLogEntriesSuccess
} from '../actions'

export function * performFetchRoutineLogEntries (httpService, { routine }) {
  try {
    const response = yield call([httpService, 'getRoutineLogEntries'], routine)
    yield put(fetchRoutineLogEntriesSuccess(routine, response.data.data))
  } catch (error) {
    yield put(fetchRoutineLogEntriesFailure(error))
  }
}
