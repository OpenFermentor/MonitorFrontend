import { createSelector } from 'reselect'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import _ from 'lodash'
import {
  normalizeReadingsDateRange
} from './helper'

import * as routineSelector from '../routine/selector'

const entity = state => state.entities.reading
const actionStatus = state => state.entities.reading

export const selectFetchingStatus = createSelector(actionStatus, ({ fetching, error }) => ({ fetching, error }))

export const selectRunningRoutineReadings = createSelector(routineSelector.selectRunningRoutineReadings, entity,
  (readings, { byId }) => readings.map(id => byId[id])
)

export const selectSelectedRoutineReadings = createSelector(routineSelector.selectSelectedRoutine, entity,
  (routine, { byId }) => {
    if (!routine) {
      return []
    }
    return routine.readings.map(id => byId[id])
  }
)

export const selectRunningRoutineCurrentValue = createSelector(selectRunningRoutineReadings, entity,
  (readings, { byId }) => {
    if (readings.length === 0) {
      return null
    }
    return byId[_.last(readings)]
  }
)

export const selectRunningRoutineTimeline = createSelector(
  routineSelector.selectDataRange,
  selectRunningRoutineReadings,
  ({ dataRangeStart, dataRangeEnd }, readings) => getDataRangeTimeline({ dataRangeStart, dataRangeEnd, readings })
)

export const selectSelectedRoutineTimeline = createSelector(
  routineSelector.selectDataRange,
  selectSelectedRoutineReadings,
  ({ dataRangeStart, dataRangeEnd }, readings) => getDataRangeTimeline({ dataRangeStart, dataRangeEnd, readings })
)

export const selectRunningRoutineNavigationTimeline = createSelector(selectRunningRoutineReadings, readings => getTimeline(readings))
export const selectSelectedRoutineNavigationTimeline = createSelector(selectSelectedRoutineReadings, readings => getTimeline(readings))

const getDataRangeTimeline = ({ dataRangeStart, dataRangeEnd, readings }) => {
  const dataRangeReadings = readings.filter(({ insertedAt }) => {
    const readingDate = moment(insertedAt)
    if (!dataRangeStart) {
      return true
    }
    if (!dataRangeEnd) {
      return readingDate.isAfter(dataRangeStart)
    }
    return readingDate.isAfter(dataRangeStart) && readingDate.isBefore(dataRangeEnd)
  })
  return getTimeline(dataRangeReadings)
}

const getTimeline = readings => {
  const normalizedReadings = normalizeReadingsDateRange(readings)
  const mutableReadings = Immutable.isImmutable(normalizedReadings) ? normalizedReadings.asMutable() : normalizedReadings
  return {
    insertedAt: readings.map(({ insertedAt }) => insertedAt),
    labels: mutableReadings.map(({ insertedAt }) => insertedAt),
    temp: mutableReadings.map(({ temp }) => temp),
    co2: mutableReadings.map(({ co2 }) => co2),
    density: mutableReadings.map(({ density }) => density),
    ph: mutableReadings.map(({ ph }) => ph)
  }
}
