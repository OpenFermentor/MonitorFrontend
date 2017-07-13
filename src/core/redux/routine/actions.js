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

  CREATE_ROUTINE_REQUEST,
  CREATE_ROUTINE_FAILURE,
  CREATE_ROUTINE_SUCCESS,

  UPDATE_ROUTINE_REQUEST,
  UPDATE_ROUTINE_FAILURE,
  UPDATE_ROUTINE_SUCCESS,

  DESTROY_ROUTINE_REQUEST,
  DESTROY_ROUTINE_FAILURE,
  DESTROY_ROUTINE_SUCCESS,

  ADD_ROUTINE_READING
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

export const addRoutineReading = ({ routineId, temp, createdAt }) => ({ type: ADD_ROUTINE_READING, routineId, temp, createdAt })
