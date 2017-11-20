/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  RESTART_REQUEST,
  RESTART_FAILURE,
  RESTART_SUCCESS
} from '../../redux/system/action_types'
import {
  restartRequest,
  restartFailure,
  restartSuccess
} from '../../redux/system/actions'
import reducer from '../../redux/system/redux'
import { performSystemRestart } from '../../redux/system/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request system start', () => {
    const expectedAction = {
      type: RESTART_REQUEST
    }
    expect(restartRequest()).toEqual(expectedAction)
  })

  it('should create an action for system start failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: RESTART_FAILURE,
      error
    }
    expect(restartFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for system start success', () => {
    const expectedAction = {
      type: RESTART_SUCCESS
    }
    expect(restartSuccess()).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  it('should handle RESTART_REQUEST', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: RESTART_REQUEST
      })
    ).toEqual({
      fetching: true,
      error: null
    })
  })

  it('should handle RESTART_FAILURE', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: RESTART_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle RESTART_SUCCESS', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: RESTART_SUCCESS,
        system: { id: 6 }
      })
    ).toEqual({
      fetching: false,
      error: null
    })
  })
})

describe('sagas', () => {
  it('perfom start system success', () => {
    const iterator = performSystemRestart(httpServiceMock)
    const response = httpServiceMock.systemRestart()
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'systemRestart']))
    expect(iterator.next(response).value).toEqual(put(restartSuccess()))
  })

  it('perfom start system failure', () => {
    const iterator = performSystemRestart(httpServiceMock)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'systemRestart']))
    expect(iterator.throw('an error').value).toEqual(put(restartFailure('an error')))
  })
})
