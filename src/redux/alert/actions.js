import {
  ADD,
  DISMISS
} from './action_types'

export const addAlert = ({ message, status, errors, insertedAt }) => ({ type: ADD, message, status, errors, insertedAt })
export const dismissAlert = alert => ({ type: DISMISS, alert })
