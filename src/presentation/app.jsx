import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../core/store/configure_store'
import RootContainer from './root'

const store = configureStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
