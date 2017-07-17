import Immutable from 'seamless-immutable'
import {
  ADD_READING
} from '../action_types'
import {
  START_ROUTINE_SUCCESS
} from '../../routine/action_types'

const INITIAL_STATE = Immutable({
  readings: Immutable([])
})

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE

    case START_ROUTINE_SUCCESS: return INITIAL_STATE
    case ADD_READING: return addReading(state, action)

    default: return state
  }
}

const addReading = (state, { temp, createdAt }) => {
  let readings = state.readings
  if (readings.length > 20) {
    readings = removeFirstReading(readings)
  }
  return state.merge({
    readings: readings.concat({ temp, createdAt })
  })
}

const removeFirstReading = readings =>
  readings.slice(1, readings.length - 1)

export default reducer
