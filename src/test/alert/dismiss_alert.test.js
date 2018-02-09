/* eslint-env jest */

import Immutable from 'seamless-immutable'
import {
  DISMISS
} from '../../redux/alert/action_types'
import {
  dismissAlert
} from '../../redux/alert/actions'
import reducer from '../../redux/alert/redux'

describe('actions', () => {
  it('should create an action to add a routine alert', () => {
    const alert = { id: 5 }
    const expectedAction = {
      type: DISMISS,
      alert
    }
    expect(dismissAlert(alert)).toEqual(expectedAction)
  })
})

describe('entity reducer', () => {
  const INITIAL_STATE = Immutable([{ id: 5, message: 'A', dismissed: false }])

  it('should handle ADD', () => {
    const alert = { id: 5 }
    expect(
      reducer.entity(INITIAL_STATE, {
        type: DISMISS,
        alert
      })
    ).toEqual([{ id: 5, message: 'A', dismissed: true }])
  })
})
