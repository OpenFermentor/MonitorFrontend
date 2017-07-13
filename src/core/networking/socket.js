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
    this.routineChannel = this.socket.channel('routine')
    this.routineChannel.join()
      .receive('ok', onSuccess)
      .receive('error', onFailure)
      .receive('timeout', onTimeout)
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
    this.routineChannel.on('stop', callback)
  }
}

export default new SocketService()
