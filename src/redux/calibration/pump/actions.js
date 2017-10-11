import {
  PUSH_ACID_REQUEST,
  PUSH_ACID_FAILURE,
  PUSH_ACID_SUCCESS,

  TEST_ACID_DROP_REQUEST,
  TEST_ACID_DROP_FAILURE,
  TEST_ACID_DROP_SUCCESS,

  PUSH_BASE_REQUEST,
  PUSH_BASE_FAILURE,
  PUSH_BASE_SUCCESS,

  TEST_BASE_DROP_REQUEST,
  TEST_BASE_DROP_FAILURE,
  TEST_BASE_DROP_SUCCESS
} from './action_types.js'

export const pushAcidRequest = () => ({ type: PUSH_ACID_REQUEST })
export const pushAcidFailure = error => ({ type: PUSH_ACID_FAILURE, error })
export const pushAcidSuccess = () => ({ type: PUSH_ACID_SUCCESS })

export const testAcidDropRequest = () => ({ type: TEST_ACID_DROP_REQUEST })
export const testAcidDropFailure = error => ({ type: TEST_ACID_DROP_FAILURE, error })
export const testAcidDropSuccess = () => ({ type: TEST_ACID_DROP_SUCCESS })

export const pushBaseRequest = () => ({ type: PUSH_BASE_REQUEST })
export const pushBaseFailure = error => ({ type: PUSH_BASE_FAILURE, error })
export const pushBaseSuccess = () => ({ type: PUSH_BASE_SUCCESS })

export const testBaseDropRequest = () => ({ type: TEST_BASE_DROP_REQUEST })
export const testBaseDropFailure = error => ({ type: TEST_BASE_DROP_FAILURE, error })
export const testBaseDropSuccess = () => ({ type: TEST_BASE_DROP_SUCCESS })
