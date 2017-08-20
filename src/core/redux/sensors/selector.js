import { createSelector } from 'reselect'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import moment from 'moment'

const selectSensorsEntityRedux = state => state.entities.sensors

export const selectSensorsLastValue = createSelector(
  [selectSensorsEntityRedux],
  (sensors) => {
    return _.last(sensors.readings) || {}
  }
)

export const selectSensorsTemperatureTimeline = createSelector(
  [selectSensorsEntityRedux],
  (sensors) => {
    const sensorReadings = Immutable.isImmutable(sensors.readings) ? sensors.readings.asMutable() : sensors.readings
    return {
      labels: sensorReadings.map(({ insertedAt }) => moment(insertedAt).format('HH:mm')),
      values: sensorReadings.map(({ temp }) => temp)
    }
  }
)
