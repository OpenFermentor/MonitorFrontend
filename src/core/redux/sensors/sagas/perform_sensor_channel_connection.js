import { call, take, put, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {
  addReading
} from '../actions'
import moment from 'moment'

export default function * performSensorChannelConnection (socketService) {
  socketService.connect()
  const routineChannel = yield call(joinSensorChannel, socketService)
  try {
    while (true) {
      yield take(routineChannel)
      yield fork(receiveSensorEvents, socketService)
    }
  } finally {
    console.log('error')
  }
}

const joinSensorChannel = socket => eventChannel(emmiter => {
  socket.joinSensorTopic({
    onSuccess: () => { emmiter({ joined: true }) },
    onError: () => emmiter(END),
    onTimeout: () => emmiter(END)
  })
  return socket.leaveSensorTopic
})

function * receiveSensorEvents (socketService) {
  const eventSensor = yield call(receiveStatusEventsChannel, socketService)
  while (true) {
    let { temp, createdAt = moment().format() } = yield take(eventSensor)
    yield put(addReading({ temp, createdAt }))
  }
}

const receiveStatusEventsChannel = socketService => eventChannel(emmiter => {
  socketService.receiveStatusEvents(reading => emmiter(reading))
  return () => {}
})
