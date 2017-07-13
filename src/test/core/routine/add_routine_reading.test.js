/* eslint-env jest */

import Immutable from 'seamless-immutable'
import {
  ADD_ROUTINE_READING
} from '../../../core/redux/routine/action_types'
import {
  addRoutineReading
} from '../../../core/redux/routine/actions'
import reducer from '../../../core/redux/routine/redux'
// import { performCreateRoutine } from '../../../core/redux/routine/sagas/perform'
// import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to add a routine reading', () => {
    const routineReading = { routineId: 1, temp: 20, createdAt: 'today' }
    const expectedAction = {
      type: ADD_ROUTINE_READING,
      ...routineReading
    }
    expect(addRoutineReading(routineReading)).toEqual(expectedAction)
  })
})

describe('entity reducer', () => {
  const INITIAL_STATE = Immutable({
    byId: Immutable({
      4: {
        readings: Immutable([{ temp: 18, createdAt: 'a minute ago' }, { temp: 20, createdAt: 'an hour ago' }])
      }
    }),
    allIds: Immutable([4])
  })

  it('should handle ADD_ROUTINE_READING', () => {
    const routineReading = { routineId: 4, temp: 25, createdAt: 'now' }

    expect(
      reducer.entity(INITIAL_STATE, {
        type: ADD_ROUTINE_READING,
        ...routineReading
      })
    ).toEqual({
      byId: {
        4: {
          readings: [{ temp: 18, createdAt: 'a minute ago' }, { temp: 20, createdAt: 'an hour ago' }, { temp: 25, createdAt: 'now' }]
        }
      },
      allIds: [4]
    })
  })
})

describe('sagas', () => {
  // it('perfom create routine success', () => {
  //   const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
  //   const iterator = performCreateRoutine(httpServiceMock, { routine })
  //   const response = httpServiceMock.createRoutine(routine)
  //   expect(iterator.next().value).toEqual(call([httpServiceMock, 'createRoutine'], routine))
  //   expect(iterator.next(response).value).toEqual(put(createRoutineSuccess({ id: 1, ...routine })))
  // })
  //
  // it('perfom create routine failure', () => {
  //   const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
  //   const iterator = performCreateRoutine(httpServiceMock, { routine })
  //   expect(iterator.next().value).toEqual(call([httpServiceMock, 'createRoutine'], routine))
  //   expect(iterator.throw('an error').value).toEqual(put(createRoutineFailure('an error')))
  // })
})
