import { takeEvery, takeLatest } from 'redux-saga/effects'
import socketService from '../../../networking/socket'
import httpService from '../../../networking'

import {
  STOP_ROUTINE_REQUEST,
  START_ROUTINE_REQUEST,
  FETCH_ROUTINES_REQUEST,
  SET_SELECTED_ROUTINE,
  FETCH_REQUEST,
  CREATE_ROUTINE_REQUEST,
  UPDATE_ROUTINE_REQUEST,
  DESTROY_ROUTINE_REQUEST,
  UPSERT_SUBMIT,
  SEARCH_REQUEST
} from '../action_types'
import {
  performStopRoutine,
  performStartRoutine,
  performFetchRoutines,
  performCreateRoutine,
  performUpdateRoutine,
  performRemoveRoutine,
  performFetchRoutine,
  performSubmitUpsert,
  performSearchRoutines,
  performResumeRunningRoutine
} from './perform'
import performRoutineChannelConnection from './perform_routine_channel_connection'

export default [
  takeEvery('BOOTED', performRoutineChannelConnection, socketService),
  takeEvery('BOOTED', performResumeRunningRoutine, httpService),
  takeEvery(STOP_ROUTINE_REQUEST, performStopRoutine, httpService),
  takeEvery(UPSERT_SUBMIT, performSubmitUpsert),
  takeEvery(START_ROUTINE_REQUEST, performStartRoutine, httpService),
  takeEvery(FETCH_ROUTINES_REQUEST, performFetchRoutines, httpService),
  takeEvery(FETCH_REQUEST, performFetchRoutine, httpService),
  takeEvery(SET_SELECTED_ROUTINE, performFetchRoutine, httpService),
  takeEvery(CREATE_ROUTINE_REQUEST, performCreateRoutine, httpService),
  takeEvery(UPDATE_ROUTINE_REQUEST, performUpdateRoutine, httpService),
  takeEvery(DESTROY_ROUTINE_REQUEST, performRemoveRoutine, httpService),
  takeLatest(SEARCH_REQUEST, performSearchRoutines, httpService)
]
