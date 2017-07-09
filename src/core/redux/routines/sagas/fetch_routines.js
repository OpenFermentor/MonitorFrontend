import { call, put } from 'redux-saga/effects'
import {
  fetchRoutinesFailure,
  fetchRoutinesSuccess
} from '../actions'

export default function * performFetchRoutines (httpService) {
  try {
    const response = yield call(httpService.getRoutines)
    yield put(fetchRoutinesSuccess(response.data.data))
  } catch (error) {
    yield put(fetchRoutinesFailure(error))
  }
}
