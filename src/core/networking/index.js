import axios from 'axios'
import transformCamelToSnakeCase from './transforms/transform_camel_to_snake_case'
import transformSnakeToCamelCase from './transforms/transform_snake_to_camel_case'

class HttpService {
  constructor () {
    this.instance = this.buildInstance()
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

  _get (...args) {
    return this.instance.get(...args)
  }

  _post (...args) {
    return this.instance.post(...args)
  }

  _put (...args) {
    return this.instance.put(...args)
  }

  _delete (...args) {
    return this.instance.delete(...args)
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
    return this._post('routines', routine)
  }

  updateRoutine (routine) {
    return this._put(`routines/${routine.id}`, routine)
  }

  removeRoutine (id) {
    return this._delete(`routines/${id}`)
  }
}

export default new HttpService()
