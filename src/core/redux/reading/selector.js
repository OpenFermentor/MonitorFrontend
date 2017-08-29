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

export const selectSelectedRoutineReadings = createSelector(
  [routineSelector.selectSelectedRoutine, entity],
  (routine, { byId }) => {
    if (!routine) {
      return []
    }
    return routine.readings.map(id => byId[id])
  }
)

export const selectRunningRoutineCurrentValue = createSelector(
  [selectRunningRoutineReadings, entity],
  (readings, { byId }) =>
    byId[_.last(readings)]
)

export const selectRunningRoutineTimeline = createSelector(
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

export const selectSelectedRoutineTimeline = createSelector(
  [routineSelector.selectDataRange, selectSelectedRoutineReadings],
  ({ dataRangeStart, dataRangeEnd }, readings) => {
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
)

export const selectRunningRoutineNavigationTimeline = createSelector(
  [selectRunningRoutineReadings],
  readings => getTimeline(readings)
)

export const selectSelectedRoutineNavigationTimeline = createSelector(
  [selectSelectedRoutineReadings],
  readings => getTimeline(readings)
)

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
    const {
      readingsAmount = 0,
      totalTemp = 0,
      totalPH = 0,
      totalCO2 = 0,
      totalDensity = 0,
      routineId = reading.routineId
    } = readingsGroup[dateGroup] || {}
    readingsGroup[dateGroup] = {
      routineId,
      readingsAmount: readingsAmount + 1,
      totalTemp: totalTemp + reading.temp,
      totalPH: totalPH + reading.ph,
      totalCO2: totalCO2 + reading.co2,
      totalDensity: totalDensity + reading.density
    }
    return readingsGroup
  }, {})

  return Object.entries(readingsGroupedByDate).map(([date, { readingsAmount, totalTemp, totalPH, totalCO2, totalDensity, routineId }], index) => ({
    routineId,
    id: index,
    temp: totalTemp / readingsAmount,
    ph: totalPH / readingsAmount,
    co2: totalCO2 / readingsAmount,
    density: totalDensity / readingsAmount,
    insertedAt: date
  }))
}
