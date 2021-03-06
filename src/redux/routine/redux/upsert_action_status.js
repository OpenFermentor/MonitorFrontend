import {
  merge
} from '../../helper'
import generateRandomId from '../../../library/random_id'

import {
  UPSERT_SET_CURRENT_SECTION,
  UPSERT_ADD_TEMPERATURE_RANGE,
  UPSERT_SET_TEMPERATURE_RANGE,
  UPSERT_REMOVE_TEMPERATURE_RANGE,
  UPSERT_UPDATE_ROUTINE,
  UPSERT_START_CREATION,
  UPSERT_START_EDITION,
  CREATE_ROUTINE_SUCCESS,
  UPDATE_ROUTINE_SUCCESS,
  CLEAR_SELECTED_ROUTINE
} from '../action_types'

const INITIAL_STATE = {
  currentSection: 'details',
  operation: null,
  routine: {},
  tempRanges: []
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_SELECTED_ROUTINE: return INITIAL_STATE
    case CREATE_ROUTINE_SUCCESS: return INITIAL_STATE
    case UPDATE_ROUTINE_SUCCESS: return INITIAL_STATE

    case UPSERT_START_CREATION: return startCreation(state, action)
    case UPSERT_START_EDITION: return startEdition(state, action)

    case UPSERT_SET_CURRENT_SECTION: return setCurentSection(state, action)

    case UPSERT_UPDATE_ROUTINE: return updateRoutine(state, action)

    case UPSERT_ADD_TEMPERATURE_RANGE: return addTemperatureRange(state, action)
    case UPSERT_SET_TEMPERATURE_RANGE: return setTemperatureRange(state, action)
    case UPSERT_REMOVE_TEMPERATURE_RANGE: return removeTemperatureRange(state, action)

    default: return state
  }
}

const startCreation = () =>
  merge(INITIAL_STATE, { operation: 'creation', routine: {} })

const startEdition = (state, { routine }) =>
  merge(INITIAL_STATE, {
    operation: 'edition',
    routine: merge(state.routine, routine),
    tempRanges: routine.tempRanges.map(tempRange => ({
      id: generateRandomId(),
      ...tempRange
    }))
  })

const setCurentSection = (state, { currentSection }) =>
  merge(state, { currentSection })

const updateRoutine = (state, { routine }) =>
  merge(state, { routine: merge(state.routine, routine) })

const addTemperatureRange = state =>
  merge(state, { tempRanges: state.tempRanges.concat([{
    id: generateRandomId(),
    temp: null,
    fromSecond: null
  }])})

const setTemperatureRange = (state, { tempRange }) =>
  merge(state, { tempRanges: state.tempRanges.map(existingTempRange => {
    if (existingTempRange.id !== tempRange.id) {
      return existingTempRange
    }
    return tempRange
  })})

const removeTemperatureRange = (state, { tempRange }) =>
 merge(state, { tempRanges: state.tempRanges.filter(({ id }) => id !== tempRange.id) })

export default reducer
