/* eslint-env jest */

import {
  ADD_READING
} from '../../redux/reading/action_types'
import {
  addReading
} from '../../redux/reading/actions'
import reducer from '../../redux/reading/redux'
import routineReducer from '../../redux/routine/redux'

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
  const INITIAL_STATE = {
    byId: {
      4: 'old reading'
    },
    allIds: [4]
  }

  it('should handle ADD_READING', () => {
    const reading = { id: 1, routineId: 4, temp: 25, ph: 9, insertedAt: 'now' }
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
  const INITIAL_STATE = {
    byId: {
      4: { id: 4, readings: [3] }
    },
    allIds: [4]
  }

  it('should handle ADD_READING', () => {
    const reading = { id: 1, routineId: 4, temp: 25, ph: 9, insertedAt: 'now' }
    expect(
      routineReducer.entity(INITIAL_STATE, {
        type: ADD_READING,
        reading
      })
    ).toEqual({
      byId: {
        4: {
          id: 4,
          readings: [3, 1]
        }
      },
      allIds: [4]
    })
  })
})
