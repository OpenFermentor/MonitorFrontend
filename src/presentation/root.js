import React, { Component } from 'react'
import DevTools from './dev_tools'
import Router from './router'

import 'semantic-ui-css/semantic.min.css'
import './constants/typography.css'

export default class RootContainer extends Component {
  render () {
    return (
      <div>
        <Router />
        <DevTools />
      </div>
    )
  }
}
