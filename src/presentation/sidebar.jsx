import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    const { id, title, medium, targetTemp, estimatedTimeSeconds, extraNotes } = this.props.routine || {}
    this.state = {
      id,
      title,
      estimatedTimeSeconds,
      extraNotes,
      medium,
      targetTemp,
      strain: '-1',
      targetPh: -1,
      targetCo2: -1,
      targetDensity: -1
    }
  }

  onSubmit () {
    this.props.onSubmit(this.state)
  }

  render () {
    return (
      <Menu fluid vertical tabular>
        <Menu.Item name='En curso' active onClick={() => this.props.history.push('/')} />
        <Menu.Item name='Experimentos' onClick={() => this.props.history.push('/routines')} />
      </Menu>
    )
  }
}

export default withRouter(Sidebar)
