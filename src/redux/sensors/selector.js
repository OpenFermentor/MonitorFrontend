import { createSelector } from 'reselect'

import _ from 'lodash'
import moment from 'moment'

const selectSensorsEntityRedux = state => state.entities.sensors

export const selectSensorsLastValue = createSelector(
  selectSensorsEntityRedux,
  sensors => {
    return _.last(sensors.readings) || {}
  }
)

export const selectSensorsTimeline = createSelector(
  selectSensorsEntityRedux,
  sensors => {
    return {
      insertedAt: sensors.readings.map(({ insertedAt }) => insertedAt),
      labels: sensors.readings.map(({ insertedAt }) => moment(insertedAt).format('HH:mm:ss')),
      temp: sensors.readings.map(({ temp }) => temp),
      co2: sensors.readings.map(({ co2 }) => co2),
      density: sensors.readings.map(({ density }) => density),
      ph: sensors.readings.map(({ ph }) => ph)
    }
  }
)
