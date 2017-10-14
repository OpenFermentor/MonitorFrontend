import React from 'react'
import classnames from 'classnames'
import './styles.css'

const Stepper = ({ currentValue }) => (
  <div className='stepper'>
    <div className='content'>

      <div className={classnames('step', { active: currentValue === 'neutral' })}>
        <h4 className='title'>Buffer 7</h4>
      </div>

      <div className={classnames('step', { active: currentValue === 'acid' })}>
        <h4 className='title'>Buffer 4</h4>
      </div>

      <div className={classnames('step', { active: currentValue === 'base' })}>
        <h4 className='title'>Buffer 10</h4>
      </div>

    </div>
  </div>
)

export default Stepper
