import { combineReducers } from 'redux'
import Immutable from 'seamless-immutable'
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
} from '../../../library/redux_entity_operations'

const INITIAL_STATE_BY_ID = Immutable({})

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
    temp: reading.temp,
    insertedAt: reading.insertedAt
  })

const INITIAL_STATE_ALL_IDS = Immutable([])

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

const readingReducer = (state = { byId: Immutable({}), allIds: Immutable([]) }, action) => {
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
      temp: reading.temp,
      insertedAt: reading.insertedAt
    }))),
    allIds: addEntriesIds(state.allIds.filter(id => state.byId[id].routineId !== routine.id), readings)
  })

export default reduceReducers(reducer, readingReducer)
