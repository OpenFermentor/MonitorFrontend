import { combineReducers } from 'redux'
import moment from 'moment';
import { omitBy } from 'lodash'
import reduceReducers from 'reduce-reducers'
import {
  ADD_READING,
  FETCH_ROUTINE_READINGS_SUCCESS,
  CREATE_EXTERNAL_READING_SUCCESS
} from '../action_types'
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
    case CREATE_EXTERNAL_READING_SUCCESS: return addReading(state, action)
    default: return state
  }
}

const addReading = (state, { reading }) =>
  addByIdEntry(state, {
    id: reading.id,
    routineId: reading.routineId,
    insertedAt: reading.insertedAt,
    temp: reading.temp || findLastMagnitudeValue(state, 'temp', reading.routineId),
    ph: reading.ph || findLastMagnitudeValue(state, 'ph', reading.routineId),
    product: reading.product || findLastMagnitudeValue(state, 'product', reading.routineId),
    biomass: reading.biomass || findLastMagnitudeValue(state, 'biomass', reading.routineId),
    substratum: reading.substratum || findLastMagnitudeValue(state, 'substratum', reading.routineId)
  })

const findLastMagnitudeValue = (state, magnitude, routineId) =>
  (Object.values(state)
    .filter(r => r.routineId === routineId)
    .sort(r => moment(r.insertedAt))
    .find(reading => reading[magnitude]) || { [magnitude]: null })[magnitude]

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
      temp: reading.temp || findLastMagnitudeValue(state.byId, 'temp', reading.routineId),
      ph: reading.ph || findLastMagnitudeValue(state.byId, 'ph', reading.routineId),
      product: reading.product || findLastMagnitudeValue(state.byId, 'product', reading.routineId),
      biomass: reading.biomass || findLastMagnitudeValue(state.byId, 'biomass', reading.routineId),
      substratum: reading.substratum || findLastMagnitudeValue(state.byId, 'substratum', reading.routineId)
    }))),
    allIds: addEntriesIds(state.allIds.filter(id => state.byId[id].routineId !== routine.id), readings)
  })

export default reduceReducers(reducer, routineReducer)
