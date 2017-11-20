/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  STOP_ROUTINE_REQUEST,
  STOP_ROUTINE_FAILURE,
  STOP_ROUTINE_SUCCESS
} from '../../redux/routine/action_types'
import {
  stopRunningRoutineRequest,
  stopRunningRoutineFailure,
  stopRunningRoutineSuccess
} from '../../redux/routine/actions'
import reducer from '../../redux/routine/redux'
import { performStopRoutine } from '../../redux/routine/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request running routine stop', () => {
    const expectedAction = {
      type: STOP_ROUTINE_REQUEST
    }
    expect(stopRunningRoutineRequest()).toEqual(expectedAction)
  })

  it('should create an action for running routine stop failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: STOP_ROUTINE_FAILURE,
      error
    }
    expect(stopRunningRoutineFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for running routine stop success', () => {
    const expectedAction = {
      type: STOP_ROUTINE_SUCCESS
    }
    expect(stopRunningRoutineSuccess()).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  it('should handle STOP_ROUTINE_REQUEST', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error', runningRoutine: 4 }, {
        type: STOP_ROUTINE_REQUEST
      })
    ).toEqual({
      runningRoutine: 4,
      fetching: true,
      error: null
    })
  })

  it('should handle STOP_ROUTINE_FAILURE', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error', runningRoutine: 4 }, {
        type: STOP_ROUTINE_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      runningRoutine: 4,
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle STOP_ROUTINE_SUCCESS', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error', runningRoutine: 4 }, {
        type: STOP_ROUTINE_SUCCESS
      })
    ).toEqual({
      runningRoutine: null,
      fetching: false,
      error: null
    })
  })
})

describe('sagas', () => {
  it('perfom stop running routine success', () => {
    const iterator = performStopRoutine(httpServiceMock)
    const response = httpServiceMock.stopRunningRoutine()
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'stopRunningRoutine']))
    expect(iterator.next(response).value).toEqual(put(stopRunningRoutineSuccess()))
  })

  it('perfom stop running routine failure', () => {
    const iterator = performStopRoutine(httpServiceMock)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'stopRunningRoutine']))
    expect(iterator.throw('an error').value).toEqual(put(stopRunningRoutineFailure('an error')))
  })
})
