import { createSelector } from 'reselect'
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
    return {
      labels: sensors.readings.map(({ createdAt }) => moment(createdAt).format('HH:mm')).asMutable(),
      data: sensors.readings.map(({ temp }) => temp).asMutable()
    }
  }
)
