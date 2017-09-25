import { takeEvery } from 'redux-saga/effects'
import httpService from '../../../../networking'

import {
  START_PH_METER_CALIBRATION
} from '../action_types.js'
import { performPhMeterCalibration } from './perform'

export default [
  takeEvery(START_PH_METER_CALIBRATION, performPhMeterCalibration, httpService)
]
