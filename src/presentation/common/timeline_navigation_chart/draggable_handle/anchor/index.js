import React, { Component } from 'react'
import Draggable from 'react-draggable'
import Icon from '../../../../common/icon'
import './styles.css'

export default class DraggableHandler extends Component {
  onDrag (event, data) {
    this.props.onDrag(data.deltaX)
  }
  onDragEnd (event, { x }) {
    this.props.onDragEnd(x)
  }

  render () {
    return (
      <Draggable
        axis={this.props.locked ? 'none' : 'x'}
        bounds={{ left: this.props.startPosition, right: this.props.endPosition }}
        handle='.dragabbleHandlerAnchor .handler'
        defaultPosition={{x: this.props.defaultPosition, y: 0}}
        position={null}
        onStart={this.handleStart}
        onDrag={this.onDrag.bind(this)}
        onStop={this.onDragEnd.bind(this)}>
        <div className='dragabbleHandlerAnchor'>
          {
            !this.props.locked &&
            <div className='handler'>
              <Icon size={20} name={this.props.left ? 'chevronLeft' : 'chevronRight'} color='white' />
            </div>
          }
          {
            this.props.locked &&
            <div className='lockedAnchor' />
          }
        </div>
      </Draggable>
    )
  }
}
