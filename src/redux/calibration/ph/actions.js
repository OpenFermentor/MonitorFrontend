import {
  START_PH_METER_CALIBRATION,
  FINISH_PH_METER_CALIBRATION,
  SET_CURRENT_CALIBRATION,
  START_CALIBRATION,
  CALIBRATION_FAILURE,
  CALIBRATION_SUCCESS
} from './action_types.js'

export const startPhMeterCalibration = () => ({ type: START_PH_METER_CALIBRATION })
export const finishPhMeterCalibration = () => ({ type: FINISH_PH_METER_CALIBRATION })

export const startCalibration = () => ({ type: START_CALIBRATION })
export const setCurrentCalibration = value => ({ type: SET_CURRENT_CALIBRATION, value })

export const calibrationFailure = error => ({ type: CALIBRATION_FAILURE, error })
export const calibrationSuccess = () => ({ type: CALIBRATION_SUCCESS })
