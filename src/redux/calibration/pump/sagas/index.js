import { takeEvery } from 'redux-saga/effects'
import httpService from '../../../../networking'

import {
  PUSH_ACID_REQUEST,
  TEST_ACID_DROP_REQUEST,
  PUSH_BASE_REQUEST,
  TEST_BASE_DROP_REQUEST
} from '../action_types'
import {
  performPushAcid,
  performTestAcidDrop,
  performPushBase,
  performTestBaseDrop
} from './perform'

export default [
  takeEvery(PUSH_ACID_REQUEST, performPushAcid, httpService),
  takeEvery(TEST_ACID_DROP_REQUEST, performTestAcidDrop, httpService),
  takeEvery(PUSH_BASE_REQUEST, performPushBase, httpService),
  takeEvery(TEST_BASE_DROP_REQUEST, performTestBaseDrop, httpService)
]
