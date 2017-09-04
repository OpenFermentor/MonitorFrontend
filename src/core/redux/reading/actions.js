import {
  ADD_READING,
  FETCH_ROUTINE_READINGS_REQUEST,
  FETCH_ROUTINE_READINGS_FAILURE,
  FETCH_ROUTINE_READINGS_SUCCESS,
  MERGE_READINGS
} from './action_types'

export const addReading = reading => ({ type: ADD_READING, reading })

export const fetchRoutineReadingsRequest = routine => ({ type: FETCH_ROUTINE_READINGS_REQUEST, routine })
export const fetchRoutineReadingsFailure = error => ({ type: FETCH_ROUTINE_READINGS_FAILURE, error })
export const fetchRoutineReadingsSuccess = (routine, readings) => ({ type: FETCH_ROUTINE_READINGS_SUCCESS, routine, readings })

export const mergeReadings = readings => ({ type: MERGE_READINGS, readings })
