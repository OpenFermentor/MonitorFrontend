import { takeEvery } from 'redux-saga/effects'
import httpService from '../../../networking'

import {
  FETCH_ROUTINE_READINGS_REQUEST
} from '../action_types'
import {
  FETCH_SUCCESS
} from '../../routine/action_types.js'
import {
  performFetchRoutineReadings,
  performMergeOldReadings
} from './perform'

export default [
  takeEvery(FETCH_ROUTINE_READINGS_REQUEST, performFetchRoutineReadings, httpService),
  takeEvery(FETCH_SUCCESS, performFetchRoutineReadings, httpService),
  takeEvery('BOOTED', performMergeOldReadings)
]
