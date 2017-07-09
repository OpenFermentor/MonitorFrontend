import { takeEvery } from 'redux-saga'

import {
  STOP_ROUTINE_REQUEST,
  START_ROUTINE_REQUEST,
  FETCH_ROUTINES_REQUEST,
  CREATE_ROUTINE_REQUEST,
  UPDATE_ROUTINE_REQUEST,
  DESTROY_ROUTINE_REQUEST
} from '../action_types'
import httpService from '../../../networking'

import performStopRoutine from './stop_routine'
import performStartRoutine from './start_routine'
import performFetchRoutines from './fetch_routines'
import performCreateRoutines from './create_routine'
import performUpdateRoutines from './update_routine'
import performRemoveRoutines from './remove_routine'

export default [
  takeEvery(STOP_ROUTINE_REQUEST, performStopRoutine, httpService),
  takeEvery(START_ROUTINE_REQUEST, performStartRoutine, httpService),
  takeEvery(FETCH_ROUTINES_REQUEST, performFetchRoutines, httpService),
  takeEvery(CREATE_ROUTINE_REQUEST, performCreateRoutines, httpService),
  takeEvery(UPDATE_ROUTINE_REQUEST, performUpdateRoutines, httpService),
  takeEvery(DESTROY_ROUTINE_REQUEST, performRemoveRoutines, httpService)
]
