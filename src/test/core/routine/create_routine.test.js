/* eslint-env jest */

import Immutable from 'seamless-immutable'
import { call, put } from 'redux-saga/effects'
import {
  CREATE_ROUTINE_REQUEST,
  CREATE_ROUTINE_FAILURE,
  CREATE_ROUTINE_SUCCESS
} from '../../../core/redux/routines/action_types'
import {
  createRoutineRequest,
  createRoutineFailure,
  createRoutineSuccess
} from '../../../core/redux/routines/actions'
import reducer from '../../../core/redux/routines/redux'
import performCreateRoutine from '../../../core/redux/routines/sagas/create_routine'
import httpServiceMock from '../networking_mock'

describe('actions', () => {
  it('should create an action to request a routine create', () => {
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, extimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const expectedAction = {
      type: CREATE_ROUTINE_REQUEST,
      ...routine
    }
    expect(createRoutineRequest(routine)).toEqual(expectedAction)
  })

  it('should create an action for routine create failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: CREATE_ROUTINE_FAILURE,
      error
    }
    expect(createRoutineFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for routine create success', () => {
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, extimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const expectedAction = {
      type: CREATE_ROUTINE_SUCCESS,
      routine
    }
    expect(createRoutineSuccess(routine)).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  const DIRTY_STATE = Immutable({ fetching: false, error: 'error', runningRoutine: null })

  it('should handle CREATE_ROUTINE_REQUEST', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: CREATE_ROUTINE_REQUEST
      })
    ).toEqual({
      runningRoutine: null,
      fetching: true,
      error: null
    })
  })

  it('should handle CREATE_ROUTINE_FAILURE', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: CREATE_ROUTINE_FAILURE,
        error: 'an error'
      })
    ).toEqual({
      runningRoutine: null,
      fetching: false,
      error: 'an error'
    })
  })

  it('should handle CREATE_ROUTINE_SUCCESS', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: CREATE_ROUTINE_SUCCESS
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
    byId: Immutable({}),
    allIds: Immutable([])
  })

  it('should handle CREATE_ROUTINE_SUCCESS', () => {
    const routine = { id: 4, title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, extimatedTimeSeconds: 100, extraNotes: 'some notes' }

    expect(
      reducer.entity(INITIAL_STATE, {
        type: CREATE_ROUTINE_SUCCESS,
        routine
      })
    ).toEqual({
      byId: {
        4: {
          ...routine,
          readings: []
        }
      },
      allIds: [4]
    })
  })
})

describe('sagas', () => {
  it('perfom create routine success', () => {
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, extimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const iterator = performCreateRoutine(httpServiceMock, { routine })
    const response = httpServiceMock.createRoutine(routine)
    expect(iterator.next().value).toEqual(call(httpServiceMock.createRoutine, routine))
    expect(iterator.next(response).value).toEqual(put(createRoutineSuccess({ id: 1, ...routine })))
  })

  it('perfom create routine failure', () => {
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, targetCo2: 1, targetDensity: 0.5, extimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const iterator = performCreateRoutine(httpServiceMock, { routine })
    expect(iterator.next().value).toEqual(call(httpServiceMock.createRoutine, routine))
    expect(iterator.throw('an error').value).toEqual(put(createRoutineFailure('an error')))
  })
})
