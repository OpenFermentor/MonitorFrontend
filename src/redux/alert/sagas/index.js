import { takeEvery } from 'redux-saga/effects'
import socketService from '../../../networking/socket'

import performInstructionChannelConnection from './perform_instruction_channel_connection'

export default [
  takeEvery('BOOTED', performInstructionChannelConnection, socketService)
]
