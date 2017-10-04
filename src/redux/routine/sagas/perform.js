import { call, put } from 'redux-saga/effects'
import {
  fetchRoutinesFailure,
  fetchRoutinesSuccess,
  fetchFailure,
  fetchSuccess,
  createRoutineFailure,
  createRoutineSuccess,
  updateRoutineFailure,
  updateRoutineSuccess,
  destroyRoutineFailure,
  destroyRoutineSuccess,
  startRoutineFailure,
  startRoutineSuccess,
  stopRunningRoutineFailure,
  stopRunningRoutineSuccess
} from '../actions'

export function * performFetchRoutines (httpService) {
  try {
    const response = yield call([httpService, 'getRoutines'])
    yield put(fetchRoutinesSuccess(response.data.data))
  } catch (error) {
    yield put(fetchRoutinesFailure(error))
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

export function * performCreateRoutine (httpService, { type, ...routine }) {
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
