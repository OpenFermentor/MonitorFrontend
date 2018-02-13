import React, { Component } from 'react'
import Draggable from 'react-draggable'
import './styles.css'

import Anchor from './anchor'

const SPACING_FOR_ANCHOR_END_POSITION = 40
const HANDLER_WIDTH = 24

export default class DraggableHandler extends Component {
  constructor (props) {
    super(props)
    this.state = {
      containerX: 0,
      width: props.initialWidth,
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
    const { containerX, width, translateY } = this.state
    return (
      <Draggable
        bounds={{
          left: translateY * -1,
          right: this.props.endPosition - width - translateY
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
              width: width,
              transform: `translate(${translateY}px, 0)`
            }}
          />
          <Anchor
            left
            startPosition={containerX * -1}
            endPosition={translateY + width - SPACING_FOR_ANCHOR_END_POSITION}
            defaultPosition={-12}
            onDrag={this.onLeftAnchorDrag.bind(this)}
            onDragEnd={this.onDrag.bind(this)}
          />
          <Anchor
            right
            startPosition={SPACING_FOR_ANCHOR_END_POSITION + translateY}
            endPosition={this.props.endPosition - containerX}
            defaultPosition={this.state.width - (HANDLER_WIDTH / 2)}
            onDrag={this.onRightAnchorDrag.bind(this)}
            onDragEnd={this.onDrag.bind(this)}
          />
        </div>
      </Draggable>
    )
  }
}
