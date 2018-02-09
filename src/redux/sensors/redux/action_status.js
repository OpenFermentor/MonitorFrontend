import {
  SENSORS_ERROR,
  STATUS_UPDATE
} from '../action_types'

import {
  merge
} from '../../helper'

const INITIAL_STATE = {
  sensors: {},
  statusLoaded: false,
  error: null
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SENSORS_ERROR: return sensorsError(state, action)
    case STATUS_UPDATE: return sensorsStatusUpdate(state, action)
    default: return state
  }
}

const sensorsError = (state, { error }) =>
  merge(state, { error, statusLoaded: true })

const sensorsStatusUpdate = (state, { sensors }) =>
  merge(state, { error: null, sensors, statusLoaded: true })

export default reducer
