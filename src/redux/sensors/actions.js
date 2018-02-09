import {
  SENSORS_ERROR,
  STATUS_UPDATE
} from './action_types'

export const sensorsError = error => ({ type: SENSORS_ERROR, error })
export const sensorsStatusUpdate = sensors => ({ type: STATUS_UPDATE, sensors })
