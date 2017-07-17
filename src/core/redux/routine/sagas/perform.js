import { call, put } from 'redux-saga/effects'
import {
  fetchRoutinesFailure,
  fetchRoutinesSuccess,
  createRoutineFailure,
  createRoutineSuccess,
  updateRoutineFailure,
  updateRoutineSuccess,
  destroyRoutineFailure,
  destroyRoutineSuccess,
  startRoutineFailure,
  startRoutineSuccess,
  stopRunningRoutineFailure,
  stopRunningRoutineSuccess,
  fetchRoutineReadingsFailure,
  fetchRoutineReadingsSuccess
} from '../actions'

export function * performFetchRoutines (httpService) {
  try {
    const response = yield call([httpService, 'getRoutines'])
    yield put(fetchRoutinesSuccess(response.data.data))
  } catch (error) {
    yield put(fetchRoutinesFailure(error))
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

export function * performFetchRoutineReadings (httpService, { routine }) {
  try {
    const response = yield call([httpService, 'getRoutineReadings'], routine)
    yield put(fetchRoutineReadingsSuccess(routine, response.data.data))
  } catch (error) {
    yield put(fetchRoutineReadingsFailure(error))
  }
}
