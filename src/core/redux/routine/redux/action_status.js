import buildActionStatusReducer from '../../../library/action_status_reducer_builder'
import Immutable from 'seamless-immutable'
import reduceReducers from 'reduce-reducers'
import {
  START_ROUTINE_SUCCESS,
  STOP_ROUTINE_SUCCESS,
  SET_DATA_RANGE,
  SET_SELECTED_ROUTINE,
  CLEAR_SELECTED_ROUTINE
} from '../action_types'

const requestReducer = buildActionStatusReducer({
  namespace: 'ROUTINES.',
  prefix: 'ROUTINE',
  pluralPrefix: 'ROUTINES',
  index: true,
  create: true,
  update: true,
  remove: true,
  extraActions: ['ROUTINES.START_ROUTINE', 'ROUTINES.STOP_ROUTINE']
})

const INITIAL_STATE = Immutable({
  runningRoutine: null,
  selectedRoutine: null,
  dataRangeStart: null,
  dataRangeEnd: null
})

const appStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RESET': return state.merge(INITIAL_STATE)

    case START_ROUTINE_SUCCESS: return setRunningRoutine(state, action)
    case STOP_ROUTINE_SUCCESS: return clearRunningRoutine(state, action)
    case SET_DATA_RANGE: return setDataRange(state, action)

    case SET_SELECTED_ROUTINE: return setSelectedRoutine(state, action)
    case CLEAR_SELECTED_ROUTINE: return clearSelectedRoutine(state, action)

    default: return state
  }
}

const setRunningRoutine = (state, { routine }) =>
  state.merge({ runningRoutine: routine.id, dataRangeStart: null, dataRangeEnd: null })

const clearRunningRoutine = state =>
  state.merge({ runningRoutine: null })

const setDataRange = (state, { start, end }) =>
  state.merge({ dataRangeStart: start, dataRangeEnd: end })

const setSelectedRoutine = (state, { routine }) =>
  state.merge({ selectedRoutine: routine.id })

const clearSelectedRoutine = state =>
  state.merge({ selectedRoutine: null })

export default reduceReducers(requestReducer, appStateReducer)
