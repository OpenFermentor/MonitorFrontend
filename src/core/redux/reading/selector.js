import { createSelector } from 'reselect'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import _ from 'lodash'
import {
  roundDatesOnRangeDifference
} from '../../library/date_helper'

import * as routineSelector from '../routine/selector'

const entity = state => state.entities.reading
const actionStatus = state => state.entities.reading

export const selectFetchingStatus = createSelector(
  [actionStatus],
  ({ fetching, error }) => ({ fetching, error })
)

export const selectRunningRoutineReadings = createSelector(
  [routineSelector.selectRunningRoutineReadings, entity],
  (readings, { byId }) => readings.map(id => byId[id])
)

export const selectRunningRoutineCurrentValue = createSelector(
  [selectRunningRoutineReadings, entity],
  (readings, { byId }) =>
    byId[_.last(readings)]
)

export const selectRunningRoutineTemperatureTimeline = createSelector(
  [routineSelector.selectDataRange, selectRunningRoutineReadings],
  ({ dataRangeStart, dataRangeEnd }, readings) => {
    const dataRangeReadings = readings.filter(({ insertedAt }) => {
      const readingDate = moment(insertedAt)
      if (!dataRangeEnd) {
        return readingDate.isAfter(dataRangeStart)
      }
      return readingDate.isAfter(dataRangeStart) && readingDate.isBefore(dataRangeEnd)
    })
    return getTimeline(dataRangeReadings)
  }
)

export const selectSelectedRoutineTemperatureTimeline = createSelector(
  [routineSelector.selectDataRange, routineSelector.selectSelectedRoutine],
  ({ dataRangeStart, dataRangeEnd }, selectedRoutine) => {
    if (!selectedRoutine) {
      return getTimeline([])
    }
    const dataRangeReadings = selectedRoutine.readings.filter(({ insertedAt }) => {
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
)

export const selectRunningRoutineNavigationTimeline = createSelector(
  [selectRunningRoutineReadings],
  readings => getTimeline(readings)
)

export const selectSelectedRoutineNavigationTimeline = createSelector(
  [routineSelector.selectSelectedRoutine],
  (selectedRoutine) => {
    if (!selectedRoutine) {
      return getTimeline([])
    }
    return getTimeline(selectedRoutine.readings)
  }
)

const getTimeline = readings => {
  const normalizedReadings = normalizeReadingsDateRange(readings)
  const mutableReadings = Immutable.isImmutable(normalizedReadings) ? normalizedReadings.asMutable() : normalizedReadings
  return {
    insertedAt: readings.map(({ insertedAt }) => insertedAt),
    labels: mutableReadings.map(({ insertedAt }) => insertedAt),
    values: mutableReadings.map(({ temp }) => temp)
  }
}

const normalizeReadingsDateRange = (readings) => {
  if (readings.length === 0) {
    return readings
  }
  const firstReadingDate = moment(readings[0].insertedAt)
  const lastReadingDate = moment(_.last(readings).insertedAt)
  return groupReadingsByDateFormat(readings, roundDatesOnRangeDifference(firstReadingDate, lastReadingDate))
}

const groupReadingsByDateFormat = (readings, dateFormat) => {
  const readingsGroupedByDate = readings.reduce((readingsGroup, reading) => {
    const dateGroup = dateFormat(reading.insertedAt)
    const { readingsAmount = 0, totalTemp = 0, routineId = reading.routineId } = readingsGroup[dateGroup] || {}
    readingsGroup[dateGroup] = { readingsAmount: readingsAmount + 1, totalTemp: totalTemp + reading.temp, routineId }
    return readingsGroup
  }, {})

  return Object.entries(readingsGroupedByDate).map(([date, { readingsAmount, totalTemp, routineId }], index) => ({
    routineId,
    id: index,
    temp: totalTemp / readingsAmount,
    insertedAt: date
  }))
}
