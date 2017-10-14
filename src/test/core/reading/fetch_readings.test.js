/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  FETCH_ROUTINE_READINGS_REQUEST,
  FETCH_ROUTINE_READINGS_FAILURE,
  FETCH_ROUTINE_READINGS_SUCCESS
} from '../../../redux/reading/action_types'
import {
  fetchRoutineReadingsRequest,
  fetchRoutineReadingsFailure,
  fetchRoutineReadingsSuccess
} from '../../../redux/reading/actions'
import reducer from '../../../redux/reading/redux'
import routineReducer from '../../../redux/routine/redux'
import { performFetchRoutineReadings } from '../../../redux/reading/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request a routine readings', () => {
    const routine = { id: 4 }
    const expectedAction = {
      type: FETCH_ROUTINE_READINGS_REQUEST,
      routine
    }
    expect(fetchRoutineReadingsRequest(routine)).toEqual(expectedAction)
  })

  it('should create an action for routine readings request failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: FETCH_ROUTINE_READINGS_FAILURE,
      error
    }
    expect(fetchRoutineReadingsFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for routine readings request success', () => {
    const routine = { id: 4 }
    const readings = [{ a: 'a' }]
    const expectedAction = {
      type: FETCH_ROUTINE_READINGS_SUCCESS,
      routine,
      readings
    }
    expect(fetchRoutineReadingsSuccess(routine, readings)).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  const DIRTY_STATE = { fetching: false, error: 'error', runningRoutine: null }

  it('should handle FETCH_ROUTINE_READINGS_REQUEST', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: FETCH_ROUTINE_READINGS_REQUEST
      })
    ).toEqual({
      runningRoutine: null,
      fetching: true,
      error: null
    })
  })

  it('should handle FETCH_ROUTINE_READINGS_FAILURE', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: FETCH_ROUTINE_READINGS_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      runningRoutine: null,
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle FETCH_ROUTINE_READINGS_SUCCESS', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: FETCH_ROUTINE_READINGS_SUCCESS
      })
    ).toEqual({
      runningRoutine: null,
      fetching: false,
      error: null
    })
  })
})

describe('entity reducer', () => {
  const INITIAL_STATE = {
    byId: {
      1: { id: 1, routineId: 1 },
      2: { id: 2, routineId: 2 }
    },
    allIds: [1, 2]
  }

  it('should handle FETCH_ROUTINE_READINGS_SUCCESS', () => {
    const routine = { id: 1 }
    const readings = [{ id: 3, routineId: 1, temp: 10, insertedAt: 'today' }]

    expect(
      reducer.entity(INITIAL_STATE, {
        type: FETCH_ROUTINE_READINGS_SUCCESS,
        routine,
        readings
      })
    ).toEqual({
      byId: {
        2: { id: 2, routineId: 2 },
        3: { id: 3, routineId: 1, temp: 10, insertedAt: 'today' }
      },
      allIds: [2, 3]
    })
  })
})

describe('routine entity reducer', () => {
  const INITIAL_STATE = {
    byId: {
      4: { id: 4, readings: [5] }
    },
    allIds: [4]
  }

  it('should handle FETCH_ROUTINE_READINGS_SUCCESS', () => {
    const routine = { id: 4 }
    const readings = [{ id: 6, temp: 10, insertedAt: 'today' }]

    expect(
      routineReducer.entity(INITIAL_STATE, {
        type: FETCH_ROUTINE_READINGS_SUCCESS,
        routine,
        readings
      })
    ).toEqual({
      byId: {
        4: {
          id: 4,
          readings: [6]
        }
      },
      allIds: [4]
    })
  })
})

describe('sagas', () => {
  it('perfom update routine success', () => {
    const routine = { id: 2 }
    const iterator = performFetchRoutineReadings(httpServiceMock, { routine })
    const response = httpServiceMock.getRoutineReadings(routine)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'getRoutineReadings'], routine))
    expect(iterator.next(response).value).toEqual(put(fetchRoutineReadingsSuccess(routine, response.data.data)))
  })

  it('perfom update routine failure', () => {
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const iterator = performFetchRoutineReadings(httpServiceMock, { routine })
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'getRoutineReadings'], routine))
    expect(iterator.throw('an error').value).toEqual(put(fetchRoutineReadingsFailure('an error')))
  })
})
