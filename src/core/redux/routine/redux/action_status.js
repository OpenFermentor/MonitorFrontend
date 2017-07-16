import buildActionStatusReducer from '../../../library/action_status_reducer_builder'
import Immutable from 'seamless-immutable'
import reduceReducers from 'reduce-reducers'
import {
  START_ROUTINE_SUCCESS,
  STOP_ROUTINE_SUCCESS
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
  runningRoutine: null
})

const appStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RESET': return state.merge(INITIAL_STATE)

    case START_ROUTINE_SUCCESS: return setRunningRoutine(state, action)
    case STOP_ROUTINE_SUCCESS: return clearRunningRoutine(state, action)
    default: return state
  }
}

const setRunningRoutine = (state, { routine }) =>
  state.merge({ runningRoutine: routine.id })

const clearRunningRoutine = state =>
  state.merge({ runningRoutine: null })

export default reduceReducers(requestReducer, appStateReducer)
