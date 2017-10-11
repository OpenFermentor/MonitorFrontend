import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class MessageFetching extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitted: false,
      submitting: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.state.submitted && newProps) {
      this.setState({ submitted: false })
    }
    if (this.state.submitting && !newProps.fetching) {
      this.setState({ submitting: false, submitted: true })
    }
  }

  onClick () {
    if (this.state.submitting) {
      return
    }
    this.setState({ submitting: true, submitted: false })
    this.props.onClick()
  }

  render () {
    return (
      <Message
        icon={this.props.icon}
        positive={this.state.submitted}
        negative={this.state.submitted && !!this.props.error}
        info={!this.state.submitting && !this.state.submitted}
        header={this.props.title}
        content={
          (this.state.submitting && this.props.fetchingMessage) ||
          (this.state.submitted && ((this.props.error && this.props.error.message) || this.props.submittedMessage))
        }
        onClick={this.onClick.bind(this)}
      />
    )
  }
}

export default MessageFetching
