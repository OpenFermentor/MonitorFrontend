import { call, take, put, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {
  sensorsError,
  sensorsStatusUpdate
} from '../actions'

export default function * performSensorChannelConnection (socketService) {
  socketService.connect()
  const routineChannel = yield call(joinSensorChannel, socketService)
  try {
    while (true) {
      yield take(routineChannel)
      yield fork(receiveSensorEvents, socketService)
      yield fork(receiveErrorEvents, socketService)
    }
  } finally {
    console.log('error')
  }
}

const joinSensorChannel = socket => eventChannel(emmiter => {
  socket.joinSensorTopic({
    onSuccess: () => { emmiter({ joined: true }) },
    onFailure: () => emmiter(END),
    onTimeout: () => emmiter(END)
  })
  return () => socket.leaveSensorTopic()
})

function * receiveSensorEvents (socketService) {
  const eventSensor = yield call(receiveStatusEventsChannel, socketService)
  while (true) {
    const { ph, pumps, temp } = yield take(eventSensor)
    yield put(sensorsStatusUpdate({ ph: activeSensor(ph), pumps: activeSensor(pumps), temp: activeSensor(temp) }))
  }
}

const activeSensor = sensor =>
  sensor === '1'

const receiveStatusEventsChannel = socketService => eventChannel(emmiter => {
  socketService.receiveStatusEvents(action => emmiter(action))
  return () => {}
})

function * receiveErrorEvents (socketService) {
  const emmitedError = yield call(errorEventsEmitter, socketService)
  while (true) {
    let { message } = yield take(emmitedError)
    yield put(sensorsError(message))
  }
}

const errorEventsEmitter = socketService => eventChannel(emmiter => {
  socketService.receiveSensorsErrorEvents(error => emmiter(error))
  return () => {}
})
