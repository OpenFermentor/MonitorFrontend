/* eslint-env jest */

import Immutable from 'seamless-immutable'
import { call, put } from 'redux-saga/effects'
import {
  UPDATE_ROUTINE_REQUEST,
  UPDATE_ROUTINE_FAILURE,
  UPDATE_ROUTINE_SUCCESS
} from '../../../core/redux/routine/action_types'
import {
  updateRoutineRequest,
  updateRoutineFailure,
  updateRoutineSuccess
} from '../../../core/redux/routine/actions'
import reducer from '../../../core/redux/routine/redux'
import { performUpdateRoutine } from '../../../core/redux/routine/sagas/perform'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request a routine update', () => {
    const routine = { id: 4, title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const expectedAction = {
      type: UPDATE_ROUTINE_REQUEST,
      routine
    }
    expect(updateRoutineRequest(routine)).toEqual(expectedAction)
  })

  it('should create an action for routine update failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: UPDATE_ROUTINE_FAILURE,
      error
    }
    expect(updateRoutineFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for routine update success', () => {
    const routine = { id: 4, title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const expectedAction = {
      type: UPDATE_ROUTINE_SUCCESS,
      routine
    }
    expect(updateRoutineSuccess(routine)).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  const DIRTY_STATE = Immutable({ fetching: false, error: 'error', runningRoutine: null })

  it('should handle UPDATE_ROUTINE_REQUEST', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: UPDATE_ROUTINE_REQUEST
      })
    ).toEqual({
      runningRoutine: null,
      fetching: true,
      error: null
    })
  })

  it('should handle UPDATE_ROUTINE_FAILURE', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: UPDATE_ROUTINE_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      runningRoutine: null,
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle UPDATE_ROUTINE_SUCCESS', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: UPDATE_ROUTINE_SUCCESS
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
    byId: Immutable({
      4: Immutable({ id: 4, title: '3', strain: 60, medium: 'other medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, estimatedTimeSeconds: 100, extraNotes: 'some notes', readings: Immutable([5]) })
    }),
    allIds: Immutable([4])
  })

  it('should handle UPDATE_ROUTINE_SUCCESS', () => {
    const routine = { id: 4, title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, estimatedTimeSeconds: 100, extraNotes: 'some notes' }

    expect(
      reducer.entity(INITIAL_STATE, {
        type: UPDATE_ROUTINE_SUCCESS,
        routine
      })
    ).toEqual({
      byId: {
        4: {
          ...routine,
          readings: [5]
        }
      },
      allIds: [4]
    })
  })
})

describe('sagas', () => {
  it('perfom update routine success', () => {
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const iterator = performUpdateRoutine(httpServiceMock, { routine })
    const response = httpServiceMock.updateRoutine(routine)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'updateRoutine'], routine))
    expect(iterator.next(response).value).toEqual(put(updateRoutineSuccess(routine)))
  })

  it('perfom update routine failure', () => {
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const iterator = performUpdateRoutine(httpServiceMock, { routine })
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'updateRoutine'], routine))
    expect(iterator.throw('an error').value).toEqual(put(updateRoutineFailure('an error')))
  })
})
