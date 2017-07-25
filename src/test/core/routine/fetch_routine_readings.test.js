/* eslint-env jest */

import Immutable from 'seamless-immutable'
import { call, put } from 'redux-saga/effects'
import {
  FETCH_ROUTINE_READINGS_REQUEST,
  FETCH_ROUTINE_READINGS_FAILURE,
  FETCH_ROUTINE_READINGS_SUCCESS
} from '../../../core/redux/routine/action_types'
import {
  fetchRoutineReadingsRequest,
  fetchRoutineReadingsFailure,
  fetchRoutineReadingsSuccess
} from '../../../core/redux/routine/actions'
import reducer from '../../../core/redux/routine/redux'
import { performFetchRoutineReadings } from '../../../core/redux/routine/sagas/perform'
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
  const DIRTY_STATE = Immutable({ fetching: false, error: 'error', runningRoutine: null })

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
  const INITIAL_STATE = Immutable({
    byId: Immutable({
      4: Immutable({ id: 4, readings: Immutable(['old reading']) })
    }),
    allIds: Immutable([4])
  })

  it('should handle FETCH_ROUTINE_READINGS_SUCCESS', () => {
    const routine = { id: 4 }
    const readings = [{ temp: 10, insertedAt: 'today' }]

    expect(
      reducer.entity(INITIAL_STATE, {
        type: FETCH_ROUTINE_READINGS_SUCCESS,
        routine,
        readings
      })
    ).toEqual({
      byId: {
        4: {
          id: 4,
          readings: [{ temp: 10, insertedAt: 'today' }]
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
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const iterator = performFetchRoutineReadings(httpServiceMock, { routine })
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'getRoutineReadings'], routine))
    expect(iterator.throw('an error').value).toEqual(put(fetchRoutineReadingsFailure('an error')))
  })
})
