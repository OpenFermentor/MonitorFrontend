import { takeEvery } from 'redux-saga/effects'
import socketService from '../../../networking/socket'

import performSensorChannelConnection from './perform_sensor_channel_connection'

export default [
  takeEvery('BOOTED', performSensorChannelConnection, socketService)
]
