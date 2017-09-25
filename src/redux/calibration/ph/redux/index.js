import {
  merge
} from '../../../helper'

import {
  START_PH_METER_CALIBRATION,
  FINISH_PH_METER_CALIBRATION,
  SET_CURRENT_CALIBRATION,
  START_CALIBRATION,
  CALIBRATION_FAILURE,
  CALIBRATION_SUCCESS
} from '../action_types'

const INITIAL_STATE = {
  inProgress: false,
  error: null,
  finished: false,
  currentValue: 'neutral'
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BOTTED': return merge(state, INITIAL_STATE)
    case 'RESET': return merge(state, INITIAL_STATE)
    case START_PH_METER_CALIBRATION: return merge(state, INITIAL_STATE)
    case FINISH_PH_METER_CALIBRATION: return finishedPhMeterCalibration(state, action)

    case SET_CURRENT_CALIBRATION: return setCurrentCalibration(state, action)
    case START_CALIBRATION: return startCalibration(state, action)
    case CALIBRATION_FAILURE: return calibrationFailure(state, action)
    case CALIBRATION_SUCCESS: return calibrationSuccess(state, action)

    default: return state
  }
}

const finishedPhMeterCalibration = state =>
  merge(state, { finished: true })

const setCurrentCalibration = (state, { value }) =>
  merge(state, { currentValue: value })

const startCalibration = state =>
  merge(state, { inProgress: true, error: null })

const calibrationFailure = (state, { error }) =>
  merge(state, { inProgress: false, error })

const calibrationSuccess = state =>
  merge(state, { inProgress: false, error: null })

export default {
  actionStatus: reducer
}
