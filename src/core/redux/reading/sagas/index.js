import { takeEvery } from 'redux-saga/effects'
import httpService from '../../../networking'

import {
  FETCH_ROUTINE_READINGS_REQUEST
} from '../action_types'
import {
  performFetchRoutineReadings
} from './perform'

export default [
  takeEvery(FETCH_ROUTINE_READINGS_REQUEST, performFetchRoutineReadings, httpService)
]
