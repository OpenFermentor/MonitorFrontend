import moment from 'moment'
import _ from 'lodash'
import {
  roundDatesOnRangeDifference
} from '../../library/date_helper'

export const normalizeReadingsDateRange = (readings) => {
  if (readings.length === 0) {
    return readings
  }
  const firstReadingDate = moment(readings[0].insertedAt)
  const lastReadingDate = moment(_.last(readings).insertedAt)
  return groupReadingsByDateFormat(readings, roundDatesOnRangeDifference(firstReadingDate, lastReadingDate))
}

export const groupReadingsByDateFormat = (readings, dateFormat) => {
  const readingsGroupedByDate = readings.reduce((readingsGroup, reading) => {
    const dateGroup = dateFormat(reading.insertedAt)
    const {
      readingsIds = [],
      readingsAmount = 0,
      totalTemp = 0,
      totalPH = 0,
      totalDate = 0,
      routineId = reading.routineId
    } = readingsGroup[dateGroup] || {}
    readingsGroup[dateGroup] = {
      routineId,
      readingsIds: readingsIds.concat([reading.id]),
      readingsAmount: readingsAmount + 1,
      totalTemp: totalTemp + reading.temp,
      totalPH: totalPH + reading.ph,
      totalDate: totalDate + moment(reading.insertedAt).valueOf()
    }
    return readingsGroup
  }, {})
  return Object.entries(readingsGroupedByDate).map(([date, { readingsIds, readingsAmount, totalTemp, totalPH, routineId, totalDate }], index) => ({
    routineId,
    readingsIds,
    id: index,
    temp: totalTemp / readingsAmount,
    ph: totalPH / readingsAmount,
    insertedAt: date,
    insertedAtValue: moment(totalDate / readingsAmount).format()
  }))
}
