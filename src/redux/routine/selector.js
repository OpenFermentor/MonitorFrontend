import { createSelector } from 'reselect'
import _ from 'lodash'
import moment from 'moment'

const entity = state => state.entities.routine
const actionStatus = state => state.actionStatus.routine

export const selectRoutineFetchingStatus = createSelector(actionStatus, ({ fetching, error }) => ({ fetching, error }))
export const selectSearchInProgress = createSelector(actionStatus, ({ searchTerm }) => !!searchTerm)

export const selectIsRunningRoutine = createSelector(actionStatus, ({ runningRoutine }) => !!runningRoutine)

export const selectRunningRoutineTitle = createSelector(
  entity,
  actionStatus,
  (routine, actionStatus) =>
    routine.byId[actionStatus.runningRoutine].title
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
  ({ byId, allIds }, { searchTerm }) =>
    allIds.map(id => byId[id]).filter(({ title }) =>
      !searchTerm || title.toLowerCase().search(searchTerm) > -1
    )
)

export const selectSelectedRoutine = createSelector(
  entity,
  actionStatus,
  ({ byId }, { selectedRoutine }) => byId[selectedRoutine]
)
