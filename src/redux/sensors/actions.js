import {
  ADD_READING
} from './action_types'

export const addReading = ({ temp, ph, co2, density, insertedAt }) => ({ type: ADD_READING, temp, ph, co2, density, insertedAt })
