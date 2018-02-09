/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  PUSH_BASE_REQUEST,
  PUSH_BASE_FAILURE,
  PUSH_BASE_SUCCESS
} from '../../redux/calibration/pump/action_types'
import {
  pushBaseRequest,
  pushBaseFailure,
  pushBaseSuccess
} from '../../redux/calibration/pump/actions'
import reducer from '../../redux/calibration/pump/redux'
import { performPushBase } from '../../redux/calibration/pump/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request push base', () => {
    const expectedAction = {
      type: PUSH_BASE_REQUEST
    }
    expect(pushBaseRequest()).toEqual(expectedAction)
  })

  it('should create an action for push base failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: PUSH_BASE_FAILURE,
      error
    }
    expect(pushBaseFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for push base success', () => {
    const expectedAction = {
      type: PUSH_BASE_SUCCESS
    }
    expect(pushBaseSuccess()).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  it('should handle PUSH_BASE_REQUEST', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: PUSH_BASE_REQUEST
      })
    ).toEqual({
      fetching: true,
      error: null
    })
  })

  it('should handle PUSH_BASE_FAILURE', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: PUSH_BASE_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle PUSH_BASE_SUCCESS', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: PUSH_BASE_SUCCESS,
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
    const iterator = performPushBase(httpServiceMock)
    const response = httpServiceMock.pushBase()
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'pushBase']))
    expect(iterator.next(response).value).toEqual(put(pushBaseSuccess()))
  })

  it('perfom start system failure', () => {
    const iterator = performPushBase(httpServiceMock)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'pushBase']))
    expect(iterator.throw('an error').value).toEqual(put(pushBaseFailure('an error')))
  })
})
