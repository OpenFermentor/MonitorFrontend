import { Socket as PhoenixSocket } from '../library/phoenix_socket'

class SocketService {
  constructor () {
    this.socket = this.buildInstance()
  }

  buildInstance () {
    return new PhoenixSocket(process.env.REACT_APP_BASE_SOCKET_URL)
  }

  connect () {
    this.socket.connect()
  }

  joinRoutineTopic ({ onSuccess, onFailure, onTimeout }) {
    this.routineChannel = this._joinChannel({ channelName: 'routine', onSuccess, onFailure, onTimeout })
  }

  leaveRoutineTopic () {
    this.routineChannel.leave()
  }

  receiveStartEvent (callback) {
    this.routineChannel.on('start', callback)
  }

  receiveStopEvent (callback) {
    this.routineChannel.on('stop', callback)
  }

  receiveUpdateEvent (callback) {
    this.routineChannel.on('update', callback)
  }

  receiveAlertEvent (callback) {
    this.routineChannel.on('alert', callback)
  }

  joinSensorTopic ({ onSuccess, onFailure, onTimeout }) {
    this.sensorsChannel = this._joinChannel({ channelName: 'sensors', onSuccess, onFailure, onTimeout })
  }

  leaveSensorTopic () {
    this.sensorsChannel.leave()
  }

  receiveStatusEvents (callback) {
    this.sensorsChannel.on('status', callback)
  }

  receiveSensorsErrorEvents (callback) {
    this.sensorsChannel.on('error', callback)
  }

  joinInstructionTopic ({ onSuccess, onFailure, onTimeout }) {
    this.instructionChannel = this._joinChannel({ channelName: 'instructions', onSuccess, onFailure, onTimeout })
  }

  leaveInstructionTopic () {
    this.instructionChannel.leave()
  }

  receiveInstructionEvents (callback) {
    this.instructionChannel.on('instruction', callback)
  }

  _joinChannel ({ channelName, onSuccess, onFailure, onTimeout }) {
    const channel = this.socket.channel(channelName)
    channel.join()
      .receive('ok', onSuccess)
      .receive('error', onFailure)
      .receive('timeout', onTimeout)
    return channel
  }
}

export default new SocketService()
