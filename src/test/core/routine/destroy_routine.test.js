/* eslint-env jest */

import Immutable from 'seamless-immutable'
import { call, put } from 'redux-saga/effects'
import {
  DESTROY_ROUTINE_REQUEST,
  DESTROY_ROUTINE_FAILURE,
  DESTROY_ROUTINE_SUCCESS
} from '../../../core/redux/routines/action_types'
import {
  destroyRoutineRequest,
  destroyRoutineFailure,
  destroyRoutineSuccess
} from '../../../core/redux/routines/actions'
import reducer from '../../../core/redux/routines/redux'
import performRemoveRoutine from '../../../core/redux/routines/sagas/remove_routine'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should destroy an action to request a routine destruction', () => {
    const routine = { id: 5 }
    const expectedAction = {
      type: DESTROY_ROUTINE_REQUEST,
      routine
    }
    expect(destroyRoutineRequest(routine)).toEqual(expectedAction)
  })

  it('should destroy an action for routine destruction failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: DESTROY_ROUTINE_FAILURE,
      error
    }
    expect(destroyRoutineFailure(error)).toEqual(expectedAction)
  })

  it('should destroy an action for routine destruction success', () => {
    const routine = { id: 5 }
    const expectedAction = {
      type: DESTROY_ROUTINE_SUCCESS,
      routine
    }
    expect(destroyRoutineSuccess(routine)).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  const DIRTY_STATE = Immutable({ fetching: false, error: 'error', runningRoutine: null })

  it('should handle DESTROY_ROUTINE_REQUEST', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: DESTROY_ROUTINE_REQUEST
      })
    ).toEqual({
      runningRoutine: null,
      fetching: true,
      error: null
    })
  })

  it('should handle DESTROY_ROUTINE_FAILURE', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: DESTROY_ROUTINE_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      runningRoutine: null,
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle DESTROY_ROUTINE_SUCCESS', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: DESTROY_ROUTINE_SUCCESS
      })
    ).toEqual({
      runningRoutine: null,
      fetching: false,
      error: null
    })
  })
})

describe('entity reducer', () => {
  const INITIAL_STATE = Immutable({
    byId: Immutable({ 4: 'a routine', 5: 'another routine' }),
    allIds: Immutable([4, 5])
  })

  it('should handle DESTROY_ROUTINE_SUCCESS', () => {
    const routine = { id: 5 }

    expect(
      reducer.entity(INITIAL_STATE, {
        type: DESTROY_ROUTINE_SUCCESS,
        routine
      })
    ).toEqual({
      byId: {
        4: 'a routine'
      },
      allIds: [4]
    })
  })
})

describe('sagas', () => {
  it('perfom destroy routine success', () => {
    const routine = { id: 5 }
    const iterator = performRemoveRoutine(httpServiceMock, { routine })
    const response = httpServiceMock.removeRoutine(routine)
    expect(iterator.next().value).toEqual(call(httpServiceMock.removeRoutine, routine.id))
    expect(iterator.next(response).value).toEqual(put(destroyRoutineSuccess(routine)))
  })

  it('perfom destroy routine failure', () => {
    const routine = { id: 5 }
    const iterator = performRemoveRoutine(httpServiceMock, { routine })
    expect(iterator.next().value).toEqual(call(httpServiceMock.removeRoutine, routine.id))
    expect(iterator.throw('an error').value).toEqual(put(destroyRoutineFailure('an error')))
  })
})
