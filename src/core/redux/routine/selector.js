import { createSelector } from 'reselect'
import _ from 'lodash'
import moment from 'moment'

const selectRoutineEntityRedux = state => state.entities.routine
const selectRoutineActionStatus = state => state.actionStatus.routine
const selectEntityRoutine = (state, props) => state.entities.routine.byId[props.id]

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

export const selectRoutine = createSelector(
  [selectEntityRoutine],
  routine => routine
)

export const selectRunningRoutineTemperatureTimeline = createSelector(
  [selectRoutineEntityRedux, selectRoutineActionStatus],
  (routine, actionStatus) => {
    const { readings } = routine.byId[actionStatus.runningRoutine]
    return {
      labels: readings.map(({ createdAt }) => moment(createdAt).format('HH:mm')).asMutable(),
      data: readings.map(({ temp }) => temp).asMutable()
    }
  }
)
