/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  SIGN_OUT_REQUEST,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS
} from '../../redux/session/action_types'
import {
  signOutRequest,
  signOutFailure,
  signOutSuccess
} from '../../redux/session/actions'
import reducer from '../../redux/session/redux'
import { removeStoredSession, performSignOut } from '../../redux/session/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request sign in', () => {
    const expectedAction = {
      type: SIGN_OUT_REQUEST
    }
    expect(signOutRequest()).toEqual(expectedAction)
  })

  it('should create an action for sign in failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: SIGN_OUT_FAILURE,
      error
    }
    expect(signOutFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for sign in success', () => {
    const expectedAction = {
      type: SIGN_OUT_SUCCESS
    }
    expect(signOutSuccess()).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  it('should handle SIGN_OUT_REQUEST', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: SIGN_OUT_REQUEST
      })
    ).toEqual({
      fetching: true,
      error: null
    })
  })

  it('should handle SIGN_OUT_FAILURE', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: SIGN_OUT_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle SIGN_OUT_SUCCESS', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error', currentUser: 'a user' }, {
        type: SIGN_OUT_SUCCESS
      })
    ).toEqual({
      fetching: false,
      error: null,
      currentUser: null
    })
  })
})

describe('sagas', () => {
  it('perform sign in success', () => {
    const iterator = performSignOut(httpServiceMock)
    const response = httpServiceMock.signOut()
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'signOut']))
    expect(iterator.next(response).value).toEqual(call(removeStoredSession))
    expect(iterator.next().value).toEqual(put(signOutSuccess(response.user)))
  })

  it('perform sign in failure', () => {
    const iterator = performSignOut(httpServiceMock)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'signOut']))
    expect(iterator.throw('an error').value).toEqual(put(signOutFailure('an error')))
  })
})
