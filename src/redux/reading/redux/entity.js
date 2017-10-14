import { combineReducers } from 'redux'
import { omitBy } from 'lodash'
import reduceReducers from 'reduce-reducers'
import {
  ADD_READING,
  FETCH_ROUTINE_READINGS_SUCCESS
} from '../action_types'
import * as routineActionTypes from '../../routine/action_types'
import {
  addByIdEntries,
  addByIdEntry,
  addEntryId,
  addEntriesIds
} from '../../helper'

const INITIAL_STATE_BY_ID = {}

const byIdReducer = (state = INITIAL_STATE_BY_ID, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE_BY_ID
    case ADD_READING: return addReading(state, action)
    default: return state
  }
}

const addReading = (state, { reading }) =>
  addByIdEntry(state, {
    id: reading.id,
    routineId: reading.routineId,
    insertedAt: reading.insertedAt,
    temp: reading.temp || 0,
    ph: reading.ph || 0
  })

const INITIAL_STATE_ALL_IDS = []

const allIdsReducer = (state = INITIAL_STATE_ALL_IDS, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE_ALL_IDS
    case ADD_READING: return addEntryId(state, action.reading)
    default: return state
  }
}

const reducer = combineReducers({
  byId: byIdReducer,
  allIds: allIdsReducer
})

const routineReducer = (state = { byId: {}, allIds: [] }, action) => {
  switch (action.type) {
    case routineActionTypes.FETCH_ROUTINES_SUCCESS: return INITIAL_STATE_BY_ID
    case FETCH_ROUTINE_READINGS_SUCCESS: return replaceRoutineReadings(state, action)
    default: return state
  }
}

const replaceRoutineReadings = (state, { routine, readings }) =>
  ({
    byId: addByIdEntries(omitBy(state.byId, ({routineId}) => routineId === routine.id), readings.map(reading => ({
      id: reading.id,
      routineId: reading.routineId,
      insertedAt: reading.insertedAt,
      temp: reading.temp,
      ph: reading.ph
    }))),
    allIds: addEntriesIds(state.allIds.filter(id => state.byId[id].routineId !== routine.id), readings)
  })

export default reduceReducers(reducer, routineReducer)
