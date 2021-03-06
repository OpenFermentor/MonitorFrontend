import React, { Component } from 'react'
import { connect } from 'react-redux'
import DevTools from './dev_tools'
import Router from './router'
import SignIn from './sign_in'

import 'semantic-ui-css/semantic.min.css'
import './constants/typography.css'
import 'react-tagsinput/react-tagsinput.css'

import {
  selectLoggedIn
} from '../redux/session/selector'

const isRemoteClient = process.env.REACT_APP_REMOTE_WEB_APPLICATION === 'true'

class RootContainer extends Component {
  render () {
    if (isRemoteClient && !this.props.loggedIn) {
      return (
        <div>
          <SignIn />
          <DevTools />
        </div>
      )
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
  loggedIn: selectLoggedIn(state)
})

export default connect(mapStateToProps)(RootContainer)
