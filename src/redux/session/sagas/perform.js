import { call, put } from 'redux-saga/effects'
import {
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess
} from '../actions'

export function * performStartup (httpService) {
  const { accessToken, currentUser } = yield call(loadStoredSession)
  if (currentUser) {
    httpService.setSessionHeaders(accessToken)
  }
  yield put({ type: 'BOOTED', currentUser })
}

export function * performSignIn (httpService, { email, password }) {
  try {
    const response = yield call([httpService, 'signIn'], { email, password })
    httpService.setSessionHeaders(response.data.token)
    yield call(storeSession, response.data.token, response.data.user)
    yield put(signInSuccess(response.data.user))
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function * performSignOut (httpService) {
  try {
    yield call([httpService, 'signOut'])
    httpService.removeSessionHeaders()
    yield call(removeStoredSession)
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailure(error))
  }
}

export function * storeSession (accessToken, currentUser) {
  window.localStorage.setItem('current-user', JSON.stringify(currentUser))
  window.localStorage.setItem('access-token', accessToken)
}

export function * removeStoredSession () {
  window.localStorage.setItem('current-user', null)
  window.localStorage.setItem('access-token', null)
}

export function * loadStoredSession () {
  const currentUser = window.localStorage.getItem('current-user')
  return {
    accessToken: window.localStorage.getItem('access-token'),
    currentUser: currentUser ? JSON.parse(currentUser) : null
  }
}
