/* eslint-env jest */

import {
  MERGE_READINGS
} from '../../../redux/reading/action_types'
import {
  mergeReadings
} from '../../../redux/reading/actions'
import reducer from '../../../redux/reading/redux'
import routineReducer from '../../../redux/routine/redux'

import readings from './readings'

describe('actions', () => {
  it('should create an action to merge readings', () => {
    const readings = { routineId: 1, readingsIds: [1, 2], temp: 100 }
    const expectedAction = {
      type: MERGE_READINGS,
      readings
    }
    expect(mergeReadings(readings)).toEqual(expectedAction)
  })
})

describe('entity reducer', () => {
  const INITIAL_STATE = {
    byId: {
      0: readings[0],
      1: readings[1],
      2: readings[2],
      3: readings[3],
      4: readings[4],
      5: 'a reading'
    },
    allIds: [1, 2, 3, 4, 5]
  }

  it('should handle MERGE_READINGS', () => {
    const readings = [
      { readingsIds: [0, 2, 4], routineId: 1, temp: 25, ph: 9, density: 100, co2: 40, insertedAtValue: 'now' },
      { readingsIds: [1, 3], routineId: 2, temp: 30, ph: 4, density: 34, co2: 10, insertedAtValue: 'yesterday' }
    ]
    expect(
      reducer.entity(INITIAL_STATE, {
        type: MERGE_READINGS,
        readings
      })
    ).toEqual({
      byId: {
        '0,2,4': { id: '0,2,4', temp: 25, ph: 9, routineId: 1, density: 100, co2: 40, insertedAt: 'now', merged: true },
        '1,3': { id: '1,3', temp: 30, ph: 4, routineId: 2, density: 34, co2: 10, insertedAt: 'yesterday', merged: true },
        5: 'a reading'
      },
      allIds: [5, '0,2,4', '1,3']
    })
  })
})

describe('routine entity reducer', () => {
  const INITIAL_STATE = {
    byId: {
      1: {
        id: 1,
        readings: [0, 2, 4, 5]
      },
      2: {
        id: 2,
        readings: [1, 3, 6]
      },
      3: 'a routine'
    },
    allIds: [1, 2, 3]
  }

  it('should handle MERGE_READINGS', () => {
    const readings = [
      { readingsIds: [0, 2, 4], routineId: 1, temp: 25, ph: 9, density: 100, co2: 40, insertedAtValue: 'now' },
      { readingsIds: [1, 3], routineId: 2, temp: 30, ph: 4, density: 34, co2: 10, insertedAtValue: 'yesterday' }
    ]
    expect(
      routineReducer.entity(INITIAL_STATE, {
        type: MERGE_READINGS,
        readings
      })
    ).toEqual({
      byId: {
        1: {
          id: 1,
          readings: [5, '0,2,4']
        },
        2: {
          id: 2,
          readings: [6, '1,3']
        },
        3: 'a routine'
      },
      allIds: [1, 2, 3]
    })
  })
})
