import {
  SENSORS_ERROR,
  SENSORS_OPERATIVE
} from './action_types'

export const sensorsError = error => ({ type: SENSORS_ERROR, error })
export const sensorsOperative = () => ({ type: SENSORS_OPERATIVE })
