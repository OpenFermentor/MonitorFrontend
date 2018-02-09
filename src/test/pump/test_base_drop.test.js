/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  TEST_BASE_DROP_REQUEST,
  TEST_BASE_DROP_FAILURE,
  TEST_BASE_DROP_SUCCESS
} from '../../redux/calibration/pump/action_types'
import {
  testBaseDropRequest,
  testBaseDropFailure,
  testBaseDropSuccess
} from '../../redux/calibration/pump/actions'
import reducer from '../../redux/calibration/pump/redux'
import { performTestBaseDrop } from '../../redux/calibration/pump/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request test base drop', () => {
    const expectedAction = {
      type: TEST_BASE_DROP_REQUEST
    }
    expect(testBaseDropRequest()).toEqual(expectedAction)
  })

  it('should create an action for test base drop failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: TEST_BASE_DROP_FAILURE,
      error
    }
    expect(testBaseDropFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for test base drop success', () => {
    const expectedAction = {
      type: TEST_BASE_DROP_SUCCESS
    }
    expect(testBaseDropSuccess()).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  it('should handle TEST_BASE_DROP_REQUEST', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: TEST_BASE_DROP_REQUEST
      })
    ).toEqual({
      fetching: true,
      error: null
    })
  })

  it('should handle TEST_BASE_DROP_FAILURE', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: TEST_BASE_DROP_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle TEST_BASE_DROP_SUCCESS', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: TEST_BASE_DROP_SUCCESS,
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
    const iterator = performTestBaseDrop(httpServiceMock)
    const response = httpServiceMock.testBaseDrop()
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'testBaseDrop']))
    expect(iterator.next(response).value).toEqual(put(testBaseDropSuccess()))
  })

  it('perfom start system failure', () => {
    const iterator = performTestBaseDrop(httpServiceMock)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'testBaseDrop']))
    expect(iterator.throw('an error').value).toEqual(put(testBaseDropFailure('an error')))
  })
})
