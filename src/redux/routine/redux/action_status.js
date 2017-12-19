import buildActionStatusReducer from '../../helper/action_status_builder'
import {
  merge
} from '../../helper'

import upsertActionStatusReducer from './upsert_action_status'

import reduceReducers from 'reduce-reducers'
import {
  START_ROUTINE_SUCCESS,
  STOP_ROUTINE_SUCCESS,
  SET_DATA_RANGE,
  SET_SELECTED_ROUTINE,
  CLEAR_SELECTED_ROUTINE,

  FETCH_SUCCESS,
  FETCH_ROUTINES_REQUEST,
  FETCH_ROUTINES_SUCCESS,
  SEARCH_SUCCESS,
  CLEAR_SEARCH
} from '../action_types'

const requestReducer = buildActionStatusReducer({
  namespace: 'ROUTINES.',
  prefix: 'ROUTINE',
  pluralPrefix: 'ROUTINES',
  index: true,
  get: true,
  create: true,
  update: true,
  remove: true,
  extraActions: [
    'ROUTINES.START_ROUTINE',
    'ROUTINES.STOP_ROUTINE',
    'ROUTINES.SEARCH',
    'ROUTINES.SET_SELECTED_ROUTINE',
    'ROUTINES.FETCH_ROUTINE_CALCULATIONS'
  ]
})

const INITIAL_STATE = {
  runningRoutine: null,
  searchTerm: null,
  searchResults: null,
  selectedRoutine: null,
  dataRangeStart: null,
  dataRangeEnd: null,
  pagination: null
}

const actionStatusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RESET': return merge(state, INITIAL_STATE)

    case START_ROUTINE_SUCCESS: return setRunningRoutine(state, action)
    case STOP_ROUTINE_SUCCESS: return clearRunningRoutine(state, action)
    case SET_DATA_RANGE: return setDataRange(state, action)

    case SET_SELECTED_ROUTINE: return setSelectedRoutine(state, action)
    case FETCH_SUCCESS: return setSelectedRoutine(state, action)
    case CLEAR_SELECTED_ROUTINE: return clearSelectedRoutine(state, action)

    case FETCH_ROUTINES_REQUEST: return clearSelectedRoutine(state, action)
    case FETCH_ROUTINES_SUCCESS: return addRoutinesPagination(state, action)

    case SEARCH_SUCCESS: return setSearchResults(state, action)
    case CLEAR_SEARCH: return clearSearchResults(state, action)

    default: return state
  }
}

const setRunningRoutine = (state, { routine }) =>
  merge(state, { runningRoutine: routine.id, dataRangeStart: null, dataRangeEnd: null })

const clearRunningRoutine = state =>
  merge(state, { runningRoutine: null })

const setDataRange = (state, { start, end }) =>
  merge(state, { dataRangeStart: start, dataRangeEnd: end })

const clearSelectedRoutine = state =>
  merge(state, { selectedRoutine: null })

const setSelectedRoutine = (state, { routine }) =>
  merge(state, { selectedRoutine: routine.id })

const clearSearchResults = state =>
merge(state, { searchResults: null })

const setSearchResults = (state, { searchResults }) =>
  merge(state, { searchResults })

const addRoutinesPagination = (state, { pagination }) =>
  merge(state, {
    pagination: {
      page: parseInt(pagination.page),
      perPage: parseInt(pagination.perPage),
      maxPage: parseInt(pagination.maxPage),
      totalCount: parseInt(pagination.totalCount)
    }
  })

const upsertReducer = (state, action) => {
  if (!state) {
    return { upsert: upsertActionStatusReducer(undefined, action) }
  }
  return merge(state, {
    upsert: upsertActionStatusReducer(state.upsert, action)
  })
}

export default reduceReducers(requestReducer, actionStatusReducer, upsertReducer)
