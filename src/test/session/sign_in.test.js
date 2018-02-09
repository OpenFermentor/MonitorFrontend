/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS
} from '../../redux/session/action_types'
import {
  signInRequest,
  signInFailure,
  signInSuccess
} from '../../redux/session/actions'
import reducer from '../../redux/session/redux'
import { storeSession, performSignIn } from '../../redux/session/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request sign in', () => {
    const expectedAction = {
      type: SIGN_IN_REQUEST,
      email: 'a@a.a',
      password: '123'
    }
    expect(signInRequest({ email: 'a@a.a', password: '123' })).toEqual(expectedAction)
  })

  it('should create an action for sign in failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: SIGN_IN_FAILURE,
      error
    }
    expect(signInFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for sign in success', () => {
    const expectedAction = {
      type: SIGN_IN_SUCCESS,
      currentUser: 'a user'
    }
    expect(signInSuccess('a user')).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  it('should handle SIGN_IN_REQUEST', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: SIGN_IN_REQUEST
      })
    ).toEqual({
      fetching: true,
      error: null
    })
  })

  it('should handle SIGN_IN_FAILURE', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: SIGN_IN_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle SIGN_IN_SUCCESS', () => {
    expect(
      reducer.actionStatus({ fetching: false, error: 'error' }, {
        type: SIGN_IN_SUCCESS,
        currentUser: { id: 6 }
      })
    ).toEqual({
      fetching: false,
      error: null,
      currentUser: { id: 6 }
    })
  })
})

describe('sagas', () => {
  it('perform sign in success', () => {
    const sessionAttributes = { email: 'a@a.a', password: '123' }
    const iterator = performSignIn(httpServiceMock, sessionAttributes)
    const response = httpServiceMock.signIn(sessionAttributes)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'signIn'], sessionAttributes))
    expect(iterator.next(response).value).toEqual(call(storeSession, response.token, response.user))
    expect(iterator.next(response).value).toEqual(put(signInSuccess(response.user)))
  })

  it('perform sign in failure', () => {
    const sessionAttributes = { email: 'a@a.a', password: '123' }
    const iterator = performSignIn(httpServiceMock, sessionAttributes)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'signIn'], sessionAttributes))
    expect(iterator.throw('an error').value).toEqual(put(signInFailure('an error')))
  })
})
