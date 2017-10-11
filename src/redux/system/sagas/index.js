import { takeEvery } from 'redux-saga/effects'
import httpService from '../../../networking'

import {
  RESTART_REQUEST
} from '../action_types'
import {
  performSystemRestart
} from './perform'

export default [
  takeEvery(RESTART_REQUEST, performSystemRestart, httpService)
]
