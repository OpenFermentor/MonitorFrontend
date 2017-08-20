import React, { Component } from 'react'
import Draggable from 'react-draggable'
import './styles.css'

import Anchor from './anchor'

export default class DraggableHandler extends Component {
  constructor (props) {
    super(props)
    this.state = {
      containerX: 0,
      width: 150,
      translateY: 0
    }
  }

  onLeftAnchorDrag (x) {
    this.setState({ width: this.state.width - x, translateY: this.state.translateY + x })
  }

  onRightAnchorDrag (x) {
    this.setState({ width: this.state.width + x })
  }

  onSurfaceDrag (ev, { x }) {
    this.setState({ containerX: x })
    this.onDrag()
  }

  onDrag () {
    const { containerX, width, translateY } = this.state
    this.props.onRangeChange({ start: containerX + translateY, end: translateY + containerX + width })
  }

  render () {
    return (
      <Draggable
        bounds={{
          left: this.state.translateY * -1,
          right: this.props.endPosition - this.state.width - this.state.translateY
        }}
        axis='x'
        handle='.draggableHandlerDraggableSurface'
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onStop={this.onSurfaceDrag.bind(this)}>
        <div className='draggableHandler'>
          <div
            className='draggableHandlerDraggableSurface'
            style={{
              width: this.state.width,
              transform: `translate(${this.state.translateY}px, 0)`
            }}
          />
          <Anchor
            left
            startPosition={this.state.containerX * -1}
            defaultPosition={-12}
            onDrag={this.onLeftAnchorDrag.bind(this)}
            onDragEnd={this.onDrag.bind(this)}
          />
          <Anchor
            right
            locked={this.props.endPosition - this.state.containerX === this.state.width + this.state.translateY}
            endPosition={this.props.endPosition - this.state.containerX}
            defaultPosition={140}
            onDrag={this.onRightAnchorDrag.bind(this)}
            onDragEnd={this.onDrag.bind(this)}
          />
        </div>
      </Draggable>
    )
  }
}
