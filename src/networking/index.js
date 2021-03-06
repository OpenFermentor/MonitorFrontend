import axios from 'axios'
import transformCamelToSnakeCase from './transforms/transform_camel_to_snake_case'
import transformSnakeToCamelCase from './transforms/transform_snake_to_camel_case'
import normalizeError from './transforms/normalize_error'

class HttpService {
  constructor () {
    this.instance = this.buildInstance()
    this.addDecamelizeRequestInterceptor()
    this.addCamelizeResponseInterceptor()
  }

  buildInstance () {
    return axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
      headers: {}
    })
  }

  setSessionHeaders (accessToken) {
    // this.instance.defaults.headers['access-token'] = accessToken
  }

  removeSessionHeaders () {
    // this.instance.defaults.headers['access-token'] = null
  }

  addDecamelizeRequestInterceptor () {
    this.instance.interceptors.request.use(config => {
      if (config.parms) {
        config.params = transformCamelToSnakeCase(config.params)
      }
      if (config.data) {
        config.data = transformCamelToSnakeCase(config.data)
      }
      return config
    })
  }

  addCamelizeResponseInterceptor () {
    this.instance.interceptors.response.use(config => {
      if (config.data) {
        config.data = transformSnakeToCamelCase(config.data)
      }
      return config
    })
  }

  _get (...args) {
    return this.instance.get(...args).catch(e => { throw normalizeError(e) })
  }

  _post (...args) {
    return this.instance.post(...args).catch(e => { throw normalizeError(e) })
  }

  _put (...args) {
    return this.instance.put(...args).catch(e => { throw normalizeError(e) })
  }

  _delete (...args) {
    return this.instance.delete(...args).catch(e => { throw normalizeError(e) })
  }

  routineToCsvUrl (routine) {
    return `${process.env.REACT_APP_BASE_API_URL}/routines/${routine.id}/to_csv`
  }

  signIn ({ email, password }) {
    return this._post('sessions/login', { user: { email, password } })
  }

  signOut () {
    return this._delete('sessions/logout')
  }

  startRoutine ({ id }) {
    return this._post('routines/start', { id })
  }

  stopRunningRoutine () {
    return this._post('routines/stop')
  }

  getRunningRoutine () {
    return this._get('routines/current')
  }

  getRoutines (page) {
    return this._get('routines', { params: { page } })
  }

  searchRoutines (searchTerm) {
    return this._get('routines', { params: {
      title: searchTerm,
      strain: searchTerm,
      medium: searchTerm,
      tag: searchTerm
    } })
  }

  getRoutine (routine) {
    return this._get(`routines/${routine.id}`)
  }

  getRoutineLogEntries (routine) {
    return this._get(`routines/${routine.id}/log_entries`)
  }

  getRoutineCalculations (routine) {
    return this._get(`routines/${routine.id}/readings/calculations`)
  }

  calculationsToCsv (routine) {
    return `${process.env.REACT_APP_BASE_API_URL}/routines/${routine.id}/readings/calculations_to_csv`
  }

  createRoutine (routine) {
    return this._post('routines', { routine })
  }

  updateRoutine (routine) {
    return this._put(`routines/${routine.id}`, { routine })
  }

  removeRoutine (id) {
    return this._delete(`routines/${id}`)
  }

  getRoutineReadings (routine) {
    return this._get(`routines/${routine.id}/readings`)
  }

  createReading (routine, reading) {
    return this._post(`routines/${routine.id}/readings`, { reading })
  }

  startCalibration (value) {
    return this._post(`ph/${value}`)
  }

  calibrationStatus () {
    return this._get('ph/status')
  }

  pushAcid () {
    return this._post('ph/push_acid')
  }

  testAcidDrop () {
    return this._post('ph/test_acid_drop')
  }

  pushBase () {
    return this._post('ph/push_base')
  }

  testBaseDrop () {
    return this._post('ph/test_base_drop')
  }

  systemRestart () {
    return this._post('system/restart')
  }
}

export default new HttpService()
