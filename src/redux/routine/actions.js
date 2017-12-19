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

  SEARCH_REQUEST,
  SEARCH_FAILURE,
  SEARCH_SUCCESS,
  CLEAR_SEARCH,

  SET_DATA_RANGE,

  UPSERT_SET_CURRENT_SECTION,

  UPSERT_ADD_TEMPERATURE_RANGE,
  UPSERT_SET_TEMPERATURE_RANGE,
  UPSERT_REMOVE_TEMPERATURE_RANGE,

  UPSERT_UPDATE_ROUTINE,

  UPSERT_START_CREATION,
  UPSERT_START_EDITION,

  UPSERT_SUBMIT,

  FETCH_ROUTINE_CALCULATIONS_REQUEST,
  FETCH_ROUTINE_CALCULATIONS_FAILURE,
  FETCH_ROUTINE_CALCULATIONS_SUCCESS
} from './action_types'

export const stopRunningRoutineRequest = () => ({ type: STOP_ROUTINE_REQUEST })
export const stopRunningRoutineFailure = error => ({ type: STOP_ROUTINE_FAILURE, error })
export const stopRunningRoutineSuccess = () => ({ type: STOP_ROUTINE_SUCCESS })

export const startRoutineRequest = routine => ({ type: START_ROUTINE_REQUEST, routine })
export const startRoutineFailure = error => ({ type: START_ROUTINE_FAILURE, error })
export const startRoutineSuccess = routine => ({ type: START_ROUTINE_SUCCESS, routine })

export const fetchRoutinesRequest = (page = 1) => ({ type: FETCH_ROUTINES_REQUEST, page })
export const fetchRoutinesFailure = error => ({ type: FETCH_ROUTINES_FAILURE, error })
export const fetchRoutinesSuccess = (routines, pagination) => ({ type: FETCH_ROUTINES_SUCCESS, routines, pagination })

export const fetchRequest = routine => ({ type: FETCH_REQUEST, routine })
export const fetchFailure = error => ({ type: FETCH_FAILURE, error })
export const fetchSuccess = routine => ({ type: FETCH_SUCCESS, routine })

export const fetchRoutineCalculationsRequest = routine => ({ type: FETCH_ROUTINE_CALCULATIONS_REQUEST, routine })
export const fetchRoutineCalculationsFailure = error => ({ type: FETCH_ROUTINE_CALCULATIONS_FAILURE, error })
export const fetchRoutineCalculationsSuccess = (routine, calculations) => ({ type: FETCH_ROUTINE_CALCULATIONS_SUCCESS, routine, calculations })

export const createRoutineRequest = routine => ({ type: CREATE_ROUTINE_REQUEST, routine })
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

export const searchRequest = searchTerm => ({ type: SEARCH_REQUEST, searchTerm })
export const searchFailure = error => ({ type: SEARCH_FAILURE, error })
export const searchSuccess = searchResults => ({ type: SEARCH_SUCCESS, searchResults })
export const clearSearch = () => ({ type: CLEAR_SEARCH })

export const upsertStartCreation = () => ({ type: UPSERT_START_CREATION })
export const upsertStartEdition = routine => ({ type: UPSERT_START_EDITION, routine })

export const upsertSetCurrentSection = currentSection => ({ type: UPSERT_SET_CURRENT_SECTION, currentSection })

export const upsertUpdateRoutine = routine => ({ type: UPSERT_UPDATE_ROUTINE, routine })

export const upsertAddTemperatureRange = () => ({ type: UPSERT_ADD_TEMPERATURE_RANGE })
export const upsertSetTemperatureRange = tempRange => ({ type: UPSERT_SET_TEMPERATURE_RANGE, tempRange })
export const upsertRemoveTemperatureRange = tempRange => ({ type: UPSERT_REMOVE_TEMPERATURE_RANGE, tempRange })

export const submitUpsert = () => ({ type: UPSERT_SUBMIT })
