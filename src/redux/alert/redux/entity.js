import Immutable from 'seamless-immutable'
import generateRandomId from '../../../library/random_id'
import _ from 'lodash'
import {
  ADD,
  DISMISS
} from '../action_types'
import * as routineActionTypes from '../../routine/action_types'

const INITIAL_STATE = Immutable([])

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RESET': return INITIAL_STATE
    case 'BOOTED': return INITIAL_STATE

    case ADD: return addAlert(state, action)
    case DISMISS: return dismissAlert(state, action)

    case routineActionTypes.START_ROUTINE_FAILURE: return addAlert(state, action.error)
    case routineActionTypes.STOP_ROUTINE_FAILURE: return addAlert(state, action.error)

    default: return state
  }
}

const addAlert = (state, { id, message, messageType = 'error', status, errors = [], insertedAt }) => {
  if (existsActiveAlertWithMessage(state, message)) {
    return state
  }
  return state.concat([{
    id: generateRandomId(),
    message,
    status,
    messageType,
    errors: _.isString(errors) ? [errors] : errors,
    dismissed: false
  }])
}

const existsActiveAlertWithMessage = (state, message) => 
  state.find(alert => alert.message === message && !alert.dismissed)

const dismissAlert = (state, { alert }) =>
  state.map(existingAlert => {
    if (existingAlert.id !== alert.id) {
      return existingAlert
    }
    return ({ ...existingAlert, dismissed: true })
  })

export default reducer
