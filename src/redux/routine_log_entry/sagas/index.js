import { takeEvery } from 'redux-saga/effects'
import httpService from '../../../networking'

import {
  FETCH_ROUTINE_LOG_ENTRIES_REQUEST
} from '../action_types'
import {
  FETCH_SUCCESS
} from '../../routine/action_types.js'
import {
  performFetchRoutineLogEntries
} from './perform'

export default [
  takeEvery(FETCH_ROUTINE_LOG_ENTRIES_REQUEST, performFetchRoutineLogEntries, httpService),
  takeEvery(FETCH_SUCCESS, performFetchRoutineLogEntries, httpService)
]
