import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  signInRequest
} from '../../redux/session/actions'

import {
  selectFetchingStatus
} from '../../redux/session/selector'

import SignInPresenter from './presenter'

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.error && !newProps.error) {
      this.setState({ password: null })
    }
  }

  onChangeCredentials ({ email, password }) {
    this.setState({ email, password })
  }

  onSubmit () {
    this.props.signIn(this.state)
  }

  render () {
    return (
      <SignInPresenter
        email={this.state.email}
        password={this.state.password}
        fetching={this.props.fetching}
        error={this.props.error}
        onChangeCredentials={this.onChangeCredentials.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...selectFetchingStatus(state)
})

const mapDispatchToProps = dispatch => ({
  signIn: ({ email, password }) => dispatch(signInRequest({ email, password }))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
