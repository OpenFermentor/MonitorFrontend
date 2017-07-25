import {
  ADD_READING
} from './action_types'

export const addReading = ({ temp, insertedAt }) => ({ type: ADD_READING, temp, insertedAt })
