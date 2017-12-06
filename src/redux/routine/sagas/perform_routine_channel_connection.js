/* eslint camelcase:0 */

import { call, take, put, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import moment from 'moment'
import {
  addReading
} from '../../reading/actions'
import {
  addAlert
} from '../../alert/actions.js'

export default function * performRoutineChannelConnection (socketService) {
  socketService.connect()
  const routineChannel = yield call(joinRoutineChannel, socketService)
  try {
    while (true) {
      yield take(routineChannel)
      yield fork(receiveUpdateEvents, socketService)
      yield fork(receiveAlertEvents, socketService)
    }
  } finally {
    console.log('error')
  }
}

const joinRoutineChannel = socket => eventChannel(emmiter => {
  socket.joinRoutineTopic({
    onSuccess: () => { console.log('JOINED'); emmiter({ joined: true }) },
    onFailure: () => emmiter(END),
    onTimeout: () => emmiter(END)
  })
  return () => socket.leaveRoutineTopic()
})

function * receiveAlertEvents (socketService) {
  const emmitedAlert = yield call(alertEventsEmitter, socketService)
  while (true) {
    let { message, status, errors } = yield take(emmitedAlert)
    yield put(addAlert({ message, status, errors }))
  }
}

const alertEventsEmitter = socketService => eventChannel(emmiter => {
  socketService.receiveAlertEvent(alert => emmiter(alert))
  return () => {}
})

function * receiveUpdateEvents (socketService) {
  const emmitedUpdate = yield call(updateEventsEmitter, socketService)
  while (true) {
    let { routine_id, inserted_at = moment().format(), ...data } = yield take(emmitedUpdate)
    yield put(addReading({ ...data, routineId: routine_id, insertedAt: inserted_at }))
  }
}

const updateEventsEmitter = socketService => eventChannel(emmiter => {
  socketService.receiveUpdateEvent(reading => emmiter(reading))
  return () => {}
})
