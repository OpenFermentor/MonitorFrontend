/* eslint-env jest */

import reducer from '../../../core/redux/routines/redux'
import Immutable from 'seamless-immutable'
import {
  RESET,
  STARTUP
} from '../../../core/redux/base/action_types'

describe('action status reducer', () => {
  const DIRTY_STATE = Immutable({ fetching: false, error: 'error', runningRoutine: null })

  it('should handle RESET', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: RESET
      })
    ).toEqual({
      runningRoutine: null,
      fetching: null,
      error: null
    })
  })
  it('should handle STARTUP', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: STARTUP
      })
    ).toEqual({
      fetching: null,
      error: null
    })
  })
})
