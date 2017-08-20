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

  // addNormalizeResponseErrorInterceptor () {
  //   this.instance.interceptors.response.use(response => {
  //     if (response.data) {
  //       response.data = transformSnakeToCamelCase(response.data)
  //     }
  //     return response
  //   })
  // }

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

  startRoutine ({ id }) {
    return this._post('routines/start', { id })
  }

  stopRunningRoutine () {
    return this._post('routines/stop')
  }

  getRoutines () {
    return this._get('routines')
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
}

export default new HttpService()
