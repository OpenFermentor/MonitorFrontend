import {
  ADD_READING
} from './action_types'

export const addReading = ({ temp, createdAt }) => ({ type: ADD_READING, temp, createdAt })
