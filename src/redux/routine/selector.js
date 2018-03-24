import { createSelector } from 'reselect'
import _ from 'lodash'
import moment from 'moment'

const entity = state => state.entities.routine
const actionStatus = state => state.actionStatus.routine

export const selectRoutineFetchingStatus = createSelector(actionStatus, ({ fetching, error }) => ({ fetching, error }))
export const selectRoutinePagination = createSelector(actionStatus, ({ pagination }) => pagination)
export const selectSearchInProgress = createSelector(actionStatus, ({ searchResults }) => !!searchResults)

export const selectIsRunningRoutine = createSelector(actionStatus, ({ runningRoutine }) => !!runningRoutine)

export const selectRunningRoutine = createSelector(
  entity,
  actionStatus,
  (routine, actionStatus) =>
    routine.byId[actionStatus.runningRoutine]
)

export const selectRunningRoutineReadings = createSelector(
  entity,
  actionStatus,
  (routine, actionStatus) =>
    routine.byId[actionStatus.runningRoutine].readings
)

export const selectDataRange = createSelector(
  actionStatus,
  ({ dataRangeStart, dataRangeEnd }) => ({
    dataRangeStart: dataRangeStart && moment(dataRangeStart),
    dataRangeEnd: dataRangeEnd && moment(dataRangeEnd)
  })
)

export const selectRunningRoutineLastValue = createSelector(
  entity,
  actionStatus,
  (routine, actionStatus) =>
    _.last(routine.byId[actionStatus.runningRoutine].readings) || {}
)

export const selectRoutines = createSelector(
  entity,
  actionStatus,
  ({ byId, allIds }, { searchResults }) =>
    searchResults || allIds.map(id => byId[id])
)

export const selectSelectedRoutine = createSelector(
  entity,
  actionStatus,
  ({ byId }, { selectedRoutine, runningRoutine }) => {
    if (selectedRoutine) {
      return ({
        ...byId[selectedRoutine],
        running: runningRoutine === selectedRoutine
      })
    }
  }
)

export const selectUpsertActionStatus = createSelector(
  actionStatus,
  ({ upsert  }) => upsert 
)
