import { call, put } from 'redux-saga/effects'
import {
  pushAcidFailure,
  pushAcidSuccess,
  testAcidDropFailure,
  testAcidDropSuccess,
  pushBaseFailure,
  pushBaseSuccess,
  testBaseDropFailure,
  testBaseDropSuccess
} from '../actions'

export function * performPushAcid (httpService) {
  try {
    yield call([httpService, 'pushAcid'])
    yield put(pushAcidSuccess())
  } catch (error) {
    yield put(pushAcidFailure(error))
  }
}

export function * performTestAcidDrop (httpService) {
  try {
    yield call([httpService, 'testAcidDrop'])
    yield put(testAcidDropSuccess())
  } catch (error) {
    yield put(testAcidDropFailure(error))
  }
}

export function * performPushBase (httpService) {
  try {
    yield call([httpService, 'pushBase'])
    yield put(pushBaseSuccess())
  } catch (error) {
    yield put(pushBaseFailure(error))
  }
}

export function * performTestBaseDrop (httpService) {
  try {
    yield call([httpService, 'testBaseDrop'])
    yield put(testBaseDropSuccess())
  } catch (error) {
    yield put(testBaseDropFailure(error))
  }
}
