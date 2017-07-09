/* eslint-env jest */

import Immutable from 'seamless-immutable'
import { call, put } from 'redux-saga/effects'
import {
  START_ROUTINE_REQUEST,
  START_ROUTINE_FAILURE,
  START_ROUTINE_SUCCESS
} from '../../../core/redux/routines/action_types'
import {
  startRoutineRequest,
  startRoutineFailure,
  startRoutineSuccess
} from '../../../core/redux/routines/actions'
import reducer from '../../../core/redux/routines/redux'
import performStartRoutine from '../../../core/redux/routines/sagas/start_routine'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request a routine start', () => {
    const routine = { id: 4 }
    const expectedAction = {
      type: START_ROUTINE_REQUEST,
      routine
    }
    expect(startRoutineRequest(routine)).toEqual(expectedAction)
  })

  it('should create an action for routine start failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: START_ROUTINE_FAILURE,
      error
    }
    expect(startRoutineFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for routine start success', () => {
    const routine = { id: 4 }
    const expectedAction = {
      type: START_ROUTINE_SUCCESS,
      routine
    }
    expect(startRoutineSuccess(routine)).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  it('should handle START_ROUTINE_REQUEST', () => {
    expect(
      reducer.actionStatus(Immutable({ fetching: false, error: 'error', runningRoutine: null }), {
        type: START_ROUTINE_REQUEST,
        routine: { id: 6 }
      })
    ).toEqual({
      runningRoutine: null,
      fetching: true,
      error: null
    })
  })

  it('should handle START_ROUTINE_FAILURE', () => {
    expect(
      reducer.actionStatus(Immutable({ fetching: false, error: 'error', runningRoutine: null }), {
        type: START_ROUTINE_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      runningRoutine: null,
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle START_ROUTINE_SUCCESS', () => {
    expect(
      reducer.actionStatus(Immutable({ fetching: false, error: 'error', runningRoutine: null }), {
        type: START_ROUTINE_SUCCESS,
        routine: { id: 6 }
      })
    ).toEqual({
      runningRoutine: 6,
      fetching: false,
      error: null
    })
  })
})

describe('sagas', () => {
  it('perfom start routine success', () => {
    const routine = { title: 'A', id: 5 }
    const iterator = performStartRoutine(httpServiceMock, { routine })
    const response = httpServiceMock.startRoutine(routine)
    expect(iterator.next().value).toEqual(call(httpServiceMock.startRoutine, routine))
    expect(iterator.next(response).value).toEqual(put(startRoutineSuccess(routine)))
  })

  it('perfom start routine failure', () => {
    const routine = { title: 'A', id: 5 }
    const iterator = performStartRoutine(httpServiceMock, { routine })
    expect(iterator.next().value).toEqual(call(httpServiceMock.startRoutine, routine))
    expect(iterator.throw('an error').value).toEqual(put(startRoutineFailure('an error')))
  })
})
