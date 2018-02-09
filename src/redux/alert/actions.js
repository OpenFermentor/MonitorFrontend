import {
  ADD,
  DISMISS
} from './action_types'

export const addAlert = ({ message, status, messageType, errors, insertedAt }) => ({ type: ADD, message, status, messageType, errors, insertedAt })
export const dismissAlert = alert => ({ type: DISMISS, alert })
