import React, { Component } from 'react'
import { connect } from 'react-redux'
import DevTools from './dev_tools'
import Router from './router'

import {
  selectHasBootCompleted
} from '../redux/boot/selector'

class RootContainer extends Component {
  render () {
    console.log(this.props.booted)
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
