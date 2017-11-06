/* eslint camelcase:0 */

import { call, take, put, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {
  addAlert
} from '../../alert/actions.js'

export default function * performInstructionChannelConnection (socketService) {
  socketService.connect()
  const instructionChannel = yield call(joinInstructionChannel, socketService)
  try {
    while (true) {
      yield take(instructionChannel)
      yield fork(receiveInstructionEvents, socketService)
    }
  } finally {}
}

const joinInstructionChannel = socket => eventChannel(emmiter => {
  socket.joinInstructionTopic({
    onSuccess: () => { emmiter({ joined: true }) },
    onFailure: () => emmiter(END),
    onTimeout: () => emmiter(END)
  })
  return () => socket.leaveInstructionTopic()
})

function * receiveInstructionEvents (socketService) {
  const emmitedAlert = yield call(instructionEventsEmitter, socketService)
  while (true) {
    let { message } = yield take(emmitedAlert)
    yield put(addAlert({ message, status: 'instruction' }))
  }
}

const instructionEventsEmitter = socketService => eventChannel(emmiter => {
  socketService.receiveInstructionEvents(instruction => emmiter(instruction))
  return () => {}
})
