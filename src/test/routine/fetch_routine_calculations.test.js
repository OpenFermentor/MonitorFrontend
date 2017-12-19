/* eslint-env jest */

import { call, put } from 'redux-saga/effects'
import {
  FETCH_ROUTINE_CALCULATIONS_REQUEST,
  FETCH_ROUTINE_CALCULATIONS_FAILURE,
  FETCH_ROUTINE_CALCULATIONS_SUCCESS
} from '../../redux/routine/action_types'
import {
  fetchRoutineCalculationsRequest,
  fetchRoutineCalculationsFailure,
  fetchRoutineCalculationsSuccess
} from '../../redux/routine/actions'
import reducer from '../../redux/routine/redux'
import { performFetchRoutineCalculations } from '../../redux/routine/sagas/perform'
import httpServiceMock from '../networking_mock'
import { merge } from '../../redux/helper'

describe('actions', () => {
  it('should create an action to request routine calculations', () => {
    const routine = { id: 4, title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const expectedAction = {
      type: FETCH_ROUTINE_CALCULATIONS_REQUEST,
      routine
    }
    expect(fetchRoutineCalculationsRequest(routine)).toEqual(expectedAction)
  })

  it('should create an action for routine calculations fetching failure', () => {
    const error = 'an error'
    const expectedAction = {
      type: FETCH_ROUTINE_CALCULATIONS_FAILURE,
      error
    }
    expect(fetchRoutineCalculationsFailure(error)).toEqual(expectedAction)
  })

  it('should create an action for routine calculations fetching success', () => {
    const routine = { id: 4, title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const calculations = { biomassPerformance: [] }
    const expectedAction = {
      type: FETCH_ROUTINE_CALCULATIONS_SUCCESS,
      routine,
      calculations
    }
    expect(fetchRoutineCalculationsSuccess(routine, calculations)).toEqual(expectedAction)
  })
})

describe('action status reducer', () => {
  const INITIAL_STATE = reducer.actionStatus(undefined, {})
  const DIRTY_STATE = merge(INITIAL_STATE, { fetching: false, error: 'error' })

  it('should handle FETCH_ROUTINE_CALCULATIONS_REQUEST', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: FETCH_ROUTINE_CALCULATIONS_REQUEST
      })
    ).toEqual(merge(INITIAL_STATE, {
      fetching: true,
      error: null
    }))
  })

  it('should handle FETCH_ROUTINE_CALCULATIONS_FAILURE', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: FETCH_ROUTINE_CALCULATIONS_FAILURE,
        error: 'an error'
      })
    ).toEqual(merge(INITIAL_STATE, {
      fetching: false,
      error: 'an error'
    }))
  })

  it('should handle FETCH_ROUTINE_CALCULATIONS_SUCCESS', () => {
    expect(
      reducer.actionStatus(DIRTY_STATE, {
        type: FETCH_ROUTINE_CALCULATIONS_SUCCESS
      })
    ).toEqual(merge(INITIAL_STATE, {
      fetching: false,
      error: null
    }))
  })
})

describe('entity reducer', () => {
  const INITIAL_STATE = {
    byId: {
      4: { id: 4, title: '3', strain: 60, medium: 'other medium', targetTemp: 1, targetPh: 4, estimatedTimeSeconds: 100, extraNotes: 'some notes', readings: [5] }
    },
    allIds: [4]
  }

  it('should handle FETCH_ROUTINE_CALCULATIONS_SUCCESS', () => {
    const routine = { id: 4, title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const calculations = { biomassPerformance: [] }
    expect(
      reducer.entity(INITIAL_STATE, {
        type: FETCH_ROUTINE_CALCULATIONS_SUCCESS,
        routine,
        calculations
      })
    ).toEqual({
      byId: {
        4: {
          ...routine,
          calculations,
          readings: [5]
        }
      },
      allIds: [4]
    })
  })
})

describe('sagas', () => {
  it('perfom fetch routine calculations success', () => {
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const iterator = performFetchRoutineCalculations(httpServiceMock, { routine })
    const response = httpServiceMock.getRoutineCalculations(routine)
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'getRoutineCalculations'], routine))
    expect(iterator.next(response).value).toEqual(put(fetchRoutineCalculationsSuccess(routine, response.data.data)))
  })

  it('perfom fetch routine calculations failure', () => {
    const routine = { title: 'a title', strain: 30, medium: 'a medium', targetTemp: 1, targetPh: 4, estimatedTimeSeconds: 100, extraNotes: 'some notes' }
    const iterator = performFetchRoutineCalculations(httpServiceMock, { routine })
    expect(iterator.next().value).toEqual(call([httpServiceMock, 'getRoutineCalculations'], routine))
    expect(iterator.throw('an error').value).toEqual(put(fetchRoutineCalculationsFailure('an error')))
  })
})
