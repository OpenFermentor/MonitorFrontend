import { combineReducers } from 'redux'

import routineReducer from './routine/redux'
import sensorsReducer from './sensors/redux'
import bootReducer from './boot/redux'

const entities = combineReducers({
  routine: routineReducer.entity,
  sensors: sensorsReducer.entity
})

const actionStatus = combineReducers({
  routine: routineReducer.actionStatus,
  boot: bootReducer.actionStatus
})

const rootReducer = combineReducers({
  entities,
  actionStatus
})

export default rootReducer
