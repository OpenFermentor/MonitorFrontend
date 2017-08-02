/* eslint camelcase:0 */

import { call, take, put, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {
  addReading
} from '../../reading/actions'
import moment from 'moment'

export default function * performRoutineChannelConnection (socketService) {
  socketService.connect()
  const routineChannel = yield call(joinRoutineChannel, socketService)
  try {
    while (true) {
      yield take(routineChannel)
      yield fork(receiveUpdateEvents, socketService)
    }
  } finally {
    console.log('error')
  }
}

const joinRoutineChannel = socket => eventChannel(emmiter => {
  socket.joinRoutineTopic({
    onSuccess: () => { console.log('JOINED'); emmiter({ joined: true }) },
    onError: () => emmiter(END),
    onTimeout: () => emmiter(END)
  })
  return socket.leaveRoutineTopic
})

function * receiveUpdateEvents (socketService) {
  const eventUpdate = yield call(receiveUpdateEventsChannel, socketService)
  while (true) {
    let { routine_id, id, temp, inserted_at = moment().format() } = yield take(eventUpdate)
    yield put(addReading({ reading: { routineId: routine_id, id, temp, insertedAt: inserted_at } }))
  }
}

const receiveUpdateEventsChannel = socketService => eventChannel(emmiter => {
  socketService.receiveUpdateEvent(reading => emmiter(reading))
  return () => {}
})
