/* eslint-env jest */

import Immutable from 'seamless-immutable'
import {
  ADD_READING
} from '../../../core/redux/reading/action_types'
import {
  addReading
} from '../../../core/redux/reading/actions'
import reducer from '../../../core/redux/reading/redux'
import routineReducer from '../../../core/redux/routine/redux'

describe('actions', () => {
  it('should create an action to add a routine reading', () => {
    const reading = { id: 5, routineId: 1, temp: 20, insertedAt: 'today' }
    const expectedAction = {
      type: ADD_READING,
      reading
    }
    expect(addReading(reading)).toEqual(expectedAction)
  })
})

describe('entity reducer', () => {
  const INITIAL_STATE = Immutable({
    byId: Immutable({
      4: 'old reading'
    }),
    allIds: Immutable([4])
  })

  it('should handle ADD_READING', () => {
    const reading = { id: 1, routineId: 4, temp: 25, ph: 9, density: 100, co2: 40, insertedAt: 'now' }
    expect(
      reducer.entity(INITIAL_STATE, {
        type: ADD_READING,
        reading
      })
    ).toEqual({
      byId: {
        4: 'old reading',
        1: reading
      },
      allIds: [4, 1]
    })
  })
})

describe('routine entity reducer', () => {
  const INITIAL_STATE = Immutable({
    byId: Immutable({
      4: { id: 4, readings: Immutable([3]) }
    }),
    allIds: Immutable([4])
  })

  it('should handle ADD_READING', () => {
    const reading = { id: 1, routineId: 4, temp: 25, ph: 9, density: 100, co2: 40, insertedAt: 'now' }
    expect(
      routineReducer.entity(INITIAL_STATE, {
        type: ADD_READING,
        reading
      })
    ).toEqual({
      byId: {
        4: {
          id: 4,
          readings: Immutable([3, 1])
        }
      },
      allIds: [4]
    })
  })
})
