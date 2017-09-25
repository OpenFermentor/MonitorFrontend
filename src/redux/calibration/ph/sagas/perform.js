import { call, put, take, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  calibrationSuccess,
  calibrationFailure,
  setCurrentCalibration,
  finishPhMeterCalibration
} from '../actions'

import {
  START_CALIBRATION,
  CALIBRATION_FAILURE,
  CALIBRATION_SUCCESS
} from '../action_types.js'

const INITIAL_STATUS_REQUEST_DELAY = 1000
const STATUS_REQUEST_DELAY = 3000

export function * performPhMeterCalibration (httpService) {
  yield * calibrate('neutral', httpService)
  yield * calibrate('acid', httpService)
  yield * calibrate('base', httpService)
  yield put(finishPhMeterCalibration())
}

function * calibrate (value, httpService) {
  yield put(setCurrentCalibration(value))
  while (true) {
    yield take(START_CALIBRATION)
    const { success } = yield race({
      calibration: call(performCalibration, value, httpService),
      failure: take(CALIBRATION_FAILURE),
      success: take(CALIBRATION_SUCCESS)
    })
    if (success) {
      return
    }
  }
}

function * performCalibration (value, httpService) {
  yield * startCalibration(value, httpService)
  yield * watchCalibrationStatus(httpService)
}

function * startCalibration (value, httpService) {
  try {
    yield call([httpService, 'startCalibration'], value)
  } catch (error) {
    yield put(calibrationFailure(error))
  }
}

function * watchCalibrationStatus (httpService) {
  yield call(delay, INITIAL_STATUS_REQUEST_DELAY)
  while (true) {
    yield call(fetchCalibrationStatus, httpService)
    yield call(delay, STATUS_REQUEST_DELAY)
  }
}

function * fetchCalibrationStatus (httpService) {
  try {
    const response = yield call([httpService, 'calibrationStatus'])
    const { calibrationStatus } = response.data
    if (calibrationStatus === 'error') {
      yield put(calibrationFailure('Se produjo un error en la calibración'))
    }
    if (calibrationStatus === 'ok') {
      yield put(calibrationSuccess())
    }
  } catch (error) {
    yield put(calibrationFailure(error))
  }
}
