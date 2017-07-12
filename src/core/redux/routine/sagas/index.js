import { takeEvery } from 'redux-saga/effects'

import {
  STOP_ROUTINE_REQUEST,
  START_ROUTINE_REQUEST,
  FETCH_ROUTINES_REQUEST,
  CREATE_ROUTINE_REQUEST,
  UPDATE_ROUTINE_REQUEST,
  DESTROY_ROUTINE_REQUEST
} from '../action_types'
import httpService from '../../../networking'
import {
  performStopRoutine,
  performStartRoutine,
  performFetchRoutines,
  performCreateRoutine,
  performUpdateRoutine,
  performRemoveRoutine
} from './perform'

export default [
  takeEvery(STOP_ROUTINE_REQUEST, performStopRoutine, httpService),
  takeEvery(START_ROUTINE_REQUEST, performStartRoutine, httpService),
  takeEvery(FETCH_ROUTINES_REQUEST, performFetchRoutines, httpService),
  takeEvery(CREATE_ROUTINE_REQUEST, performCreateRoutine, httpService),
  takeEvery(UPDATE_ROUTINE_REQUEST, performUpdateRoutine, httpService),
  takeEvery(DESTROY_ROUTINE_REQUEST, performRemoveRoutine, httpService)
]
