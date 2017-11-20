import {
  FETCH_ROUTINE_LOG_ENTRIES_REQUEST,
  FETCH_ROUTINE_LOG_ENTRIES_FAILURE,
  FETCH_ROUTINE_LOG_ENTRIES_SUCCESS
} from './action_types'

export const fetchRoutineLogEntriesRequest = routine => ({ type: FETCH_ROUTINE_LOG_ENTRIES_REQUEST, routine })
export const fetchRoutineLogEntriesFailure = error => ({ type: FETCH_ROUTINE_LOG_ENTRIES_FAILURE, error })
export const fetchRoutineLogEntriesSuccess = (routine, logEntries) => ({ type: FETCH_ROUTINE_LOG_ENTRIES_SUCCESS, routine, logEntries })
