import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  fetchRoutinesFailure,
  fetchRoutinesSuccess,
  fetchFailure,
  fetchSuccess,
  createRoutineRequest,
  createRoutineFailure,
  createRoutineSuccess,
  updateRoutineRequest,
  updateRoutineFailure,
  updateRoutineSuccess,
  destroyRoutineFailure,
  destroyRoutineSuccess,
  startRoutineFailure,
  startRoutineSuccess,
  stopRunningRoutineFailure,
  stopRunningRoutineSuccess,
  searchFailure,
  searchSuccess
} from '../actions'

import {
  selectUpsertActionStatus
} from '../selector'

export function * performFetchRoutines (httpService, { page }) {
  try {
    const response = yield call([httpService, 'getRoutines'], page)
    yield put(fetchRoutinesSuccess(response.data.data, response.data.paginate))
  } catch (error) {
    yield put(fetchRoutinesFailure(error))
  }
}

export function * performSearchRoutines (httpService, { searchTerm }) {
  yield call(delay, 500)
  try {
    const response = yield call([httpService, 'searchRoutines'], searchTerm)
    yield put(searchSuccess(response.data.data))
  } catch (error) {
    yield put(searchFailure(error))
  }
}

export function * performResumeRunningRoutine (httpService) {
  try {
    const response = yield call([httpService, 'getRunningRoutine'])
    if (response.status === 200) {
      yield put(fetchSuccess(response.data.data))
      yield put(startRoutineSuccess(response.data.data))
    }
  } catch (error) {
    yield put(fetchFailure(error))
  }
}

export function * performFetchRoutine (httpService, { routine }) {
  try {
    const response = yield call([httpService, 'getRoutine'], routine)
    yield put(fetchSuccess(response.data.data))
  } catch (error) {
    yield put(fetchFailure(error))
  }
}

export function * performSubmitUpsert () {
  const { operation, routine, tempRanges } = yield select(selectUpsertActionStatus)
  if (operation === 'creation') {
    yield put(createRoutineRequest({ ...routine, tempRanges }))
  } else {
    yield put(updateRoutineRequest({ ...routine, tempRanges }))
  }
}

export function * performCreateRoutine (httpService, { type, routine }) {
  try {
    const response = yield call([httpService, 'createRoutine'], routine)
    yield put(createRoutineSuccess(response.data.data))
  } catch (error) {
    yield put(createRoutineFailure(error))
  }
}

export function * performUpdateRoutine (httpService, { routine }) {
  try {
    const response = yield call([httpService, 'updateRoutine'], routine)
    yield put(updateRoutineSuccess(response.data.data))
  } catch (error) {
    yield put(updateRoutineFailure(error))
  }
}

export function * performRemoveRoutine (httpService, { routine }) {
  try {
    yield call([httpService, 'removeRoutine'], routine.id)
    yield put(destroyRoutineSuccess(routine))
  } catch (error) {
    yield put(destroyRoutineFailure(error))
  }
}

export function * performStartRoutine (httpService, { routine }) {
  try {
    yield call([httpService, 'startRoutine'], routine)
    yield put(startRoutineSuccess(routine))
  } catch (error) {
    yield put(startRoutineFailure(error))
  }
}

export function * performStopRoutine (httpService) {
  try {
    yield call([httpService, 'stopRunningRoutine'])
    yield put(stopRunningRoutineSuccess())
  } catch (error) {
    yield put(stopRunningRoutineFailure(error))
  }
}
