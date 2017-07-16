import { combineReducers } from 'redux'

import routineReducer from './routine/redux'
import sensorsReducer from './sensors/redux'

const entities = combineReducers({
  routine: routineReducer.entity,
  sensors: sensorsReducer.entity
})

const actionStatus = combineReducers({
  routine: routineReducer.actionStatus
})

const rootReducer = combineReducers({
  entities,
  actionStatus
})

export default rootReducer
