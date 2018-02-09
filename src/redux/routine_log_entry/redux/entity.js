import {
  FETCH_ROUTINE_LOG_ENTRIES_SUCCESS
} from '../action_types'
import {
  addByIdEntries,
  addEntriesIds
} from '../../helper'
import { omitBy } from 'lodash'

const INITIAL_STATE = { byId: {}, allIds: [] }

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE

    case FETCH_ROUTINE_LOG_ENTRIES_SUCCESS: return replaceRoutineLogEntries(state, action)

    default: return state
  }
}

const replaceRoutineLogEntries = (state, { routine, logEntries }) => ({
  byId: addByIdEntries(omitBy(
    state.byId, ({routineId}) => routineId === routine.id),
    logEntries.map(({ id, type, insertedAt, description }) => ({
      id,
      type,
      insertedAt,
      description,
      routineId: routine.id
    })
  )),
  allIds: addEntriesIds(
    state.allIds.filter(id => state.byId[id].routineId !== routine.id),
    logEntries
  )
})

export default reducer
