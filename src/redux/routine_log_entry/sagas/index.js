import { takeEvery } from 'redux-saga/effects'
import httpService from '../../../networking'

import {
  FETCH_REQUEST
} from '../action_types'
import {
  performFetchRoutineLogEntries
} from './perform'

export default [
  takeEvery(FETCH_REQUEST, performFetchRoutineLogEntries, httpService)
]
