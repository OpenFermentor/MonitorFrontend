import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../redux/root_reducer'
import rootSaga from '../redux/root_saga'
import DevTools from '../presentation/dev_tools'

const configureStore = () => {
  const middleware = []
  const enhancers = []

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  enhancers.push(applyMiddleware(...middleware))
  enhancers.push(DevTools.instrument())

  const store = createStore(
    rootReducer,
    undefined,
    compose(...enhancers)
  )

  sagaMiddleware.run(rootSaga)

  store.dispatch({ type: 'BOOTED' })

  return store
}

export default configureStore
