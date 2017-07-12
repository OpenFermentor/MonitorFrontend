import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../core/store/configure_store'
import DevTools from './dev_tools'
import Router from './router'

const store = configureStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <Router />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

export default App
