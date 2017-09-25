import {
  ADD,
  DISMISS
} from './action_types'

export const addAlert = ({ id, message, errors, insertedAt }) => ({ type: ADD, id, message, errors, insertedAt })
export const dismissAlert = alert => ({ type: DISMISS, alert })
