/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  TEST_ACID_DROP_REQUEST,
  TEST_ACID_DROP_FAILURE,
  TEST_ACID_DROP_SUCCESS
} from '../../redux/calibration/pump/action_types'
import {
  testAcidDropRequest,
  testAcidDropFailure,
  testAcidDropSuccess
} from '../../redux/calibration/pump/actions'
import reducer from '../../redux/calibration/pump/redux'
import { performTestAcidDrop } from '../../redux/calibration/pump/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request test acid drop', () => {
    const expectedAction = {
      type: TEST_ACID_DROP_REQUEST
    }
    expect(testAcidDropRequest()).toEqual(expectedAction)
  })

  it('should create an action for test acid drop failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: TEST_ACID_DROP_FAILURE,
      error
    }
    expect(testAcidDropFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for test acid drop success', () => {
    const expectedAction = {
      type: TEST_ACID_DROP_SUCCESS
    }
    expect(testAcidDropSuccess()).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  it('should handle TEST_ACID_DROP_REQUEST', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: TEST_ACID_DROP_REQUEST
      })
    ).toEqual({
      fetching: true,
      error: null
    })
  })

  it('should handle TEST_ACID_DROP_FAILURE', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: TEST_ACID_DROP_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle TEST_ACID_DROP_SUCCESS', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: TEST_ACID_DROP_SUCCESS,
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
    const iterator = performTestAcidDrop(httpServiceMock)
    const response = httpServiceMock.testAcidDrop()
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'testAcidDrop']))
    expect(iterator.next(response).value).toEqual(put(testAcidDropSuccess()))
  })

  it('perfom start system failure', () => {
    const iterator = performTestAcidDrop(httpServiceMock)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'testAcidDrop']))
    expect(iterator.throw('an error').value).toEqual(put(testAcidDropFailure('an error')))
  })
})
