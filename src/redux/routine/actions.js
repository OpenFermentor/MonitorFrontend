import {
  STOP_ROUTINE_REQUEST,
  STOP_ROUTINE_FAILURE,
  STOP_ROUTINE_SUCCESS,

  START_ROUTINE_REQUEST,
  START_ROUTINE_FAILURE,
  START_ROUTINE_SUCCESS,

  FETCH_ROUTINES_REQUEST,
  FETCH_ROUTINES_FAILURE,
  FETCH_ROUTINES_SUCCESS,

  FETCH_REQUEST,
  FETCH_FAILURE,
  FETCH_SUCCESS,

  CREATE_ROUTINE_REQUEST,
  CREATE_ROUTINE_FAILURE,
  CREATE_ROUTINE_SUCCESS,

  UPDATE_ROUTINE_REQUEST,
  UPDATE_ROUTINE_FAILURE,
  UPDATE_ROUTINE_SUCCESS,

  DESTROY_ROUTINE_REQUEST,
  DESTROY_ROUTINE_FAILURE,
  DESTROY_ROUTINE_SUCCESS,

  SET_SELECTED_ROUTINE,
  CLEAR_SELECTED_ROUTINE,

  SET_SEARCH_TERM,
  CLEAR_SEARCH_TERM,

  SET_DATA_RANGE
} from './action_types'

export const stopRunningRoutineRequest = () => ({ type: STOP_ROUTINE_REQUEST })
export const stopRunningRoutineFailure = error => ({ type: STOP_ROUTINE_FAILURE, error })
export const stopRunningRoutineSuccess = () => ({ type: STOP_ROUTINE_SUCCESS })

export const startRoutineRequest = routine => ({ type: START_ROUTINE_REQUEST, routine })
export const startRoutineFailure = error => ({ type: START_ROUTINE_FAILURE, error })
export const startRoutineSuccess = routine => ({ type: START_ROUTINE_SUCCESS, routine })

export const fetchRoutinesRequest = () => ({ type: FETCH_ROUTINES_REQUEST })
export const fetchRoutinesFailure = error => ({ type: FETCH_ROUTINES_FAILURE, error })
export const fetchRoutinesSuccess = routines => ({ type: FETCH_ROUTINES_SUCCESS, routines })

export const fetchRequest = routine => ({ type: FETCH_REQUEST, routine })
export const fetchFailure = error => ({ type: FETCH_FAILURE, error })
export const fetchSuccess = routine => ({ type: FETCH_SUCCESS, routine })

export const createRoutineRequest = ({
  title,
  strain,
  medium,
  targetTemp,
  targetPh,
  targetCo2,
  targetDensity,
  estimatedTimeSeconds,
  extraNotes
}) => ({
  type: CREATE_ROUTINE_REQUEST,
  title,
  strain,
  medium,
  targetTemp,
  targetPh,
  targetCo2,
  targetDensity,
  estimatedTimeSeconds,
  extraNotes
})
export const createRoutineFailure = error => ({ type: CREATE_ROUTINE_FAILURE, error })
export const createRoutineSuccess = routine => ({ type: CREATE_ROUTINE_SUCCESS, routine })

export const updateRoutineRequest = routine => ({ type: UPDATE_ROUTINE_REQUEST, routine })
export const updateRoutineFailure = error => ({ type: UPDATE_ROUTINE_FAILURE, error })
export const updateRoutineSuccess = routine => ({ type: UPDATE_ROUTINE_SUCCESS, routine })

export const destroyRoutineRequest = routine => ({ type: DESTROY_ROUTINE_REQUEST, routine })
export const destroyRoutineFailure = error => ({ type: DESTROY_ROUTINE_FAILURE, error })
export const destroyRoutineSuccess = routine => ({ type: DESTROY_ROUTINE_SUCCESS, routine })

export const setDataRange = (start, end) => ({ type: SET_DATA_RANGE, start, end })

export const setSelectedRoutine = routine => ({ type: SET_SELECTED_ROUTINE, routine })
export const clearSelectedRoutine = routine => ({ type: CLEAR_SELECTED_ROUTINE })

export const setSearchTerm = (searchTerm = '') => ({ type: SET_SEARCH_TERM, searchTerm: searchTerm.toLowerCase() })
export const clearSearchTerm = () => ({ type: CLEAR_SEARCH_TERM })
