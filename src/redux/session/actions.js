import {
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,

  SIGN_OUT_REQUEST,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS
} from './action_types'

export const signInRequest = ({ email, password }) => ({ type: SIGN_IN_REQUEST, email, password })
export const signInFailure = error => ({ type: SIGN_IN_FAILURE, error })
export const signInSuccess = currentUser => ({ type: SIGN_IN_SUCCESS, currentUser })

export const signOutRequest = () => ({ type: SIGN_OUT_REQUEST })
export const signOutFailure = error => ({ type: SIGN_OUT_FAILURE, error })
export const signOutSuccess = () => ({ type: SIGN_OUT_SUCCESS })
