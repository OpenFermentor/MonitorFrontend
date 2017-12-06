import { takeEvery } from 'redux-saga/effects'
import httpService from '../../../networking'

import {
  FETCH_ROUTINE_READINGS_REQUEST, CREATE_EXTERNAL_READING_REQUEST
} from '../action_types'
import {
  FETCH_SUCCESS
} from '../../routine/action_types.js'
import {
  performFetchRoutineReadings,
  performCreateExternalReading
} from './perform'

export default [
  takeEvery(FETCH_ROUTINE_READINGS_REQUEST, performFetchRoutineReadings, httpService),
  takeEvery(CREATE_EXTERNAL_READING_REQUEST, performCreateExternalReading, httpService),
  takeEvery(FETCH_SUCCESS, performFetchRoutineReadings, httpService)
]
