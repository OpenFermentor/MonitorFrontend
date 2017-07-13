import { createSelector } from 'reselect'
import _ from 'lodash'

const selectRoutineEntityRedux = state => state.entities.routine
const selectRoutineActionStatus = state => state.actionStatus.routine

export const selectRoutineFetchingStatus = createSelector(
  [selectRoutineActionStatus],
  ({ fetching, error }) => ({ fetching, error })
)

export const selectRunningRoutine = createSelector(
  [selectRoutineEntityRedux, selectRoutineActionStatus],
  (routine, actionStatus) => {
    return routine.byId[actionStatus.runningRoutine]
  }
)

export const selectRunningRoutineLastValue = createSelector(
  [selectRoutineEntityRedux, selectRoutineActionStatus],
  (routine, actionStatus) => {
    return _.last(routine.byId[actionStatus.runningRoutine].readings) || {}
  }
)

export const selectAllRoutines = createSelector(
  [selectRoutineEntityRedux],
  routine => {
    return routine.allIds.map(id => routine.byId[id])
  }
)
