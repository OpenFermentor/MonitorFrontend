import React, { Component } from 'react'
import './styles.css'
import IconButton from '../button/icon'
import { Button } from 'semantic-ui-react'

export default class Toolbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sidebarOpen: false
    }
  }

  render () {
    return (
      <div className='toolbar'>
        <div className='content'>
          <div className='leftContent'>
            <h3>{this.props.title}</h3>
          </div>

          { this.props.rightIcon && this.props.onClickRight &&
            <IconButton name='settings' color='white' onClick={this.props.onClickRight} />
          }

          { this.props.rightTitle && this.props.onClickRight &&
            <Button inverted onClick={this.props.onClickRight}>{this.props.rightTitle}</Button>
          }
        </div>
      </div>
    )
  }
}
