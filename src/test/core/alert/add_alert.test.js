/* eslint-env jest */

import Immutable from 'seamless-immutable'
import {
  ADD
} from '../../../core/redux/alert/action_types'
import {
  addAlert
} from '../../../core/redux/alert/actions'
import reducer from '../../../core/redux/alert/redux'

describe('actions', () => {
  it('should create an action to add a routine alert', () => {
    const alert = { id: 5, message: 'A', errors: ['A', 'B'] }
    const expectedAction = {
      type: ADD,
      ...alert
    }
    expect(addAlert(alert)).toEqual(expectedAction)
  })
})

describe('entity reducer', () => {
  const INITIAL_STATE = Immutable(['old alert'])

  it('should handle ADD', () => {
    const alert = { id: 5, message: 'A', errors: ['A', 'B'] }
    expect(
      reducer.entity(INITIAL_STATE, {
        type: ADD,
        ...alert
      })
    ).toEqual(['old alert', { ...alert, dismissed: false }])
  })
})
