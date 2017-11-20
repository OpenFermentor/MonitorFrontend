import { createSelector } from 'reselect'
import * as routineSelector from '../routine/selector'

const entity = state => state.entities.routineLogEntry
const actionStatus = state => state.actionStatus.routineLogEntry

export const selectFetchingStatus = createSelector(actionStatus, ({ fetching, error }) => ({ fetching, error }))

export const selectSelectedRoutineLogEntries = createSelector(
  routineSelector.selectSelectedRoutine,
  entity,
  (routine, { byId }) => {
    if (!routine) {
      return []
    }
    return routine.logEntries.map(id => byId[id])
  }
)
