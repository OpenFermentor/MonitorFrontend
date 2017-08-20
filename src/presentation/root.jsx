import React, { Component } from 'react'
import { connect } from 'react-redux'
import DevTools from './dev_tools'
import Router from './router'

import {
  selectHasBootCompleted
} from '../core/redux/boot/selector'

class RootContainer extends Component {
  render () {
    if (!this.props.booted) {
      return null
    }
    return (
      <div>
        <Router />
        <DevTools />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  booted: selectHasBootCompleted(state)
})

export default connect(mapStateToProps)(RootContainer)
