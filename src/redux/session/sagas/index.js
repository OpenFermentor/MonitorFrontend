import { takeEvery } from 'redux-saga/effects'
import { performStartup, performSignIn, performSignOut } from './perform'
import httpService from '../../../networking'

import { SIGN_IN_REQUEST, SIGN_OUT_REQUEST } from '../action_types'

export default [
  takeEvery('BOOTING', performStartup, httpService),
  takeEvery(SIGN_IN_REQUEST, performSignIn, httpService),
  takeEvery(SIGN_OUT_REQUEST, performSignOut, httpService)
]
