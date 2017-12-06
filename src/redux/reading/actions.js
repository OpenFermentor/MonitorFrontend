import {
  ADD_READING,
  CREATE_EXTERNAL_READING_REQUEST,
  CREATE_EXTERNAL_READING_FAILURE,
  CREATE_EXTERNAL_READING_SUCCESS,

  FETCH_ROUTINE_READINGS_REQUEST,
  FETCH_ROUTINE_READINGS_FAILURE,
  FETCH_ROUTINE_READINGS_SUCCESS
} from './action_types'

export const addReading = reading => ({ type: ADD_READING, reading })

export const createExternalReadingRequest = ({ routine, observancy, substratum, biomass }) => ({ type: CREATE_EXTERNAL_READING_REQUEST, routine, reading: { observancy, substratum, biomass } })
export const createExternalReadingFailure = error => ({ type: CREATE_EXTERNAL_READING_FAILURE, error })
export const createExternalReadingSuccess = reading => ({ type: CREATE_EXTERNAL_READING_SUCCESS, reading })

export const fetchRoutineReadingsRequest = routine => ({ type: FETCH_ROUTINE_READINGS_REQUEST, routine })
export const fetchRoutineReadingsFailure = error => ({ type: FETCH_ROUTINE_READINGS_FAILURE, error })
export const fetchRoutineReadingsSuccess = (routine, readings) => ({ type: FETCH_ROUTINE_READINGS_SUCCESS, routine, readings })
