import { combineReducers } from 'redux'
import Immutable from 'seamless-immutable'
import {
  FETCH_ROUTINES_SUCCESS,
  CREATE_ROUTINE_SUCCESS,
  UPDATE_ROUTINE_SUCCESS,
  DESTROY_ROUTINE_SUCCESS,
  ADD_ROUTINE_READING
} from '../action_types'
import {
  replaceByIdEntries,
  addByIdEntry,
  updateByIdEntry,
  replaceAllEntriesIds,
  addEntryId,
  removeEntryId
} from '../../../library/redux_entity_operations'

const INITIAL_STATE_BY_ID = Immutable({})

const routinesById = (state = INITIAL_STATE_BY_ID, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE_BY_ID

    case FETCH_ROUTINES_SUCCESS: return replaceRoutines(state, action)
    case CREATE_ROUTINE_SUCCESS: return addRoutine(state, action)
    case UPDATE_ROUTINE_SUCCESS: return updateRoutine(state, action)
    case DESTROY_ROUTINE_SUCCESS: return removeRoutine(state, action)

    case ADD_ROUTINE_READING: return addRoutineReading(state, action)

    default: return state
  }
}

const replaceRoutines = (state, { routines }) =>
  replaceByIdEntries(state, routines.map(({
    id,
    title,
    strain,
    medium,
    targetTemp,
    targetPh,
    targetCo2,
    targetDensity,
    estimatedTimeSeconds,
    extraNotes
  }) => ({
    id,
    title,
    strain,
    medium,
    targetTemp,
    targetPh,
    targetCo2,
    targetDensity,
    estimatedTimeSeconds,
    extraNotes,
    readings: Immutable([])
  })))

const addRoutine = (state, { routine }) =>
  addByIdEntry(state, {
    id: routine.id,
    title: routine.title,
    strain: routine.strain,
    medium: routine.medium,
    targetTemp: routine.targetTemp,
    targetPh: routine.targetPh,
    targetCo2: routine.targetCo2,
    targetDensity: routine.targetDensity,
    estimatedTimeSeconds: routine.estimatedTimeSeconds,
    extraNotes: routine.extraNotes,
    readings: Immutable([])
  })

const updateRoutine = (state, { routine }) =>
  updateByIdEntry(state, {
    id: routine.id,
    title: routine.title,
    strain: routine.strain,
    medium: routine.medium,
    targetTemp: routine.targetTemp,
    targetPh: routine.targetPh,
    targetCo2: routine.targetCo2,
    targetDensity: routine.targetDensity,
    estimatedTimeSeconds: routine.estimatedTimeSeconds,
    extraNotes: routine.extraNotes
  })

const removeRoutine = (state, { routine }) =>
  state.without(routine.id)

const addRoutineReading = (state, { routineId, temp, createdAt }) =>
  state.merge({
    [routineId]: state[routineId].merge({
      readings: state[routineId].readings.concat({ temp, createdAt })
    })
  })

const INITIAL_STATE_ALL_IDS = Immutable([])

const allRoutinesIds = (state = INITIAL_STATE_ALL_IDS, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE_ALL_IDS

    case FETCH_ROUTINES_SUCCESS: return replaceAllEntriesIds(state, action.routines)
    case CREATE_ROUTINE_SUCCESS: return addEntryId(state, action.routine)
    case DESTROY_ROUTINE_SUCCESS: return removeEntryId(state, action.routine)

    default: return state
  }
}

export default combineReducers({
  byId: routinesById,
  allIds: allRoutinesIds
})
