import { combineReducers } from 'redux'

import {
  FETCH_ROUTINES_SUCCESS,
  FETCH_SUCCESS,
  START_ROUTINE_SUCCESS,
  CREATE_ROUTINE_SUCCESS,
  UPDATE_ROUTINE_SUCCESS,
  DESTROY_ROUTINE_SUCCESS,
  FETCH_ROUTINE_CALCULATIONS_SUCCESS
} from '../action_types'
import * as readingActionTypes from '../../reading/action_types'
import * as routineLogEntryActionTypes from '../../routine_log_entry/action_types'
import {
  merge,
  replaceByIdEntries,
  addByIdEntry,
  updateByIdEntry,
  replaceAllEntriesIds,
  addEntryId,
  removeEntryId
} from '../../helper'
import { omit } from 'lodash'

const INITIAL_STATE_BY_ID = {}

const routinesById = (state = INITIAL_STATE_BY_ID, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE_BY_ID

    case FETCH_ROUTINES_SUCCESS: return replaceRoutines(state, action)
    case CREATE_ROUTINE_SUCCESS: return addRoutine(state, action)
    case UPDATE_ROUTINE_SUCCESS: return updateRoutine(state, action)
    case FETCH_ROUTINE_CALCULATIONS_SUCCESS: return addRoutineCalculations(state, action)
    case FETCH_SUCCESS: return updateRoutine(state, action)
    case START_ROUTINE_SUCCESS: return startRoutine(state, action)
    case DESTROY_ROUTINE_SUCCESS: return removeRoutine(state, action)
    case readingActionTypes.FETCH_ROUTINE_READINGS_SUCCESS: return replaceRoutineReadings(state, action)

    case readingActionTypes.ADD_READING: return addRoutineReading(state, action)
    case routineLogEntryActionTypes.FETCH_ROUTINE_LOG_ENTRIES_SUCCESS: return replaceRoutineLogEntries(state, action)

    default: return state
  }
}

const replaceRoutines = (state, { routines }) =>
  replaceByIdEntries(state, routines.reverse().map(routine => ({
    ...routine,
    calculations: {},
    readings: [],
    logEntries: []
  })))

const addRoutine = (state, { routine }) =>
  addByIdEntry(state, {
    ...routine,
    calculations: {},
    readings: [],
    logEntries: []
  })

const updateRoutine = (state, { routine }) =>
  updateByIdEntry(state, {
    ...routine,
    calculations: (state[routine.id] || {}).calculations || {},
    readings: (state[routine.id] || {}).readings || [],
    logEntries: (state[routine.id] || {}).logEntries || []
  })

const addRoutineCalculations = (state, { routine, calculations }) =>
  updateByIdEntry(state, {
    ...routine,
    calculations
  })

const startRoutine = (state, { routine }) =>
  updateByIdEntry(state, {
    ...routine,
    started: true
  })

const removeRoutine = (state, { routine }) =>
  omit(state, routine.id)

const addRoutineReading = (state, { reading }) =>
  merge(state, {
    [reading.routineId]: merge(state[reading.routineId], {
      readings: addEntryId(state[reading.routineId].readings, reading)
    })
  })

const replaceRoutineReadings = (state, { routine, readings }) =>
  updateByIdEntry(state, {
    id: routine.id,
    readings: replaceAllEntriesIds(state[routine.id].readings, readings)
  })

const replaceRoutineLogEntries = (state, { routine, logEntries }) =>
  updateByIdEntry(state, {
    id: routine.id,
    logEntries: replaceAllEntriesIds(state[routine.id].logEntries, logEntries)
  })

const INITIAL_STATE_ALL_IDS = []

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
