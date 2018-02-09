/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  FETCH_ROUTINE_LOG_ENTRIES_REQUEST,
  FETCH_ROUTINE_LOG_ENTRIES_FAILURE,
  FETCH_ROUTINE_LOG_ENTRIES_SUCCESS
} from '../../redux/routine_log_entry/action_types'
import {
  fetchRoutineLogEntriesRequest,
  fetchRoutineLogEntriesFailure,
  fetchRoutineLogEntriesSuccess
} from '../../redux/routine_log_entry/actions'
import reducer from '../../redux/routine_log_entry/redux'
import routineReducer from '../../redux/routine/redux'
import { performFetchRoutineLogEntries } from '../../redux/routine_log_entry/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request a routine log entries', () => {
    const routine = { id: 4 }
    const expectedAction = {
      type: FETCH_ROUTINE_LOG_ENTRIES_REQUEST,
      routine
    }
    expect(fetchRoutineLogEntriesRequest(routine)).toEqual(expectedAction)
  })

  it('should create an action for routine log entries request failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: FETCH_ROUTINE_LOG_ENTRIES_FAILURE,
      error
    }
    expect(fetchRoutineLogEntriesFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for routine log entries request success', () => {
    const routine = { id: 4 }
    const logEntries = [{ a: 'a' }]
    const expectedAction = {
      type: FETCH_ROUTINE_LOG_ENTRIES_SUCCESS,
      routine,
      logEntries
    }
    expect(fetchRoutineLogEntriesSuccess(routine, logEntries)).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  const DIRTY_STATE = { fetching: false, error: 'error' }

  it('should handle FETCH_ROUTINE_LOG_ENTRIES_REQUEST', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: FETCH_ROUTINE_LOG_ENTRIES_REQUEST
      })
    ).toEqual({
      fetching: true,
      error: null
    })
  })

  it('should handle FETCH_ROUTINE_LOG_ENTRIES_FAILURE', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: FETCH_ROUTINE_LOG_ENTRIES_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle FETCH_ROUTINE_LOG_ENTRIES_SUCCESS', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: FETCH_ROUTINE_LOG_ENTRIES_SUCCESS
      })
    ).toEqual({
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

  it('should handle FETCH_ROUTINE_LOG_ENTRIES_SUCCESS', () => {
    const routine = { id: 1 }
    const logEntries = [{ id: 3, routineId: 1, type: 'temp_change', insertedAt: 'today', description: 'a' }]

    expect(
      reducer.entity(INITIAL_STATE, {
        type: FETCH_ROUTINE_LOG_ENTRIES_SUCCESS,
        routine,
        logEntries
      })
    ).toEqual({
      byId: {
        2: { id: 2, routineId: 2 },
        3: { id: 3, routineId: 1, type: 'temp_change', insertedAt: 'today', description: 'a' }
      },
      allIds: [2, 3]
    })
  })
})

describe('routine entity reducer', () => {
  const INITIAL_STATE = {
    byId: {
      4: { id: 4, logEntries: [5] }
    },
    allIds: [4]
  }

  it('should handle FETCH_ROUTINE_LOG_ENTRIES_SUCCESS', () => {
    const routine = { id: 4 }
    const logEntries = [{ id: 6, temp: 10, insertedAt: 'today' }]

    expect(
      routineReducer.entity(INITIAL_STATE, {
        type: FETCH_ROUTINE_LOG_ENTRIES_SUCCESS,
        routine,
        logEntries
      })
    ).toEqual({
      byId: {
        4: {
          id: 4,
          logEntries: [6]
        }
      },
      allIds: [4]
    })
  })
})

describe('sagas', () => {
  it('perfom fetch routine log entries success', () => {
    const routine = { id: 2 }
    const iterator = performFetchRoutineLogEntries(httpServiceMock, { routine })
    const response = httpServiceMock.getRoutineLogEntries(routine)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'getRoutineLogEntries'], routine))
    expect(iterator.next(response).value).toEqual(put(fetchRoutineLogEntriesSuccess(routine, response.data.data)))
  })

  it('perfom fetch routine log entries failure', () => {
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const iterator = performFetchRoutineLogEntries(httpServiceMock, { routine })
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'getRoutineLogEntries'], routine))
    expect(iterator.throw('an error').value).toEqual(put(fetchRoutineLogEntriesFailure('an error')))
  })
})
