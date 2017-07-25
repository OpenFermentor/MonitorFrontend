import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import persistConfig from './redux_persist'

import rootReducer from '../redux/root_reducer'
import rootSaga from '../redux/root_saga'
import DevTools from '../../presentation/dev_tools'

const configureStore = () => {
  const middleware = []
  const enhancers = []

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  enhancers.push(autoRehydrate({ log: true }))
  enhancers.push(applyMiddleware(...middleware))
  enhancers.push(DevTools.instrument())

  const store = createStore(
    rootReducer,
    undefined,
    compose(...enhancers)
  )

  persistStore(store)

  sagaMiddleware.run(rootSaga)
  persistStore(store, persistConfig, () => store.dispatch({ type: 'BOOTED' }))

  return store
}

export default configureStore
