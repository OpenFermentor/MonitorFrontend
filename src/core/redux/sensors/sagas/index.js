import socketService from '../../../networking/socket'

import performSensorChannelConnection from './perform_sensor_channel_connection'

export default [
  performSensorChannelConnection(socketService)
]
