import { call, put } from 'redux-saga/effects'

import {
  fetchRoutineReadingsFailure,
  fetchRoutineReadingsSuccess,
  createExternalReadingSuccess,
  createExternalReadingFailure
} from '../actions'
import { addAlert } from '../../alert/actions'

export function * performFetchRoutineReadings (httpService, { routine }) {
  try {
    const response = yield call([httpService, 'getRoutineReadings'], routine)
    yield put(fetchRoutineReadingsSuccess(routine, response.data.data))
  } catch (error) {
    yield put(fetchRoutineReadingsFailure(error))
  }
}

export function * performCreateExternalReading (httpService, { routine, reading }) {
  try {
    const response = yield call([httpService, 'createReading'], routine, reading)
    yield put(createExternalReadingSuccess(response.data.data))
    yield put(addAlert({ message: 'La lectura se creó con éxito', messageType: 'success' }))
  } catch (error) {
    yield put(createExternalReadingFailure(error))
  }
}
