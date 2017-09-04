import { combineReducers } from 'redux'
import Immutable from 'seamless-immutable'
import reduceReducers from 'reduce-reducers'
import _ from 'lodash'
import {
  ADD_READING,
  FETCH_ROUTINE_READINGS_SUCCESS,
  MERGE_READINGS
} from '../action_types'
import * as routineActionTypes from '../../routine/action_types'
import {
  addByIdEntries,
  addByIdEntry,
  addEntryId,
  addEntriesIds
} from '../../../library/redux_entity_operations'

const INITIAL_STATE_BY_ID = Immutable({})

const byIdReducer = (state = INITIAL_STATE_BY_ID, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE_BY_ID
    case ADD_READING: return addReading(state, action)
    case MERGE_READINGS: return mergeReadings(state, action)
    default: return state
  }
}

const addReading = (state, { reading }) =>
  addByIdEntry(state, {
    id: reading.id,
    routineId: reading.routineId,
    insertedAt: reading.insertedAt,
    temp: reading.temp || 0,
    ph: reading.ph || 0,
    density: reading.density || 0,
    co2: reading.co2 || 0
  })

const mergeReadings = (state, { readings }) => {
  const readingsIds = _.flatten(readings.map(({ readingsIds }) => readingsIds))
  return addByIdEntries(
    state.without(readingsIds), readings.map(reading => ({
      id: reading.readingsIds.toString(),
      routineId: reading.routineId,
      insertedAt: reading.insertedAtValue,
      temp: reading.temp || 0,
      ph: reading.ph || 0,
      density: reading.density || 0,
      co2: reading.co2 || 0,
      merged: true
    })))
}

const INITIAL_STATE_ALL_IDS = Immutable([])

const allIdsReducer = (state = INITIAL_STATE_ALL_IDS, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE_ALL_IDS
    case ADD_READING: return addEntryId(state, action.reading)
    case MERGE_READINGS: return mergeReadingsIds(state, action)
    default: return state
  }
}

const mergeReadingsIds = (state, { readings }) => {
  const readingsIds = _.flatten(readings.map(({ readingsIds }) => readingsIds))
  return state
    .filter(readingId => !readingsIds.includes(readingId))
    .concat(readings.map(({ readingsIds }) => readingsIds.toString()))
}

const reducer = combineReducers({
  byId: byIdReducer,
  allIds: allIdsReducer
})

const routineReducer = (state = { byId: Immutable({}), allIds: Immutable([]) }, action) => {
  switch (action.type) {
    case routineActionTypes.FETCH_ROUTINES_SUCCESS: return INITIAL_STATE_BY_ID
    case FETCH_ROUTINE_READINGS_SUCCESS: return replaceRoutineReadings(state, action)
    default: return state
  }
}

const replaceRoutineReadings = (state, { routine, readings }) =>
  ({
    byId: addByIdEntries(state.byId.without(({routineId}) => routineId === routine.id), readings.map(reading => ({
      id: reading.id,
      routineId: reading.routineId,
      insertedAt: reading.insertedAt,
      temp: reading.temp,
      ph: reading.ph,
      co2: reading.co2,
      density: reading.density
    }))),
    allIds: addEntriesIds(state.allIds.filter(id => state.byId[id].routineId !== routine.id), readings)
  })

export default reduceReducers(reducer, routineReducer)
