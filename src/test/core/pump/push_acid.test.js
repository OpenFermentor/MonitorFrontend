/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  PUSH_ACID_REQUEST,
  PUSH_ACID_FAILURE,
  PUSH_ACID_SUCCESS
} from '../../../redux/calibration/pump/action_types'
import {
  pushAcidRequest,
  pushAcidFailure,
  pushAcidSuccess
} from '../../../redux/calibration/pump/actions'
import reducer from '../../../redux/calibration/pump/redux'
import { performPushAcid } from '../../../redux/calibration/pump/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request push acid', () => {
    const expectedAction = {
      type: PUSH_ACID_REQUEST
    }
    expect(pushAcidRequest()).toEqual(expectedAction)
  })

  it('should create an action for push acid failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: PUSH_ACID_FAILURE,
      error
    }
    expect(pushAcidFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for push acid success', () => {
    const expectedAction = {
      type: PUSH_ACID_SUCCESS
    }
    expect(pushAcidSuccess()).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  it('should handle PUSH_ACID_REQUEST', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: PUSH_ACID_REQUEST
      })
    ).toEqual({
      fetching: true,
      error: null
    })
  })

  it('should handle PUSH_ACID_FAILURE', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: PUSH_ACID_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle PUSH_ACID_SUCCESS', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: PUSH_ACID_SUCCESS,
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
    const iterator = performPushAcid(httpServiceMock)
    const response = httpServiceMock.pushAcid()
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'pushAcid']))
    expect(iterator.next(response).value).toEqual(put(pushAcidSuccess()))
  })

  it('perfom start system failure', () => {
    const iterator = performPushAcid(httpServiceMock)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'pushAcid']))
    expect(iterator.throw('an error').value).toEqual(put(pushAcidFailure('an error')))
  })
})
