import { take, call, put, select, fork, cancel } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import moment from 'moment'
import {
  groupReadingsByDateFormat
} from '../helper'

import {
  fetchRoutineReadingsFailure,
  fetchRoutineReadingsSuccess,
  mergeReadings
} from '../actions'
import {
  selectRunningRoutineReadings
} from '../selector'
import {
  selectIsRunningRoutine
} from '../../routine/selector'
import {
  START_ROUTINE_SUCCESS,
  STOP_ROUTINE_SUCCESS
} from '../../routine/action_types'

const formatDateByMinute = date => moment(date).format('HH:mm')

export function * performFetchRoutineReadings (httpService, { routine }) {
  try {
    const response = yield call([httpService, 'getRoutineReadings'], routine)
    yield put(fetchRoutineReadingsSuccess(routine, response.data.data))
  } catch (error) {
    yield put(fetchRoutineReadingsFailure(error))
  }
}

export function * performMergeOldReadings () {
  const isRunningRoutine = yield select(selectIsRunningRoutine)
  if (!isRunningRoutine) {
    yield take(START_ROUTINE_SUCCESS)
  }
  const task = yield fork(mergeReadingsTask)
  yield take(STOP_ROUTINE_SUCCESS)
  yield cancel(task)
}

function * mergeReadingsTask () {
  while (true) {
    yield call(mergeOldReadings)
    yield call(delay, 3600000)
  }
}

function * mergeOldReadings () {
  const readings = yield select(selectRunningRoutineReadings)
  const oldUnmergedReadings = readings.slice(240).filter(reading => !reading.merged)
  const mergedReadings = groupReadingsByDateFormat(oldUnmergedReadings, formatDateByMinute)
  yield put(mergeReadings(mergedReadings))
}
