import { combineReducers } from 'redux'

import routineReducer from './routine/redux'

const entities = combineReducers({
  routine: routineReducer.entity
})

const actionStatus = combineReducers({
  routine: routineReducer.actionStatus
})

const rootReducer = combineReducers({
  entities,
  actionStatus
})

export default rootReducer
