import {
  RESTART_REQUEST,
  RESTART_FAILURE,
  RESTART_SUCCESS
} from './action_types.js'

export const restartRequest = () => ({ type: RESTART_REQUEST })
export const restartFailure = error => ({ type: RESTART_FAILURE, error })
export const restartSuccess = () => ({ type: RESTART_SUCCESS })
