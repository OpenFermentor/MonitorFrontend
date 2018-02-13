import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { FUNCTIONALITY_ACCESS } from '../router'

import {
  signOutRequest
} from '../../redux/session/actions'

import {
  selectCurrentUser
} from '../../redux/session/selector'

import NavigationPresenter from './presenter'

class Navigation extends Component {
  render () {
    return (
      <NavigationPresenter
        routes={this.props.routes}
        showUserMenu={FUNCTIONALITY_ACCESS.showUserMenu}
        currentUser={this.props.currentUser}

        onSignOut={this.props.signOut}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutRequest())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))
