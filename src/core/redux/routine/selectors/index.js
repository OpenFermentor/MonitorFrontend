import { createSelector } from 'reselect'

const selectRoutineEntityRedux = state => state.entities.routine
const selectRunningRoutineId = state => state.actionStatus.routine.runningRoutine

export const selectRunningRoutine = createSelector(
  [selectRoutineEntityRedux, selectRunningRoutineId],
  (routine, runningRoutineId) => {
    return routine.byId[runningRoutineId]
  }
)

export const selectAllRoutines = createSelector(
  [selectRoutineEntityRedux],
  routine => {
    return routine.allIds.map(id => routine.byId[id])
  }
)
