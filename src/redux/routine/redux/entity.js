import { combineReducers } from 'redux'

import {
  FETCH_ROUTINES_SUCCESS,
  CREATE_ROUTINE_SUCCESS,
  UPDATE_ROUTINE_SUCCESS,
  DESTROY_ROUTINE_SUCCESS
} from '../action_types'
import * as readingActionTypes from '../../reading/action_types'
import {
  merge,
  replaceByIdEntries,
  addByIdEntry,
  updateByIdEntry,
  replaceAllEntriesIds,
  addEntryId,
  updateByIdEntries,
  removeEntryId
} from '../../helper'
import { groupBy, flatten, omit } from 'lodash'

const INITIAL_STATE_BY_ID = {}

const routinesById = (state = INITIAL_STATE_BY_ID, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE_BY_ID

    case FETCH_ROUTINES_SUCCESS: return replaceRoutines(state, action)
    case CREATE_ROUTINE_SUCCESS: return addRoutine(state, action)
    case UPDATE_ROUTINE_SUCCESS: return updateRoutine(state, action)
    case DESTROY_ROUTINE_SUCCESS: return removeRoutine(state, action)
    case readingActionTypes.FETCH_ROUTINE_READINGS_SUCCESS: return replaceRoutineReadings(state, action)

    case readingActionTypes.ADD_READING: return addRoutineReading(state, action)
    case readingActionTypes.MERGE_READINGS: return mergeRoutinesReadings(state, action)

    default: return state
  }
}

const replaceRoutines = (state, { routines }) =>
  replaceByIdEntries(state, routines.reverse().map(({
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
    readings: []
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
    readings: []
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

const mergeRoutinesReadings = (state, { readings }) => {
  const readingsByRoutine = Object.entries(groupBy(readings, 'routineId'))
  return updateByIdEntries(state, readingsByRoutine.map(([routineIdKey, readings]) => {
    const readingsIds = flatten(readings.map(({ readingsIds }) => readingsIds))
    const routineId = parseInt(routineIdKey)
    return {
      id: routineId,
      readings: state[routineId].readings
        .filter(readingId => !readingsIds.includes(readingId))
        .concat(readings.map(({ readingsIds }) => readingsIds.toString()))
    }
  }))
}

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
