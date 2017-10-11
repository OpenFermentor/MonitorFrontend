import {
  SENSORS_ERROR,
  SENSORS_OPERATIVE
} from '../action_types'

import {
  merge
} from '../../helper'

const INITIAL_STATE = {
  operative: false,
  error: null
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SENSORS_ERROR: return sensorsError(state, action)
    case SENSORS_OPERATIVE: return sensorsOperative(state, action)
    default: return state
  }
}

const sensorsError = (state, { error }) =>
  merge(state, { error, operative: false })

const sensorsOperative = state =>
  merge(state, { error: null, operative: true })

export default reducer
