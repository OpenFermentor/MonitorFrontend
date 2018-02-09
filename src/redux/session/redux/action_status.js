import reduceReducers from 'reduce-reducers'
import buildActionStatusReducer from '../../helper/action_status_builder'
import {
  merge
} from '../../helper'

import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../action_types'

const requestReducer = buildActionStatusReducer({
  namespace: 'SESSION.',
  extraActions: [
    'SESSION.SIGN_IN',
    'SESSION.SIGN_OUT'
  ]
})

const INITIAL_STATE = {
  currentUser: null
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BOOTED': return setCurrentUser(state, action)
    case SIGN_IN_SUCCESS: return setCurrentUser(state, action)
    case SIGN_OUT_SUCCESS: return signOutSuccess(state, action)
    default: return state
  }
}

const setCurrentUser = (state, { currentUser }) =>
  merge(state, { currentUser })

const signOutSuccess = state =>
  merge(state, { currentUser: null })

export default reduceReducers(requestReducer, reducer)
