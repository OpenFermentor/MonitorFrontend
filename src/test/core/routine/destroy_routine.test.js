/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  DESTROY_ROUTINE_REQUEST,
  DESTROY_ROUTINE_FAILURE,
  DESTROY_ROUTINE_SUCCESS
} from '../../../redux/routine/action_types'
import {
  destroyRoutineRequest,
  destroyRoutineFailure,
  destroyRoutineSuccess
} from '../../../redux/routine/actions'
import reducer from '../../../redux/routine/redux'
import { performRemoveRoutine } from '../../../redux/routine/sagas/perform'
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
  const DIRTY_STATE = { fetching: false, error: 'error', runningRoutine: null }

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
  const INITIAL_STATE = {
    byId: { 4: 'a routine', 5: 'another routine' },
    allIds: [4, 5]
  }

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
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'removeRoutine'], routine.id))
    expect(iterator.next(response).value).toEqual(put(destroyRoutineSuccess(routine)))
  })

  it('perfom destroy routine failure', () => {
    const routine = { id: 5 }
    const iterator = performRemoveRoutine(httpServiceMock, { routine })
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'removeRoutine'], routine.id))
    expect(iterator.throw('an error').value).toEqual(put(destroyRoutineFailure('an error')))
  })
})
